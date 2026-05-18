# GhanaPay White-Label Frontend (Customer + Admin)

Production-oriented React + TypeScript frontend for a white-label GhanaPay customer app and admin portal, designed for Ghanaian banking/wallet use cases.

## Tech Stack

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

## Validation

```bash
npm run lint
npm run build
```

## Mock Login Credentials

- `customer@demo.com / Password123!`
- `admin@demo.com / Password123!`
- `operations@demo.com / Password123!`
- `compliance@demo.com / Password123!`
- `support@demo.com / Password123!`

## Route Structure

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

## Architecture Summary

- `src/app`: app entry, router, providers
- `src/config`: app config, branding config, navigation config
- `src/api`: API client wrappers and in-memory delayed mock server
- `src/auth`: mock JWT auth, role permissions, protected routes, session warning
- `src/components`: reusable layout and UI components
- `src/features/customer`: customer app pages and flows
- `src/features/admin`: admin portal pages and dashboards
- `src/types`: typed DTOs and domain models
- `src/utils`: currency/date formatting, masking, receipt print helper
- `src/styles`: global Tailwind and branding styles

## Real API Integration Points (Later)

The current implementation is mock-first. Replace mock handlers in `src/api/mockServer.ts` by wiring `httpClient.ts` and API modules to:

- GhIPSS GhanaPay released APIs (wallet rails, GhQR, settlement interfaces)
- Institution backend services (auth, KYC orchestration, reconciliation, risk engine, audit storage)

Recommended integration pattern:

1. Keep response envelope shape (`success`, `responseCode`, `message`, `data`, `reference`, `timestamp`) stable.
2. Swap each API module (`authApi`, `walletApi`, `transferApi`, `paymentApi`, `kycApi`, `adminApi`, `reconciliationApi`) from mock functions to Axios requests.
3. Preserve all page/query/mutation contracts so UI remains unchanged.

## Security Notes

- No live GhIPSS credentials or real secrets are hardcoded.
- PIN values are never displayed after entry.
- Mock failed login and failed PIN attempt logic is included.
- Sensitive values (phone and Ghana Card) are masked in profile/admin views.
