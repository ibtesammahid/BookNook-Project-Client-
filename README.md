# BookNook — A Small Online Library

**Live site:** [https://booknook-delta-blond.vercel.app](https://booknook-delta-blond.vercel.app)

BookNook is a small online library where users can browse the catalogue, add their own books, and borrow a book for a few days. The idea is simple: **“Add a book, borrow a book, return a book.”**

## Features

- **Browse & discover** — an All Books grid with cover, title, author and category, full book-detail pages, and a home page with a banner slider, dynamic New Arrivals (latest 6 books from MongoDB, newest first) and extra content sections.
- **Real authentication** — register and log in with email/password (password rules: uppercase, lowercase, at least 6 characters) or with Google, powered by Better Auth and the MongoDB adapter. Private pages send logged-out visitors to Login and return them to the page they wanted after signing in.
- **Private routes** — “Add Book”, “My Books” and “My Borrows” appear only for logged-in users; the navbar swaps Login/Register for the user photo, name and logout dropdown.
- **Full CRUD on your books** — add a book with a cover uploaded to imgbb, edit it from a pre-filled form, and delete it behind a custom confirm modal (no browser alerts). Success and error messages are shown with toasts.
- **Borrow system** — borrow a book for 14 days, watch the live “Total Copies” counter go down/up with `$inc`, see “Not Available” when copies run out, and get an error toast if you try to borrow the same book twice.
- **Protected API** — every personal or write endpoint on the Express server requires a JWT that is verified against the frontend’s JWKS, so identity and ownership always come from the verified token.
- **Polish** — responsive on mobile, tablet and desktop, loading skeletons while data fetches, a custom 404 page, a page title on every route, and AOS animations.

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, AOS |
| Authentication | Better Auth, MongoDB adapter, JWT |
| Backend | Express.js, MongoDB (native driver), `jose` for JWT/JWKS verification |
| Hosting & services | Vercel (frontend and backend), ImgBB (book covers), Google OAuth |

## Getting started

### Prerequisites

Node.js, npm, a MongoDB database, an ImgBB API key and Google OAuth credentials.

### 1. Clone and install

```bash
git clone https://github.com/ibtesammahid/BookNook-Project-Client-.git
cd BookNook-Project-Client-
npm install
```

### 2. Configure environment

Create `.env.local` in the frontend:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Create `.env` in the [server repository](https://github.com/ibtesammahid/BookNook-Project-SERVER-):

```env
MONGODB_URI=your_mongodb_connection_string
IMGBB_API_KEY=your_imgbb_api_key
CLIENT_URL=http://localhost:3000
AUTH_JWKS_URL=http://localhost:3000/api/auth/jwks
AUTH_ISSUERS=http://localhost:3000
```

### 3. Run both apps

```bash
# backend (terminal 1) — listens on http://localhost:5000
node index.js

# frontend (terminal 2) — http://localhost:3000
npm run dev
```

## Repositories

- **Client:** https://github.com/ibtesammahid/BookNook-Project-Client-
- **Server:** https://github.com/ibtesammahid/BookNook-Project-SERVER-

## Author

Created as a library management project using Next.js, Express and MongoDB.
