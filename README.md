# Automatic Sniffle — Next.js + Prisma + SQLite + Tailwind (shadcn-style)

What’s inside

- Next.js 14 (App Router)
- SQLite via Prisma ORM
- Tailwind CSS + tailwindcss-animate + minimal shadcn-style UI primitives
- DDD layers: domain, application, infrastructure, presentation (app)
- Zod validation, React Hook Form

Project layout

- src/domain — Entities and repository contracts
- src/application — Use cases (services)
- src/infrastructure — Prisma repository and db client
- src/app — Routes (pages and API)
- prisma/ — Prisma schema, migrations, seed

Prereqs

- Node.js 18+

Setup

1. Install deps
   npm install

2. Setup DB and generate client
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed # optional

3. Run dev server
   npm run dev

Open http://localhost:3000

Key routes

- / — landing
- /sniffles/new — create form
- /api/sniffles — list (GET) and create (POST)

Design decisions

- ORM: Prisma is widely adopted and ergonomic with SQLite.
- DDD & SOLID: domain entity (Sniffle), repository interface, application services (use cases), and an infrastructure adapter (Prisma) to decouple persistence from domain logic.
- Patterns: Repository, Use Case (Application Service), Dependency Inversion between application and infrastructure.

Tailwind & UI

- Tailwind is configured in tailwind.config.ts; tokens live in CSS variables in src/app/globals.css.
- Minimal shadcn-style components are in src/components/ui (Button, Input, Label, Card) and utilities in src/lib/utils.ts.

Prisma quick refs

- Edit schema in prisma/schema.prisma
- Generate client: npx prisma generate
- Migrate dev: npx prisma migrate dev --name <name>
- Studio: npm run prisma:studio

Notes

- Environment: .env with DATABASE_URL=file:./dev.db
