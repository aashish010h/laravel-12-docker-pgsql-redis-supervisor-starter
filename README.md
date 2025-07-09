# Laravel 12 Docker Starter With PGSQL, Redis, Supervisor 🚀

A modern Laravel 12 starter kit bundled with Docker, Makefile commands, and Laravel best practices.

---

## ⚡ Quick Setup

### 1. Create a new project

```bash
git clone 
cd cloned-project
```

---

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your database and service credentials.

---

### 3. Start containers

```bash
docker-compose up -d
# or use Make:
make up
```

---

### 4. Install dependencies

```bash
make composer install
make npm install
```

---

### 5. Initialize Laravel

```bash
make artisan key:generate
make artisan migrate
make artisan storage:link
```

---

### 6. Run frontend (Dev mode)

```bash
make npm run dev
```

---


