# 🔐 Auth App – Next.js + NextAuth + MongoDB

Projekt pokazowy systemu logowania i rejestracji użytkowników stworzony w Next.js z wykorzystaniem MongoDB, NextAuth oraz do walidacji formularzy React Hook Form oraz Zod.

> Projekt demonstracyjny – stworzony w celach prezentacji moich umiejętności

---

## 🧰 Wymagania

- Node.js w wersji `18.x` lub nowszej
- MongoDB (np. MongoDB Atlas)

---

## ⚙️ Instalacja lokalna

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/szymekst/auth-nextjs-mongodb.git
   cd auth-nextjs-mongodb
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Utwórz plik `.env.local` i uzupełnij zmienne środowiskowe**
   ```
   MONGODB_URI=URI_DO_POŁĄCZENIA_Z_MONGODB
   NEXTAUTH_SECRET=LOSOWY_CIĄG_ZNAKÓW_JAKO_SECRET
   NEXTAUTH_URL=http://localhost:3000/
   RESEND_API_KEY=API_KEY_RESEND
   ```

   🔑 `NEXTAUTH_SECRET` możesz wygenerować np. poleceniem:
   ```bash
   openssl rand -base64 32
   ```

4. **Uruchom aplikację**
   ```bash
   npm run dev
   ```

5. **Otwórz przeglądarkę** i przejdź do `http://localhost:3000`

---

## 📄 Licencja

Projekt dostępny na licencji MIT.
