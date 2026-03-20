# GoPhygital — School User Data Application
 
A role-based school management application built with **Vite**, **React**, and **Tailwind CSS**. Users log in with their email and password and are routed to either an admin dashboard or a personal student profile based on their role.
 
---
 
## Live Demo
 
🔗 https://go-phygital-task.vercel.app/
 

 
---
 
## Features
 
### Login Page
- Email and password authentication against a static user dataset
- Email format validation (regex-based)
- Password emptiness validation
- Inline field-level error messages
- Card shake animation on wrong credentials
- Password show/hide toggle
- Demo credentials hint card for quick testing
 
### Admin Dashboard
- Displays a table of all registered students
- Search students by name (live, case-insensitive)
- Filter students by subject (dropdown)
- Combined name + subject filtering
- Student detail popup modal with full profile info
- Summary stat cards (total students, subjects, standards)
- Logout button
 
### Student Dashboard
- Personal profile card with colored banner and avatar
- Displays name, standard, language, email, and address
- Subject badges with color coding
- Logout button
 
---
 
## Tech Stack
 
| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [React 18](https://react.dev) | UI library |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | Tailwind Vite plugin |
 
---
 
## Project Structure
 
```
school-app/
├── src/
│   ├── data/
│   │   └── users.js                  # Static user dataset + style constants
│   ├── components/
│   │   ├── Login.jsx                 # Module 1 — Login page
│   │   ├── AdminDashboard.jsx        # Module 2 — Admin view
│   │   ├── StudentDashboard.jsx      # Module 2 — Student view
│   │   └── StudentDetailModal.jsx    # Popup modal for student details
│   ├── App.jsx                       # Root component — routing logic
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Tailwind import
├── index.html
├── vite.config.js
├── package.json
└── README.md
```
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js v18 or higher
- npm v9 or higher
 
### Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/Shubham7270/GoPhygital_Task.git
 
# 2. Move into the project folder
cd school-app
 
# 3. Install dependencies
npm install
 
# 4. Start the development server
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
### Build for Production
 
```bash
npm run build
```
 
The output will be in the `dist/` folder, ready to deploy anywhere.
 
---
 
## Demo Accounts
 
Use these credentials to test both roles:
 
### Admin Accounts
| Name | Email | Password |
|---|---|---|
| Rahul Deshmukh | rahul.deshmukh@school.com | Admin@123 |
| Sneha Kulkarni | sneha.kulkarni@school.com | Admin@456 |
 
### Student Accounts
| Name | Email | Password | Standard |
|---|---|---|---|
| Riya Patil | riya.patil@school.com | Student@001 | 6th |
| Aditya Jadhav | aditya.jadhav@school.com | Student@002 | 7th |
| Pooja Shinde | pooja.shinde@school.com | Student@003 | 8th |
| Aman Verma | aman.verma@school.com | Student@004 | 9th |
| Neha Gupta | neha.gupta@school.com | Student@005 | 10th |
| Imran Shaikh | imran.shaikh@school.com | Student@006 | 6th |
| Kavya Reddy | kavya.reddy@school.com | Student@007 | 7th |
| Rohit Singh | rohit.singh@school.com | Student@008 | 8th |
 
---
 
## Data Model
 
Each user in `src/data/users.js` follows this structure:
 
```js
{
  id: 1,
  userName: "Riya Patil",
  userType: "student",         // "admin" or "student"
  password: btoa_safe("..."),  // Base64 encoded password
  email: "riya.patil@school.com",
  language: "Marathi",
  address: "Satara Road, Satara, Maharashtra 415001",
  standard: "6th",             // null for admins
  subjects: ["Maths", "Science", "History", "English"],
  avatar: "Rp",                // initials for avatar circle
}
```
 
Passwords are encoded using `btoa` (Base64) at file load time. This is appropriate for a static demo app — in a real application, passwords would be hashed server-side using bcrypt or similar.
 
---
 
## How Authentication Works
 
1. User enters email and password on the login page
2. Client-side validation runs first (email format, password emptiness)
3. If valid, the app searches the `USERS` array for a matching email
4. The entered password is encoded with `btoa_safe` and compared against the stored encoded value
5. On match, the user object is stored in React state
6. `App.jsx` reads `userType` and renders either `AdminDashboard` or `StudentDashboard`
7. Logout clears the state and returns to the login page
 
---
 
## Deployment
 
This app is deployed on **Vercel**. Any push to the `main` branch triggers an automatic redeployment.
 
### Deploy your own copy
 
1. Fork this repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your forked repo
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**
 
---

 
## Author
 
Built as a learning project to practice React component architecture, role-based routing, and Tailwind CSS utility-first styling.
 
---
 
## License
 
This project is open source and available under the [MIT License](LICENSE).
 
