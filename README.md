# FindRent API 🏠

REST API for real estate property management. Built as a backend portfolio project.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Query Builder:** Knex.js
- **Documentation:** Swagger / OpenAPI 3.0


## 📁 Project Structure

    findrent_backend/
    ├── config/
    │   ├── db.js
    │   └── swagger.js
    ├── controllers/
    │   ├── owners.controller.js
    │   ├── properties.controller.js
    │   └── amenities.controller.js
    ├── services/
    │   ├── owners.service.js
    │   ├── properties.service.js
    │   └── amenities.service.js
    ├── routes/
    │   ├── owners.routes.js
    │   ├── properties.routes.js
    │   └── amenities.routes.js
    ├── database/
    │   └── migrations/
    ├── index.js
    ├── knexfile.js
    └── README.md

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `owners` | Property owners |
| `properties` | Rental properties |
| `amenities` | Available amenities |
| `property_amenities` | Many-to-many relationship between properties and amenities |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/findrent-backend.git
cd findrent-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database named `findrent` and update the credentials in `knexfile.js`:

```js
development: {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_user',
    password: 'your_password',
    database: 'findrent',
    port: 5432
  }
}
```

### 4. Run migrations

```bash
npx knex migrate:latest
```

### 5. Start the server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

## 📖 API Documentation

Interactive documentation available at:
http://localhost:3000/api-docs

## 📌 Endpoints

### Owners
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/owners` | Get all owners |
| GET | `/owners/:id` | Get owner by ID |
| POST | `/owners` | Create owner |
| PATCH | `/owners/:id` | Update owner |
| DELETE | `/owners/:id` | Delete owner |

### Properties
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/properties` | Get all properties (paginated + filters) |
| GET | `/properties/:id` | Get property by ID |
| POST | `/properties` | Create property |
| PATCH | `/properties/:id` | Update property |
| DELETE | `/properties/:id` | Delete property |
| POST | `/properties/:id/amenities` | Add amenities to property |
| DELETE | `/properties/:id/amenities/:amenityId` | Remove amenity from property |

### Amenities
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/amenities` | Get all amenities |
| GET | `/amenities/:id` | Get amenity by ID |
| POST | `/amenities` | Create amenity |
| PATCH | `/amenities/:id` | Update amenity |
| DELETE | `/amenities/:id` | Delete amenity |

### Query filters for GET /properties

| Filter | Type | Example |
|--------|------|---------|
| `city` | string | `?city=monteria` |
| `min_price` | number | `?min_price=1000000` |
| `max_price` | number | `?max_price=3000000` |
| `bedrooms` | integer | `?bedrooms=2` |
| `bathrooms` | integer | `?bathrooms=1` |
| `page` | integer | `?page=1` |
| `limit` | integer | `?limit=10` |

## 🏗️ Architecture
Routes → Controllers → Services → Database (Knex / PostgreSQL)

- **Routes:** Defines HTTP endpoints
- **Controllers:** Handles request and response
- **Services:** Contains business logic and database queries

## 🔜 Upcoming Features

- [ ] JWT Authentication
- [ ] Admin dashboard (React Frontend)
- [ ] Property search with interactive map
- [ ] Property image uploads