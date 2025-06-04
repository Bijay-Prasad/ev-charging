# ⚡ EV Charging Station Management System

A full-stack web application to manage electric vehicle (EV) charging stations. Includes user authentication, charger listing, map view, filtering, and admin-only controls — built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Leaflet.js**. Deployed on **Vercel** (frontend) and **Render** (backend).

---

## 🚀 Live Links

- 🔗 Frontend (Vercel): [https://ev-charging-stations-gules.vercel.app](https://ev-charging-stations-gules.vercel.app)
- 🔗 Backend (Render): [https://ev-charging-station-c828.onrender.com/](https://ev-charging-station-c828.onrender.com/)
- 📄 API Docs (Postman collection): `EV Charging App.postman_collection.json` (in repo)

---

## 📦 Tech Stack

### Frontend
- ⚛️ React.js (Vite)
- 💨 Tailwind CSS
- 🔁 Redux (for auth state)
- 🗺️ Leaflet.js (map view)
- 🍞 React Hot Toast

### Backend
- 🧠 Node.js + Express.js
- 🛢 MongoDB + Mongoose
- 🔐 JWT Authentication
- 🧭 RESTful APIs

### Deployment
- 🔵 Frontend: [Vercel](https://vercel.com)
- 🟠 Backend: [Render](https://render.com)

---

## ✨ Features

### 👥 User Authentication
- Sign up and log in with JWT tokens
- Auth state stored in Redux
- Logout support

### ⚡ Charger Management
- Add, edit, and delete chargers (Admin only)
- Fields: Name, Status, Power Output (kW), Connector Type, Location

### 📍 Map View
- Interactive Leaflet map with charger markers
- Click marker to view charger info
- Auto-locate latitude & longitude on map click

### 🔎 Filtering & Table View
- View chargers in a searchable, paginated, sortable table
- Filter by status, connector type, or power range
- Fully responsive with Tailwind CSS

---

## 🗂 Project Structure

```
.
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── main.jsx
└── README.md
```

---

## 🛠 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/ev-charging-app.git
cd ev-charging-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create `.env` file in `/backend`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

- Start backend server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

- Create `.env` in `/frontend`:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

- Run frontend:
```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| POST   | `/api/auth/register`         | Register new user             |
| POST   | `/api/auth/login`            | Log in user and return token  |
| GET    | `/api/chargers`              | Get all chargers              |
| POST   | `/api/chargers`              | Add new charger (admin only)  |
| PUT    | `/api/chargers/:id`          | Edit charger (admin only)     |
| DELETE | `/api/chargers/:id`          | Delete charger (admin only)   |
| GET    | `/api/location/reverse-geocode` | Get address from lat/lng  |

---

## 🧰 Tools Used

- [Vite](https://vitejs.dev/)
- [React Leaflet](https://react-leaflet.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)

---

## 🧑‍💻 Author

**Bijay Prasad**  
- 💼 [Portfolio](https://bijay-prasad.github.io/Portfolio)  
- 💬 [LinkedIn](https://www.linkedin.com/in/bijayprasad)  
- 💻 [GitHub](https://github.com/Bijay-Prasad)

---

## 📜 License

This project is licensed under the MIT License.