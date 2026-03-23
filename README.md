# Web Quản Lý & Đăng Ký Học Phần - Backend API

Hệ thống quản lý và đăng ký học phần cho sinh viên, xây dựng với Node.js, Express, Sequelize ORM và MySQL.

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize 6
- **Database:** MySQL 8.0+ (utf8mb4)
- **Auth:** JWT + bcrypt
- **Validation:** express-validator
- **Testing:** Jest

##  Project Structure

```
src/
├── app.js                    # Express app setup
├── server.js                 # Entry point
├── config/database.js        # Sequelize config
├── models/                   # 6 Sequelize models
│   ├── Student.js
│   ├── Course.js
│   ├── Semester.js
│   ├── Section.js
│   ├── Schedule.js
│   └── Enrollment.js
├── services/                 # Business logic (BR01-BR09)
│   ├── auth.service.js
│   ├── enrollment.service.js
│   └── schedule.service.js
├── controllers/              # Route handlers
├── routes/                   # API route definitions
├── middleware/                # Auth, validation, errors
├── utils/                    # ApiError helper
├── seeders/seed.js           # Sample data
└── migrations/migrate.js     # DB migration runner
```

##  Getting Started

### 1. Prerequisites

- Node.js 18+
- MySQL 8.0+

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

### 4. Create Database & Tables

**Option A:** Run the SQL migration script directly:
```bash
mysql -u root -p < migrations/init.sql
```

**Option B:** Use the migration runner:
```bash
npm run migrate
```

**Option C:** Let Sequelize auto-sync (development only):
```bash
npm run dev
# Tables are auto-created on startup
```

### 5. Seed Sample Data

```bash
npm run seed
```

### 6. Start the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

##  API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new student |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/me` | Get current profile  |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List all students  |
| GET | `/api/students/:id` | Get student by ID  |
| PUT | `/api/students/:id` | Update student info  |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List courses (search, filter)  |
| GET | `/api/courses/:id` | Get course detail  |
| POST | `/api/courses` | Create course  |
| PUT | `/api/courses/:id` | Update course  |

### Semesters
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/semesters` | List all semesters  |
| GET | `/api/semesters/current` | Get current semester  |
| GET | `/api/semesters/:id` | Get semester by ID  |
| POST | `/api/semesters` | Create semester  |
| PUT | `/api/semesters/:id` | Update semester  |

### Sections
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sections` | List sections (filter by semester, course)  |
| GET | `/api/sections/:id` | Get section detail + schedules  |
| POST | `/api/sections` | Create section with schedules  |
| PUT | `/api/sections/:id` | Update section  |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enrollments` | Register for a section  |
| PUT | `/api/enrollments/:id/cancel` | Cancel enrollment  |
| GET | `/api/enrollments/my` | My enrollments  |

 = Requires JWT Bearer token

##  Business Rules

### Enrollment Rules (BR01-BR06)
- **BR01:** No duplicate enrollment for same section (DB UNIQUE constraint)
- **BR02:** Cannot enroll when section is full
- **BR03:** Only enroll during registration period (reg_open → reg_close)
- **BR04:** No schedule conflicts between enrolled sections
- **BR05:** Suspended students cannot enroll
- **BR06:** Cannot enroll in cancelled/closed sections

### Cancellation Rules (BR07-BR09)
- **BR07:** Can only cancel during registration period
- **BR08:** Atomic decrement of section's current_students count
- **BR09:** Soft delete only (status → 'cancelled', never DELETE)

##  Testing

```bash
npm test
```

Runs unit tests for schedule conflict detection (20 test cases).

##  Test Accounts (after seeding)

| Email | Password | Status |
|-------|----------|--------|
| an.nguyen@student.edu.vn | 123456 | active |
| binh.tran@student.edu.vn | 123456 | active |
| cuong.le@student.edu.vn | 123456 | active |
| duc.pham@student.edu.vn | 123456 | graduated |
| em.hoang@student.edu.vn | 123456 | suspended |

##  License

ISC
