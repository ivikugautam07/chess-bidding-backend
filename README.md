# ♟️ Chess Bidding Backend

This is the backend server for the Chess Bidding platform, built with NestJS, PostgreSQL, and Prisma ORM.

---

# ⚙️ Setup Instructions

## ✅ Step 1: Clone the repository

git clone https://github.com/ivikugautam07/chess-bidding-backend.git  
cd chess-bidding-backend

## ✅ Step 2: Install dependencies

npm install

## ✅ Step 3: Set up environment variables

Create a file named `.env` in the root directory and add the following:

DATABASE_URL=postgresql://user:password@localhost:5432/chessdb  
JWT_SECRET=your_jwt_secret

## ✅ Step 4: Run database migrations

npx prisma migrate dev

## ✅ Step 5: Start the development server

npm run start:dev

After starting, the backend will be available at:  
http://localhost:3000

Swagger API documentation:  
http://localhost:3000/api

---

# 🧪 Running Tests

npm run test

---

# 🧾 API Reference

Visit: http://localhost:3000/api  
Generated with Swagger — includes all endpoints and models.

---

# 👨‍💻 Contributing

See CONTRIBUTING.md for contribution guidelines.

---

# 👨‍💻 Author

Vikash Gautam  
GitHub: https://github.com/ivikugautam07

---

# 📜 License

This project is licensed under the MIT License.

---

# 🌐 Related Repositories

Frontend (Next.js):  
https://github.com/ivikugautam07/chess-bidding-frontend
