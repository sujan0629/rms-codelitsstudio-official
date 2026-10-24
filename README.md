# Restaurant-management application foundation

A Next.js application foundation for a restaurant-management product. The current public code concentrates on account access, protected dashboard/admin routes, and subscription billing integration.

## Implemented areas and boundaries

- NextAuth account/session integration with a Prisma database adapter.
- Prisma models for users, accounts, sessions, and verification tokens.
- Stripe checkout/webhook integration code and account/billing interfaces.
- Dashboard/admin layout and reusable UI components.

The admin orders page is a placeholder. The current Prisma schema does not define restaurant orders, stock, or staff operations. Those capabilities should not be inferred from the product name.

## Development

Install Node.js and npm, clone the repository, then run:

```bash
npm install
npm run dev
```

Installation runs Prisma generation. Configure a development `DATABASE_URL` and the authentication/billing variables consumed by the routes you enable. Use Stripe test mode for billing development. Check [package.json](package.json) for build, start, and email-preview scripts and [the Prisma schema](prisma/schema.prisma) for the database provider and models before creating a database.

## Source map

- [Application routes](app)
- [Prisma schema](prisma/schema.prisma)
- [Components](components)

This is an application foundation, not a claim of a complete or deployed restaurant operations system. Existing attribution and license terms in [LICENSE.md](LICENSE.md) remain unchanged.
