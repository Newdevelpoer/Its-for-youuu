# Its For Youuu ✨

> A small digital universe built entirely to celebrate someone special.

A full-stack interactive web application — a small digital world dedicated to one special person, blending storytelling, memories, animations, and interactive elements into a seamless journey.

---

## 🖼️ Screenshots

| Home Page | Gallery | About |
|-----------|---------|-------|
| *Coming soon* | *Coming soon* | *Coming soon* |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Vite for fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **React Router v6** (client-side routing)
- **CSS animations** (smooth cinematic transitions)

### Backend
- **Node.js + Express**
- **MongoDB** (with Mongoose ODM)
- **JWT** (authentication)
- **Multer** (file uploads)
- **bcryptjs** (password hashing)

---

## 📁 Folder Structure

```
Its-for-youuu/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Auth & Theme contexts
│   │   ├── pages/            # All 5 main pages + auth
│   │   ├── games/            # Mini games
│   │   └── utils/            # API helper
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express Backend
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth & upload middleware
│   ├── config/               # DB config
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Newdevelpoer/Its-for-youuu.git
cd Its-for-youuu
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/its-for-youuu` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key` |
| `BIRTHDAY_DATE` | The special birthday date (YYYY-MM-DD) | `2024-08-15` |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Client (`client/.env`) — optional

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BIRTHDAY_DATE` | Birthday date for countdown | `2024-08-15` |

---

## 💻 Development

```bash
# Terminal 1 — Start backend
cd server && npm run dev

# Terminal 2 — Start frontend
cd client && npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend runs at: `http://localhost:5000`

---

## 🏗️ Build for Production

```bash
# Build frontend
cd client && npm run build

# The built files will be in client/dist/
# Serve them with nginx or any static file server
```

---

## 📄 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/visits` | Get visit count | No |
| POST | `/api/visits/increment` | Increment visit count | No |
| GET | `/api/photos/:category` | Get photos by season | No |
| POST | `/api/photos/upload` | Upload photo | Yes |
| GET | `/api/surprise/status` | Get surprise page status | No |

---

## 🌟 Features

### 5 Beautiful Pages
1. **Home** — Welcome page with animated floating elements, birthday countdown, visit counter
2. **Gallery** — Seasonal photo galleries (Monsoon 🌧️, Winter ❄️, Autumn 🍂, Spring 🌸)
3. **About** — Parallax storytelling with romantic story sections
4. **Games** — Memory Match + Love Quiz mini-games
5. **Surprise** — Birthday-locked page that unlocks on special day 🎂

### Theme System
- **Auto light/dark** based on time of day (6 AM–6 PM = light, 6 PM–6 AM = dark)
- Seamless animated transitions
- Full theme adaptation across all UI elements

### Seasonal Gallery Effects
- 🌧️ **Monsoon** — Rain particle effects
- ❄️ **Winter** — Snow particle effects
- 🌸 **Spring** — Cherry blossom petals
- 🍂 **Autumn** — Falling leaves

### Security
- JWT authentication with 30-day expiry
- bcrypt password hashing (12 rounds)
- Rate limiting on API routes
- Image validation (type + 10MB size limit)
- CORS configuration
- Input validation/sanitization

---

## 🎂 Surprise Page Logic

The surprise page has three states:
1. **Before birthday** — Locked with countdown
2. **On birthday day (Day 0–30)** — Fully unlocked with celebration! 🎉
3. **After 30 days** — Returns to locked state

Configure your birthday date in `server/.env`:
```
BIRTHDAY_DATE=2024-08-15
```

---

## 💖 Made with Love

Every pixel, every animation, every line of code was crafted with love. ✨🐼
