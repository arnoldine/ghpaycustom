# ghpaycustom

Production-ready white-label GhanaPay customer app and admin portal frontend built with React + TypeScript + Vite.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Zod + React Hook Form
- Axios
- Recharts

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build and lint

```bash
npm run lint
npm run build
```

## Mock login credentials

- `customer@demo.com / Password123!`
- `admin@demo.com / Password123!`
- `operations@demo.com / Password123!`
- `compliance@demo.com / Password123!`
- `support@demo.com / Password123!`

> For transaction PIN on mock payment forms, use `1234`.

## Route map

### Customer

- `/`
- `/login`
- `/register`
- `/verify-otp`
- `/set-pin`
- `/dashboard`
- `/wallet`
- `/transactions`
- `/transfers`
- `/cash-in`
- `/cash-out`
- `/ghqr`
- `/airtime`
- `/bills`
- `/statements`
- `/complaints`
- `/profile`
- `/kyc`
- `/devices`
- `/receipt/:transactionId`

### Admin

- `/admin/login`
- `/admin/dashboard`
- `/admin/customers`
- `/admin/wallets`
- `/admin/transactions`
- `/admin/reconciliation`
- `/admin/agents`
- `/admin/merchants`
- `/admin/disputes`
- `/admin/risk`
- `/admin/reports`
- `/admin/audit-logs`
- `/admin/settings`

## Architecture summary

- `src/config`: white-label branding, navigation and app config.
- `src/api`: realistic API wrappers and in-memory `mockServer` with delayed responses.
- `src/auth`: mock JWT auth, role-based route protection, module-level admin permissions, session warning.
- `src/components`: reusable layout and UI components.
- `src/features/customer`: customer wallet journeys (dashboard, transfers, cash services, GhQR, bills, KYC, devices, complaints, receipt).
- `src/features/admin`: admin portal modules (dashboard KPIs/charts, customers, transactions, reconciliation, disputes, risk, reports, audit, settings).
- `src/types`: typed DTOs and domain models.
- `src/utils`: currency/date formatting, validation schemas, receipt helpers.

## Integrating released APIs later

Replace mock methods in `src/api/*.ts` by switching to real API calls via `httpClient.ts`:

1. **GhIPSS GhanaPay APIs**
   - Transfer/payment/settlement/reconciliation endpoints currently simulated in `transferApi.ts`, `paymentApi.ts`, `reconciliationApi.ts`.
2. **Institution backend APIs**
   - Auth, profile/KYC, admin operations currently simulated in `authApi.ts`, `kycApi.ts`, `adminApi.ts`, and `mockServer.ts`.
3. **Security hardening**
   - Keep PIN handling write-only in UI.
   - Move demo persistence to secure backend/session storage before production.

No live credentials or real secrets are hardcoded.
