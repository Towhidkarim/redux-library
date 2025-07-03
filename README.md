# 📚 Redux Library App

A full-featured library management web application built with **React**, **Vite**, **Redux Toolkit Query**, **Shadcn UI**, and **Zod**. This system allows users to manage books and track borrowing activities with a clean and intuitive interface.

🌐 **Live Site**: [redux-library.vercel.app](https://redux-library.vercel.app/)

---

## 🚀 Features

- View all books
- Add a new book
- Edit existing books
- Delete books
- Borrow a book
- View an aggreagate summary of borrowed books

---

## 🛠️ Tech Stack

| Technology       | Description                   |
| ---------------- | ----------------------------- |
| **React**        | Frontend UI library           |
| **Vite**         | Fast development build tool   |
| **RTK Query**    | API data fetching and caching |
| **Zod**          | Schema validation for forms   |
| **Shadcn UI**    | Beautiful UI components       |
| **Tailwind CSS** | Utility-first CSS framework   |

---

## 🔗 Routes Overview

| Path              | Description                         |
| ----------------- | ----------------------------------- |
| `/books`          | Displays a list of all books        |
| `/create-book`    | Form to add a new book              |
| `/books/:id`      | Detailed view of a single book      |
| `/edit-book/:id`  | Edit form to update book details    |
| `/borrow/:bookId` | Borrow form for a specific book     |
| `/borrow-summary` | Shows summary of all borrowed books |

---

## 🔗 Backend

🌐 **Live Backend API**: [library-api-737v.onrender.com](https://library-api-737v.onrender.com/)

Built with ExpressJs

Github: [Library API Repository](https://github.com/Towhidkarim/library-api)

---

## 🧪 Validation

All forms are validated using **Zod** ensuring strong type safety and user-friendly feedback.

---

## 🧰 Setup Instructions

1. **Clone the repository and initialize**

```bash
git clone https://github.com/your-username/redux-library.git
cd redux-library
```

```bash
npm install
# or
pnpm install
# or
bun install
```

2. **Star Development Server**

```bash
npm run dev
#or
pnpm dev
#or
bun dev
```

3. **Visit**

```bash
http://localhost:5173
```
