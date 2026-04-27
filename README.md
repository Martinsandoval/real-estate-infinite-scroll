This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Testing

This project uses [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/) for unit and component tests.

### Run tests in watch mode

```bash
npm run test
```

### Run tests once (CI)

```bash
npm run test:run
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Test files

Tests live alongside the source files they cover:

| File                                                      | Test                        |
| --------------------------------------------------------- | --------------------------- |
| `app/components/common/Dialog/Dialog.tsx`                 | `Dialog.test.tsx`           |
| `app/components/common/HouseCard/HouseCard.tsx`           | `HouseCard.test.tsx`        |
| `app/components/common/HouseCardGrid/HouseCardGrid.tsx`   | `HouseCardGrid.test.tsx`    |
| `app/components/common/ImageList/ImageList.tsx`           | `ImageList.test.tsx`        |
| `app/components/common/InfiniteScroll/InfiniteScroll.tsx` | `InfiniteScroll.test.tsx`   |
| `app/hooks/useInfiniteScroll.ts`                          | `useInfiniteScroll.test.ts` |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
