from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    posting_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    job_type = db.Column(db.String(100), nullable=False)
    tags = db.Column(db.Text)  # comma-separated string

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "posting_date": self.posting_date.strftime("%Y-%m-%d"),
            "job_type": self.job_type,
            "tags": self.tags
        }
