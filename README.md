# GlobalSoft Ecommerce

This is a modern [Next.js](https://nextjs.org) ecommerce project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install dependencies

Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
```

### 2. Setup environment variables

Copy the example environment file and rename it to `.env`:

```bash
cp .env.example .env
```

No changes are needed unless you want to use a different API endpoint. By default, the project uses [dummyjson.com](https://dummyjson.com/products) as a fake products API.

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Features

- **Product Catalog**: Browse products fetched from a public API.
- **Product Details**: View detailed information and images for each product.
- **Cart**: Add, remove, and update product quantities. Cart state is persisted.
- **Favorites**: Mark products as favorites (stored locally).
- **Checkout**: Review your cart and confirm payment (fake flow).
- **Authentication**: Simple login simulation using a token in localStorage. Checkout is protected and redirects to `/login` if not authenticated.
- **Responsive Design**: Fully responsive and mobile-friendly.
- **Dark Mode**: Toggle between light and dark themes.
- **UX Enhancements**: Lazy loading images with spinners, animated cart dropdown, and outside click handling.

---

## Authentication

- To access the checkout page, you must be "logged in".
- Login is simulated: after logging in, a `fake_token` is saved in `localStorage`.
- If you try to access `/checkout` without being logged in, you will be redirected to `/login`.

---

## Environment Variables

- `NEXT_PUBLIC_BASE_URL` — The base URL for the products API.  
  Default: `https://dummyjson.com/products`

---

## Project Structure

- `/app` — Next.js app directory (pages, layouts, etc.)
- `/components` — Reusable UI components (Cart, ProductCard, Header, etc.)
- `/stores` — Zustand stores for cart and favorites state management
- `/styles` — Global styles and Tailwind config

---

## Useful Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server

---

## Notes

- All cart and favorites data is stored in localStorage (persisted between reloads).
- Product data is fetched from a public API and may change.
- This project is for demo and educational purposes.
