from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

from app import app
from models import db, Job
import time

from datetime import datetime, timedelta
import re

def parse_posted_date(posted_text):
    now = datetime.utcnow()
    if not posted_text:
        return now.strftime("%Y-%m-%d")

    match = re.match(r"(\d+)([hdwmo])", posted_text)
    if not match:
        return now.strftime("%Y-%m-%d")

    value, unit = int(match.group(1)), match.group(2)

    if unit == 'h':
        delta = timedelta(hours=value)
    elif unit == 'd':
        delta = timedelta(days=value)
    elif unit == 'w':
        delta = timedelta(weeks=value)
    elif unit == 'm':
        delta = timedelta(days=value * 30)  # approx 30 days per month
    elif unit == 'o':  # fallback for typos like 'mo' being split wrong
        delta = timedelta(days=value * 30)
    else:
        delta = timedelta(0)

    actual_date = now - delta
    return actual_date.strftime("%Y-%m-%d")


# Setup headless Chrome
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("https://www.actuarylist.com")
time.sleep(5)  # Allow time for page to fully render

soup = BeautifulSoup(driver.page_source, 'html.parser')
job_cards = soup.select("div[class*='Job_job-card__']")

print(f"🔍 Found {len(job_cards)} job cards\n")

scraped_jobs = []

for card in job_cards:
    try:
        title_elem = card.select_one(".Job_job-card__position__ic1rc")
        company_elem = card.select_one(".Job_job-card__company__7T9qY")
        location_elems = card.select(".Job_job-card__locations__x1exr a")
        tags_elems = card.select(".Job_job-card__tags__zfriA a")
        posted_elem = card.select_one(".Job_job-card__posted-on__NCZaJ")

        if not (title_elem and company_elem and location_elems):
            print("⚠️ Skipping due to missing required fields")
            continue

        title = title_elem.text.strip()
        company = company_elem.text.strip()
        location = ", ".join([loc.text.strip() for loc in location_elems]) if location_elems else "N/A"
        tags = ", ".join([tag.text.strip() for tag in tags_elems]) if tags_elems else ""
        posted_text = posted_elem.text.strip() if posted_elem else ""

        job_type = "Full-time"
        if "Intern" in tags:
            job_type = "Internship"
        elif "Part-Time" in tags:
            job_type = "Part-time"
        elif "Contract" in tags:
            job_type = "Contract"

        posting_date = posting_date = parse_posted_date(posted_text)


        scraped_jobs.append({
            "title": title,
            "company": company,
            "location": location,
            "job_type": job_type,
            "tags": tags,
            "posting_date": posting_date
        })

    except Exception as e:
        print(f"❌ Error parsing job card: {e}")
        continue

# # Show all scraped jobs before inserting
# print("📋 Scraped Jobs:\n")
# for job in scraped_jobs:
#     print(f"- {job['title']} at {job['company']} ({job['location']}) | {job['job_type']}")

# Insert into database


new_jobs = 0
with app.app_context():
    for job in scraped_jobs:
        if Job.query.filter_by(title=job['title'], company=job['company']).first():
            continue

        new_job = Job(
            title=job['title'],
            company=job['company'],
            location=job['location'],
            job_type=job['job_type'],
            tags=job['tags'],
            posting_date=job['posting_date']
        )
        db.session.add(new_job)
        new_jobs += 1

    db.session.commit()

print(f"\n✅ Scraping complete. {new_jobs} new jobs added.")
driver.quit()
