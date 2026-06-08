# FindRent API 🏠

REST API for real estate property management. Built as a backend portfolio project using Node.js, Express, PostgreSQL, and Knex.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Query Builder:** Knex.js
* **Documentation:** Swagger / OpenAPI 3.0
* **Geolocation:** OpenStreetMap Nominatim API

---

## 📁 Project Structure

```text
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
```

---

## ✨ Features

* CRUD for property owners
* CRUD for properties
* CRUD for amenities
* Pagination for property listings
* Property filtering by:

  * City
  * Price range
  * Bedrooms
  * Bathrooms
  * Operation type (SALE / RENT)
* Many-to-many relationship between properties and amenities
* Interactive API documentation with Swagger
* Automatic geolocation coordinate generation
* Layered architecture (Routes → Controllers → Services)

---

## 🗄️ Database Schema

| Table                | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `owners`             | Property owners                                               |
| `properties`         | Properties for sale or rent including geolocation coordinates |
| `amenities`          | Available amenities                                           |
| `property_amenities` | Many-to-many relationship between properties and amenities    |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KuroVs/findrent_backend.git
cd findrent_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database named `findrent`.

Update the credentials inside `knexfile.js`:

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

Server runs at:

```text
http://localhost:3000
```

---

## 📖 API Documentation

Interactive Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

---

## 📌 Endpoints

### Owners

| Method | Route         | Description     |
| ------ | ------------- | --------------- |
| GET    | `/owners`     | Get all owners  |
| GET    | `/owners/:id` | Get owner by ID |
| POST   | `/owners`     | Create owner    |
| PATCH  | `/owners/:id` | Update owner    |
| DELETE | `/owners/:id` | Delete owner    |

---

### Properties

| Method | Route                                  | Description                              |
| ------ | -------------------------------------- | ---------------------------------------- |
| GET    | `/properties`                          | Get all properties (paginated + filters) |
| GET    | `/properties/:id`                      | Get property by ID                       |
| POST   | `/properties`                          | Create property                          |
| PATCH  | `/properties/:id`                      | Update property                          |
| DELETE | `/properties/:id`                      | Delete property                          |
| POST   | `/properties/:id/amenities`            | Add amenities to property                |
| DELETE | `/properties/:id/amenities/:amenityId` | Remove amenity from property             |

---

### Amenities

| Method | Route            | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/amenities`     | Get all amenities |
| GET    | `/amenities/:id` | Get amenity by ID |
| POST   | `/amenities`     | Create amenity    |
| PATCH  | `/amenities/:id` | Update amenity    |
| DELETE | `/amenities/:id` | Delete amenity    |

---

## 🔍 Query Filters for GET /properties

| Filter           | Type    | Example                |
| ---------------- | ------- | ---------------------- |
| `city`           | string  | `?city=medellin`       |
| `min_price`      | number  | `?min_price=1000000`   |
| `max_price`      | number  | `?max_price=5000000`   |
| `bedrooms`       | integer | `?bedrooms=3`          |
| `bathrooms`      | integer | `?bathrooms=2`         |
| `operation_type` | string  | `?operation_type=SALE` |
| `page`           | integer | `?page=1`              |
| `limit`          | integer | `?limit=10`            |

Example:

```http
GET /properties?city=medellin&operation_type=RENT&page=1&limit=10
```

---

## 🌍 Geolocation

When a property is created, the API automatically generates latitude and longitude coordinates based on the provided city and address using the OpenStreetMap Nominatim API.

Example request:

```json
{
  "city": "Medellin",
  "address": "El Poblado"
}
```

Example generated coordinates:

```json
{
  "latitude": 6.2088,
  "longitude": -75.5658
}
```

The coordinates are stored in the database and returned by the API.

---

## 🏗️ Architecture

The project follows a layered architecture:

```text
Routes → Controllers → Services → Database
```

### Routes

Defines API endpoints and request paths.

### Controllers

Handles requests and responses.

### Services

Contains business logic and database queries.

### Database

Managed through Knex.js and PostgreSQL.

---

## 🔜 Upcoming Features

* [ ] JWT Authentication
* [ ] Role-based authorization
* [ ] Property image uploads
* [ ] Interactive map integration
* [ ] Docker support

---

## 👨‍💻 Author

Developed by Miguel Angel Viloria Sierra as part of a backend development portfolio.
