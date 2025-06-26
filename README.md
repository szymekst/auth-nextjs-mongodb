# 🔐 Auth App – Next.js + NextAuth + MongoDB

A demo user authentication system built with Next.js, MongoDB, NextAuth, and React Hook Form with Zod for form validation.

> Demonstration project – created to showcase my skills

---

## 🧰 Requirements

- Node.js version `18.x` or higher
- MongoDB (e.g., MongoDB Atlas)

---

## ⚙️ Local Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/szymekst/auth-nextjs-mongodb.git
    cd auth-nextjs-mongodb
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Create a `.env.local` file and fill in environment variables**

    ```
    MONGODB_URI=YOUR_MONGODB_CONNECTION_URI
    NEXTAUTH_SECRET=RANDOM_STRING_AS_SECRET
    NEXTAUTH_URL=http://localhost:3000/
    RESEND_API_KEY=RESEND_API_KEY
    ```

    🔑 You can generate `NEXTAUTH_SECRET` using the command:

    ```bash
    openssl rand -base64 32
    ```

4. **Run the application**

    ```bash
    npm run dev
    ```

5. **Open your browser** and go to `http://localhost:3000`

---

## 📄 License

This project is licensed under the MIT License.
