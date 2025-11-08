# 🎓 College Support Management System

![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-lightgreen?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb&logoColor=white)
![Open Source](https://img.shields.io/badge/Open%20Source-💻-brightgreen)
![Made with ❤️ by Aniket](https://img.shields.io/badge/Made%20with-❤️-red)

> 🤖 A **college support management system** with role-based dashboards.  
> Students, HODs, and Principal can **login/signup**, manage queries, and perform **CRUD operations** relevant to their role.  

---

## 🚀 **Overview**

This is a **full-stack web application** for college support and query management:

- 🏠 **Front Page:** Landing page with system overview and navigation  
- 👤 **Signup/Login:** Role-based authentication (Student, HOD, Principal)  
- 📊 **Individual Dashboards:**
  - **Student:** Ask queries, view responses, manage own posts  
  - **HOD:** View student queries, respond, update status, CRUD operations  
  - **Principal:** Monitor all queries, manage escalations, update statuses  

- ⚡ Real-time chat-like interface for student query resolution  
- 🗄️ Data management using **MongoDB**  
- 🔄 Full **CRUD operations** per role  

---

## 🧰 **Tech Stack**

| Tech | Description |
|------|-------------|
| 🟢 Node.js | Backend server and API handling |
| ⚙️ Express.js | Server routing, middleware, REST APIs |
| 🔌 Socket.IO | Real-time chat updates (optional) |
| 🗄️ MongoDB | Database for users, queries, and dashboards |
| 🎨 HTML/CSS | Frontend design and responsive UI |
| ⚡ JavaScript | Frontend interactivity and dynamic content |
| 🖥️ EJS / React | Dynamic rendering of dashboards and front page |

---

## ⚙️ **Features**

- ✅ Front page with system overview  
- ✅ Role-based signup/login (Student, HOD, Principal)  
- ✅ Secure authentication with hashed passwords  
- ✅ Responsive UI for all devices  

---

## ⚙️ **How It Works**

1. **Front Page**
   - Landing page with system overview and navigation links for signup/login  

2. **Signup/Login**
   - Users register as Student, HOD, or Principal  
   - Secure login with **express-session** or JWT  

3. **Dashboards**
   - **Student Dashboard**
     - Create, read, update, delete own queries   
   - **HOD Dashboard**
     - Create, read, update, delete own queries
   - **Principal Dashboard**
     - Create, read, update, delete own queries 


---

## 💻 **Setup & Usage**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/college-support-system.git
cd college-support-system
