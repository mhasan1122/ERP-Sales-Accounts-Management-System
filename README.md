# 🧾 ERP System – Accounts & Sales Module

A modern, full-stack **ERP system** focused on **Sales, Products, and Customer Management**, featuring real-time data visualization, advanced inventory tracking, and relationship-based customer insights.

---

## 🚀 Key Features

### 📊 Dashboard Enhancements

* 📈 **Sales Trend Chart** – Interactive line chart showing daily sales count (last 7 days)
* 💰 **Revenue Trend Chart** – Bar chart visualizing daily revenue patterns
* 🛠 Built using **Recharts** for responsive, animated, professional-grade data visualization
* 🔁 Auto-updates with real sales data
* 🖱 Includes smooth hover tooltips for quick insights

---

### 🛒 Product Management

* ✅ Full **CRUD functionality**: Add, View, Edit, Delete products
* 📦 Form fields: `name`, `category`, `price`, `stock quantity`
* 🧮 Real-time **inventory value calculation**
* ⚠️ Low stock alerts
* 🔍 Filter by category, **sort by any column**
* 🟢🟡🔴 Stock status indicators: In Stock, Low Stock, Out of Stock
* 📈 Product statistics dashboard with quick insights

---

### 👥 Customer Management

* 📇 Complete **Customer Directory** with contact details
* 📜 **Purchase history** tracking: total spent & number of purchases
* 🔍 Expandable customer cards with recent purchase data
* 📊 Customer stats: active customers, total customer value
* ⏰ Last purchase date tracking for relationship management
* 🧾 Professionally designed customer cards with icons and metrics

---

## 🧠 Tech Stack

### Frontend

* **React.js** with **Tailwind CSS**
* **Recharts** for data visualization
* Responsive design for mobile, tablet, and desktop

### Backend

* **Express.js** REST API
* **MongoDB** with **Mongoose**
* **JWT** Authentication with role-based access (Admin, Super Admin)
* **node-cron** for automated sales processing

---

## 📂 Project Structure

### Backend (`/erp-backend`)

```
erp-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── jobs/
└── server.js
```

### Frontend (`/erp-frontend`)

```
erp-frontend/
├── components/
├── pages/
├── services/
├── hooks/
└── App.jsx
```

---

## 📦 Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/erp-system.git
cd erp-system
```

### Backend Setup

```bash
cd erp-backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd erp-frontend
npm install
npm start
```

