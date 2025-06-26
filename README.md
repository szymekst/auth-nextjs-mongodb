# Auth App – Next.js + NextAuth + MongoDB

A demo user authentication system built with Next.js, MongoDB, NextAuth, and React Hook Form with Zod for form validation.

> Demonstration project – created to showcase my skills

## Requirements

- Node.js version `18.x` or higher
- MongoDB (e.g., MongoDB Atlas)

---

## Local Installation

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

    ```env
    MONGODB_URI=your_mongodb_connection_uri_here    # e.g. mongodb+srv://user:password@cluster0.mongodb.net/mydb
    NEXTAUTH_SECRET=your_random_secret_here         # e.g. supersecretstringthatshouldberandomandsecure
    NEXTAUTH_URL=http://localhost:3000/             # e.g. http://localhost:3000/
    YOUR_DOMAIN=yourdomain.com                      # e.g. example.pl
    EMAIL_FROM=YourDisplayName                      # e.g. MySuperDomain
    SMTP_HOST=your_smtp_host                        # e.g. smtp.ovh.net
    SMTP_PORT=your_smtp_port                        # e.g. 587
    SMTP_USER=your_smtp_user                        # e.g. user@example.pl
    SMTP_PASS=your_smtp_password                    # e.g. supersecretpassword
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
