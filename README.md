## Easy Paper Solution

Web based system for school / academy to enter school syllabus & create test from the selected questions (MCQs, Banks, Short & Long Questions etc)

### Tech stack:

- laravel v6 LTS for APIs
- ReactJS v16.14.0 for UI
- Redux + Thunk
- Bootstrap v4 + Font awesome v4.7
- SASS stylesheets

## Running the project on local machine
- Run composer install for laravel packages
- After that, run command "**php artisan key:generate**" 
- Run npm install for react packages 
- Update db info in .env
- Update "**APP_URL**" and "**API_ENDPOINT**" in .env
- Run command "**npm run watch**" to start project in DEV env
- For production, you can use "**npm run production**"

**Note** I'm using **papersystem.loc** as vhost for project, you can use same or setup whichever you like and update .env

Hit the URL in browser and enjoy. Use user:pass :: **superadmin:superadmin** to login to portal.


# Modules
### Syllabus Creation
- Create Class Name / number (e.g: Class 3, Class IX)
- Create Syllabus type (Oxford, Punjab Book etc)
- Create Subjects under each syllabus
- Create section under syllabus:
- Create Question by selection section & predefined question type:
- Mark Answer to populate answer sheet for MCQ, blanks, True / False
- Syllabus created by any school / academy branch will be shared among all of the other register branches
- ift browser closes, or the back button button is pressed, when the user is back on that step, previously entered info will be populated again.
### Paper Creation
- Select class
- Select subject
- Select Chapter / topics of the subject
- Select medium: English Only, Urdu Only, Dual Medium
- Enter each question marks
- After Hit OK / Search, it will populate on screen with Paper Header & Footer.
- Select Questions from the list below.
- Goto next step, set font size & set text color
- Click Generate Paper. 
- It will save paper on system, you can print directory or download as PDF
- For MCQ type, add bubble sheet
- Standard paper size A4 will be used
- Saved paper can be edited from the system.
- Half / Full page print
- Watermark on background
### Login
- When a user is logged-in to the wordpress, it will automatically be logged-in to the test screen

### User Roles & Capabilities
- Admin use:
Will have access to generate key to register into the system
Create syllabus
Create papers
Grant access to Author to allow syllabus entries
Author (teacher) - (update with limited access)
Create papers
Add classes visibility restriction

## Security Vulnerabilities

## License