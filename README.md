# Bangladeshi IT — Client

<div align="center">
  [![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

  <p>Frontend for the Bangladeshi IT company website — a software/IT services site with a public marketing site, a blog, and a role-based admin dashboard.</p>
</div>

---

## Project Overview

This project was migrated from an e-commerce platform (NextBazar) into an IT services company site. What survived the migration is the reusable application shell, not the shopping features:

- **Public site**: Home, About, Blog, Contact, FAQ, Privacy, Terms — content for About/Terms/Privacy is CMS-driven (editable from the admin dashboard).
- **Auth**: Login, register, email verification, forgot password (better-auth + JWT).
- **Dashboards**: Role-based layout with separate `User` and `Admin`/`Super Admin` route groups, shared sidebar/navbar/notification-dropdown shell.
- **Admin dashboard**: User management, Blog CRUD, Page content (CMS) + FAQ management, Site settings, SMS settings.
- **RAG Chatbot**: A floating AI assistant backed by a Retrieval-Augmented-Generation pipeline that indexes blog posts, FAQs, and page content.
- **Reusable patterns kept intentionally**: TanStack Query service-layer pattern, TanStack Form + Zod validation, a generic server-managed `DataTable` (with search/filter/pagination hooks), shadcn/radix UI primitives, axios http client, JWT/cookie auth utils.

A few e-commerce-adjacent modules (SMS settings) were kept because they have no dependency on the removed product/order data model. Everything else product/cart/order/payment/shipping/POS/report-related was removed — see `MIGRATION_PLAN.md` at the repo root for the full list of what was kept vs. removed.

## Getting Started

```bash
npm install
npm run dev
```

Configure `.env.local` with the backend URL and any auth/service keys before running.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/radix UI
- **Data fetching**: TanStack Query
- **Forms**: TanStack Form + Zod
- **Auth**: better-auth
- **Rich text**: Tiptap (used in the blog editor)
