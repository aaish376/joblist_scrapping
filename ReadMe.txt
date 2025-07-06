# Actuarial Job Board Web App

A powerful full-stack **job listing platform** designed for the actuarial industry. Built using **React**, **Flask**, **MySQL**, and **Selenium**, this application allows organizations to list jobs and users to explore career opportunities interactively with dynamic filters and an intuitive UI.

---

## 🛠 Technologies Used

| Layer    | Technology Stack                         |
| -------- | ---------------------------------------- |
| Frontend | React, Tailwind CSS, Axios, Lucide Icons |
| Backend  | Flask, Flask-CORS, Flask-SQLAlchemy      |
| Database | MySQL                                    |
| Scraping | Selenium WebDriver                       |

---

## 🎯 Project Overview

This project provides:

* A professional interface for actuarial job listings.
* Real-time filtering by job type, location, and tags.
* Admin-friendly CRUD operations.
* A web scraper to populate the database from [https://www.actuarylist.com](https://www.actuarylist.com).

---

## 📂 Folder Structure

```
JobList/
├── backend/                 # Flask API and scraper
│   ├── app.py               # Entry point
│   ├── config.py            # Environment configs
│   ├── models.py            # SQLAlchemy models
│   ├── routes.py            # REST API endpoints
│   ├── db_init.py           # DB initializer
│   ├── scraper.py           # Selenium scraper
│   ├── requirements.txt
│   └── .env
└── frontend/                # React frontend
    ├── public/
    └── src/
        ├── components/      # UI components
        ├── api.js           # Axios functions
        ├── App.js
        └── index.js
        
```

---

## ⚙ Backend Setup (Flask + MySQL)

### 🔧 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 🔑 2. Configure Environment

Create a `.env` file in `backend/`:

```env
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jobboard
DB_HOST=localhost
DB_PORT=3306
```

### 🗃️ 3. Create the Database

Using MySQL CLI or GUI:

```sql
CREATE DATABASE jobboard;
```

### 🏗️ 4. Initialize DB Schema

```bash
python db_init.py
```

### ▶️ 5. Start Flask Server

```bash
python app.py
```

Your backend runs at `http://localhost:5000`

---

## 💻 Frontend Setup (React + Tailwind)

### 📦 1. Install Dependencies

```bash
cd frontend
npm install
```

### ▶️ 2. Start React Dev Server

```bash
npm start
```

Your frontend runs at `http://localhost:3000`

---

## 🤖 Web Scraping (Seed Jobs)

### 📋 Purpose

Populate your database with real actuarial job listings.

### ⚙ Requirements

* Chrome installed
* `chromedriver` in your system PATH

### ▶️ Run Scraper

```bash
cd backend
python scraper.py
```

The scraper will:

* Load the Actuary List site
* Extract job title, company, location, type, tags, and posting date
* Save jobs into the database

---

## 📡 API Reference

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/jobs`      | Fetch job list (with filters) |
| GET    | `/jobs/<id>` | Get single job by ID          |
| POST   | `/jobs`      | Create new job                |
| PUT    | `/jobs/<id>` | Update job entry              |
| DELETE | `/jobs/<id>` | Delete job entry              |
| GET    | `/filters`   | Unique locations & tags       |

Filtering supports:

* `?keyword=developer`
* `?location=Remote`
* `?job_type=Full-time`
* `?tags=Pricing,SQL`
* `?sort=posting_date_asc`

---

## 🧑‍💻 Functionality Explained

### 1. Home Page (Job Listings)

* Grid of job cards with:

  * Job Title
  * Company & Location
  * Job Type + Date
  * Tags with colored pills
* On hover, Edit & Delete buttons appear
* Responsive layout for mobile and desktop

### 2. Add / Edit Job

* Triggered by "Add Job" button in top bar
* Opens modal popup with animated form
* Form has validation for required fields
* Tags entered as comma-separated
* Can cancel to close form

### 3. Delete Job

* Prompt confirmation before deleting
* Removes job from UI and database

### 4. Filter Bar

* Search box for title/company
* Dropdowns:

  * Job Type
  * Location
  * Sort order
* Tags in collapsible dropdown
* Summary chips show active filters
* Each filter can be removed individually

### 5. Web Scraper

* Uses Selenium to scrape actuarial jobs
* Avoids duplicates
* Adds data directly into DB using models

---

## 📖 User Manual

### 🔍 Explore Jobs

* Visit `/`
* Browse cards
* Use search, filters, and tags to narrow results
* Sort by newest or oldest

### ➕ Add a Job

* Click "Add Job" (top right)
* Fill form (Title, Company, Location, Tags...)
* Click "Add Job"
* Job appears immediately

### ✏️ Edit a Job

* Hover on a card → Click ✏️ Edit
* Update fields → Click "Update Job"

### ❌ Delete a Job

* Hover on a card → Click 🗑️ Delete
* Confirm → Job is removed

### 🔁 Reset Filters

* Click "Reset Filters" button in filter bar
* Or click × on any individual filter chip

### 📦 Run Scraper

```bash
python backend/scraper.py
```

---

## ✅ Example Job Card UI

* Gradient background
* Icons for company, location, date
* Interactive buttons on hover
* Tags scrollable in bubble pills

---

## ✨ Future Enhancements

* Authentication for job posting
* Pagination / Load more
* Bookmarking jobs
* Job application tracking
* Resume uploader

---

