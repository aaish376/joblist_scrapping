from flask import Blueprint, request, jsonify
from models import db, Job
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/jobs', methods=['GET'])
def get_jobs():
    query = Job.query
    job_type = request.args.get('job_type')
    location = request.args.get('location')
    tag = request.args.get('tag')
    keyword = request.args.get('keyword')
    sort = request.args.get('sort', 'posting_date_desc')

    if job_type:
        query = query.filter_by(job_type=job_type)
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if tag:
        query = query.filter(Job.tags.ilike(f"%{tag}%"))
    if keyword:
        query = query.filter(
            Job.title.ilike(f"%{keyword}%") |
            Job.company.ilike(f"%{keyword}%")
        )
    if sort == "posting_date_asc":
        query = query.order_by(Job.posting_date.asc())
    else:
        query = query.order_by(Job.posting_date.desc())

    return jsonify([job.to_dict() for job in query.all()])

@api.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict())

@api.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    required = ['title', 'company', 'location', 'job_type']

    if not all(field in data and data[field] for field in required):
        return jsonify({"error": "Missing required fields"}), 400

    job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        job_type=data['job_type'],
        tags=data.get('tags', ''),
        posting_date=datetime.utcnow()
    )

    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201

@api.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.get_json()
    for field in ['title', 'company', 'location', 'job_type', 'tags']:
        if field in data:
            setattr(job, field, data[field])

    db.session.commit()
    return jsonify(job.to_dict())

@api.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"}), 200


@api.route('/filters', methods=['GET'])
def get_filters():
    jobs = Job.query.all()

    # 🌍 Gather locations
    location_set = set()
    for job in jobs:
        if job.location:
            split_locs = [loc.strip() for loc in job.location.split(',')]
            location_set.update(split_locs)

    # 🏷️ Gather tags
    tag_set = set()
    for job in jobs:
        if job.tags:
            split_tags = [tag.strip() for tag in job.tags.split(',')]
            tag_set.update(split_tags)

    return jsonify({
        "locations": sorted(location_set),
        "tags": sorted(tag_set)
    })

