/**
 * PORTFOLIO CONTENT
 * ------------------
 * This file is the ONLY place you should ever need to edit to update
 * the site's content (about, skills, experience, projects, certifications,
 * education, contact links).
 *
 * Do NOT edit index.html, style.css or script.js to change content.
 *
 * The easiest way to edit this file safely is with admin/admin.html
 * (open it in your browser, edit the forms, click "Export data.js",
 * then replace this file with the downloaded one). See README.md.
 *
 * Format notes:
 * - Keep this a plain JavaScript object assigned to window.PORTFOLIO_DATA.
 * - Leave a value as "" (empty string) if you don't have it yet — the
 *   site will simply hide that field/button rather than show broken info.
 * - Dates/text are shown exactly as typed, so type them the way you
 *   want them to appear (e.g. "June 2025 - Present").
 */
window.PORTFOLIO_DATA = {
  "profile": {
    "name": "Yashwant Saini",
    "title": "Data Analyst | BI Developer | Business Analyst",
    "location": "Jaipur, Rajasthan, India",
    "tagline": "Turning retail and business data into dashboards, reports and decisions.",
    "objective": "Data Analyst with experience in retail healthcare analytics, specializing in Power BI dashboards, KPI tracking, and business analysis. Strong in Python, SQL/MySQL, Excel, and Google Sheets, delivering actionable insights for pricing, inventory planning, and operational decision-making.",
    "email": "yashwantsaini523@gmail.com",
    "phone": "+91 9001831850",
    "linkedin": "https://linkedin.com/in/yashwant-saini",
    "github": "https://github.com/Yashwant-02",
    "resumeFile": "assets/resume.pdf"
  },

  "skills": [
    {
      "category": "Languages",
      "items": ["Python", "SQL", "DAX"]
    },
    {
      "category": "Databases",
      "items": ["MySQL"]
    },
    {
      "category": "Visualization Tools",
      "items": ["Power BI (Desktop & Service)", "Tableau", "Excel", "Power Query", "Pivot Tables", "Power Pivot"]
    },
    {
      "category": "ETL & Data Modeling",
      "items": ["Power Query", "Data Warehousing", "Data Modeling", "KPI Tracking"]
    },
    {
      "category": "Other Tools",
      "items": ["GitHub", "Google Sheets", "ChatGPT"]
    },
    {
      "category": "Core Concepts",
      "items": ["Data Cleaning", "Data Transformation", "Business Insights", "Statistical Analysis", "MIS Reporting"]
    }
  ],

  "experience": [
    {
      "company": "Dawaa Dost Pvt. Ltd.",
      "role": "Data Analyst",
      "location": "Jaipur, India",
      "startDate": "June 2025",
      "endDate": "Present",
      "highlights": [
        "Analyzed store-wise, category-wise, and SKU-level retail healthcare sales data using Google Sheets, Excel, and Power BI to track performance across multiple stores.",
        "Designed and maintained automated Power BI dashboards connected to cleaned datasets, tracking sales growth, margin %, inventory turnover, stock gaps, and category contribution.",
        "Automated daily, weekly, and monthly MIS reports using Google Sheets (QUERY, ARRAYFORMULA, FILTER, VLOOKUP/XLOOKUP) and Power Query, reducing manual reporting effort by 30–40%.",
        "Built dynamic helper sheets in Google Sheets to calculate top-selling items, slow-moving SKUs, and store-wise performance, enabling faster dashboard refreshes.",
        "Supported pricing optimization and inventory planning by analyzing fast/slow-moving items, stock-out trends, and margin variations across stores.",
        "Delivered ad-hoc insights and management reports by combining Google Sheets automation and Power BI visuals, supporting operational and strategic decisions."
      ]
    },
    {
      "company": "Zeetron Networks Pvt. Ltd.",
      "role": "Data Analyst Intern",
      "location": "Jaipur, India",
      "startDate": "July 2024",
      "endDate": "December 2024",
      "highlights": [
        "Analyzed large datasets to uncover sales trends, customer behavior, and profitability insights.",
        "Performed data cleaning, transformation, and visualization using SQL, Python (pandas), and Power BI.",
        "Developed interactive dashboards and reports to support business decision-making.",
        "Delivered actionable insights to stakeholders, enabling data-driven business decisions."
      ]
    }
  ],

  "projects": [
    {
      "name": "Hospitality Performance Insights Dashboard",
      "tools": ["Python", "MySQL", "Power BI", "DAX"],
      "description": "An end-to-end pipeline turning raw booking data into a management-ready revenue and occupancy dashboard.",
      "highlights": [
        "Scraped and cleaned 50K+ booking records using Python, transforming raw data into structured MySQL tables.",
        "Built a Power BI dashboard to track ₹1.71B total revenue, highlighting that Mumbai contributed 39.1%.",
        "Applied DAX measures to identify peak occupancy months and seasonal pricing patterns."
      ],
      "insight": "Insights enabled management to optimize pricing strategy, improving forecast accuracy and boosting profitability.",
      "projectUrl": "",
      "githubUrl": ""
    },
    {
      "name": "Shopping Mall Sales Analysis",
      "tools": ["Python (Pandas)", "SQL", "Statistical Analysis"],
      "description": "A department-wise sales analysis uncovering customer segments and seasonal buying patterns.",
      "highlights": [
        "Cleaned and transformed raw CSV sales data for department-wise insights.",
        "Used SQL queries to segment 1,000+ customers, analyze product categories, and uncover seasonal shopping patterns."
      ],
      "insight": "",
      "projectUrl": "",
      "githubUrl": ""
    }
  ],

  "certifications": [
    {
      "name": "Python",
      "institute": "IIHT, Durgapura, Jaipur",
      "date": "Jan – Mar 2024",
      "image": "assets/certificates/python.jpg"
    },
    {
      "name": "MySQL",
      "institute": "IIHT, Durgapura, Jaipur",
      "date": "Mar – Apr 2024",
      "image": "assets/certificates/mysql.jpg"
    },
    {
      "name": "Power BI",
      "institute": "IIHT, Durgapura, Jaipur",
      "date": "Apr – Jun 2024",
      "image": "assets/certificates/powerbi.jpg"
    }
  ],

  "education": [
    {
      "degree": "Master of Science",
      "institute": "Behror P.G. College",
      "location": "Behror, Rajasthan",
      "startYear": "2021",
      "endYear": "2023"
    },
    {
      "degree": "Bachelor of Science",
      "institute": "Shrimati Kamla Devi Mahavidyalaya",
      "location": "Dhikwar, Rajasthan",
      "startYear": "2017",
      "endYear": "2020"
    }
  ]
};
