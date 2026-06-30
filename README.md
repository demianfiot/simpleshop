# Simpleshop

Full-stack application with Go backend, React frontend

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Go 1.24, Gin, sqlx |
| **Database** | PostgreSQL 15 |
| **Cache** | Redis 7 |
| **Events** | Redpanda (Kafka-compatible) |
| **Analytics** | ClickHouse |
| **Frontend** | React 18, styled-components, react-router-dom v6 |
| **Auth** | JWT (HS256) + SHA1 password hashing |
| **Infra** | Docker, docker-compose, nginx |

## Architecture

```
┌──────────┐      ┌──────────┐      ┌────────────┐
│  Browser │ ──→  │  nginx   │ ──→  │  Go Gin    │
│ (React)  │      │  :80     │      │  :8080     │
└──────────┘      └──────────┘      └─────┬──────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
              ┌──────────┐         ┌──────────┐         ┌──────────┐
              │PostgreSQL│         │  Redis   │         │ Redpanda │
              │  :5432   │         │  :6379   │         │  :9092   │
              └──────────┘         └──────────┘         └────┬─────┘
                                                             │
                                                             ▼
                                                      ┌──────────┐
                                                      │ClickHouse│
                                                      │  :9000   │
                                                      └──────────┘
```

### Data Flow

1. **Auth** — React → POST `/api/auth/signup` / `/signin` → JWT token
2. **Products** — React → GET `/api/products` (public), POST/PATCH/DELETE (protected)
3. **Orders** — React → POST `/api/orders` → creates order + emits Kafka event → ClickHouse analytics
4. **Profile** — React → GET/PATCH `/api/profile` (JWT-protected)

## Project Structure

```
├── cmd/
│   ├── main.go              # Backend entrypoint
│   └── consumer/main.go     # Kafka consumer (ClickHouse writer)
├── configs/
│   └── config.yml           # Service configuration
├── pkg/
│   ├── handler/             # HTTP handlers (Gin routes)
│   ├── service/             # Business logic
│   ├── repository/          # Database access (PostgreSQL, Redis)
├── schema/
│   ├── 000001_init.up.sql   # PostgreSQL migrations
│   └── clickhouse/          # ClickHouse schema
├── todo/                    # Data models
├── frontend/
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── components/      # UI components
│   │   │   ├── auth/        # Login/Register forms
│   │   │   ├── cart/        # Shopping cart
│   │   │   ├── filters/     # Product filters
│   │   │   ├── layout/      # Header, Footer, AppLayout
│   │   │   ├── products/    # Product cards, grid, modal, form
│   │   │   └── ui/          # Toast notifications
│   │   ├── context/         # AuthContext, ThemeContext
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Dashboard, AuthPage, ProtectedRoute
│   │   └── styles/          # Light/dark theme tokens
│   └── public/              # Static assets
├── docker-compose.yml
├── Makefile
└── .env.example
```

## Quick Start (Docker)

### Prerequisites

- Docker & docker-compose
- Go 1.24+ (for local development)
- Node.js 18+ (for frontend development)

### Setup

```bash
# 1. Clone and enter the project
git clone <repo-url> && cd simpleshop

# 2. Create environment file
cp .env.example .env
# Edit .env with your values (SALT, JWT_SECRET, etc.)

# 3. Start all services
make up

# 4. Run database migrations
make migrate-up

# 5. Run ClickHouse migration
make klickhouse-migrate-up
```

The app will be available at `http://localhost`.
