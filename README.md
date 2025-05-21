# ♟️ Chess Bidding Platform – Backend

This is the backend service for the **Chess Bidding Platform**, a real-time prediction and bidding platform built with NestJS, Prisma, and PostgreSQL. The backend handles user authentication, game management, move validation, bidding logic, and serves data to the frontend via a RESTful API.

---

## 🚀 Features

- ✅ **JWT Authentication** (Signup, Login, Protected Routes)
- ♟️ **Chess Game Management** (Create games, fetch game state)
- 📦 **Prisma ORM** for PostgreSQL
- 🧠 **Move Validation** using `chess.js`
- 💰 **Bidding System** (Place bids on future moves)
- 🔐 **Role-Based Access** (Player, Viewer, Admin)
- 📄 **Swagger API Docs** (`/api` route)

---

## 📁 Project Structure

backend/
│
├── src/
│ ├── auth/ # Authentication logic (JWT, Guards)
│ ├── user/ # User module (profile, stats)
│ ├── game/ # Game state, logic, and endpoints
│ ├── bid/ # Bid handling and prediction logic
│ ├── prisma/ # Prisma service wrapper
│ └── app.module.ts # Root module
│
├── prisma/
│ ├── schema.prisma # Prisma schema (models, relations)
│ └── migrations/ # Database migrations
│
├── .env # Environment variables
└── main.ts # Application entry point


---

## 🛠️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Chess Engine:** [chess.js](https://github.com/jhlywa/chess.js/)
- **API Docs:** Swagger via `@nestjs/swagger`

---

# ⚙️ Setup Instructions

## 1. Clone the repo

```bash
git clone https://github.com/your-username/chess-bidding-backend.git
cd chess-bidding-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up your environment
Create a .env file in the root directory and add the following environment variables:

ini
Copy
Edit
DATABASE_URL=postgresql://user:password@localhost:5432/chessdb
JWT_SECRET=your_jwt_secret
4. Run database migrations
bash
Copy
Edit
npx prisma migrate dev
5. Start the server
bash
Copy
Edit
npm run start:dev
The API will be available at:
http://localhost:3000

Swagger Docs:
http://localhost:3000/api

6. Running Tests
bash
Copy
Edit
npm run test
🧾 API Reference
Visit: http://localhost:3000/api
Generated with Swagger – includes all endpoints and models.

👨‍💻 Contributing
See CONTRIBUTING.md for contribution guidelines.

👤 Author
Vikash Gautam
GitHub: @ivikugautam07

📜 License
This project is licensed under the MIT License.

🌐 Related Repositories
Frontend (Next.js)

yaml
Copy
Edit
