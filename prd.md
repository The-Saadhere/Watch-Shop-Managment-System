# Product Requirements Document (PRD)

## 1. Product Overview
The Watch Management System is a backend API for managing a watch inventory and retail purchasing workflow. The system should help a store owner or inventory manager track watch products, supplier purchases, stock levels, and basic product engagement such as likes.

This project should focus on a clean and practical MVP that is easy to extend later.

---

## 2. Goal of the System
The main purpose is to allow the business to:

- Add and manage watch inventory
- Track product cost and selling price
- Monitor stock availability
- Register and sign in authorized users
- Track supplier purchases and product entry history
- Retrieve product details quickly through API routes

---

## 3. Target Users
### Primary user
- Store owner / admin
- Inventory manager

### Secondary users
- Staff users who may view products and stock information

---

## 4. Core Business Problem
The business needs a simple backend system to manage watch stock without using spreadsheets or manual tracking. The system should provide consistent product records and allow future features like inventory adjustments, sales processing, and supplier tracking.

---

## 5. MVP Scope
This is the minimum version that should be built first.

### 5.1 Authentication
Users must be able to register and sign in securely.

Required routes:
- POST /api/auth/register
- POST /api/auth/signin

### 5.2 Product Management
Admin should be able to manage the product catalog.

Required routes:
- GET /api/products
- POST /api/products/add
- GET /api/products/:id
- POST /api/products/:id/like

### 5.3 Supplier Management
To support purchase tracking, suppliers need to be stored.

Required routes:
- GET /api/suppliers
- POST /api/suppliers/add
- GET /api/suppliers/:id

### 5.4 Purchase Tracking
The system must store how many watches were purchased from a supplier.

Required routes:
- GET /api/purchases
- POST /api/purchases/add
- GET /api/purchases/:id

### 5.5 Stock Update Flow
When a purchase is created, stock should be increased automatically or tracked correctly.

Required logic:
- purchase quantity adds to stock
- purchase total is calculated
- product purchase price and selling price remain visible

---

## 6. Functional Requirements

### 6.1 User Authentication
- User can register with username, email, and password
- Password must be hashed before storing
- User cannot register if email or username already exists
- User can sign in with email and password
- Invalid credentials should return an error

### 6.2 Product Management
- Admin can add a new product
- Product contains:
  - name
  - modelNumber
  - purchasePrice
  - sellingPrice
  - stock
  - likes
- Product list should be accessible via API
- Single product details should be accessible by ID
- Product likes can be increased through a dedicated route

### 6.3 Supplier Management
- Admin can create supplier records
- Supplier contains:
  - name
  - contact
- Suppliers can be listed and fetched individually

### 6.4 Purchase Management
- A purchase record must include:
  - productId
  - supplierId
  - quantity
  - totalPrice
  - purchaseDate
- Purchase records should be linked to both product and supplier
- Total purchase value should be stored for reporting

### 6.5 Validation
- All required fields must be checked before creating records
- Invalid request payloads should return clear errors
- Invalid IDs should return 400 or 404 depending on the case

---

## 7. Data Model Requirements
The system should store data in Prisma/PostgreSQL with the following entities:

### users
- id
- username
- email
- password_hash
- created_at

### products
- id
- name
- modelNumber
- purchasePrice
- sellingPrice
- stock
- likes
- created_at

### suppliers
- id
- name
- contact
- created_at

### purchases
- id
- productId
- supplierId
- quantity
- totalPrice
- purchaseDate

---

## 8. API Route Plan
This is the recommended route structure for the system.

### Authentication
- POST /api/auth/register
- POST /api/auth/signin

### Products
- GET /api/products
- POST /api/products/add
- GET /api/products/:id
- POST /api/products/:id/like

### Suppliers
- GET /api/suppliers
- POST /api/suppliers/add
- GET /api/suppliers/:id

### Purchases
- GET /api/purchases
- POST /api/purchases/add
- GET /api/purchases/:id

### Optional future routes
- PATCH /api/products/:id
- DELETE /api/products/:id
- PATCH /api/products/:id/stock
- GET /api/products?low-stock=true
- GET /api/reports/stock-summary

---

## 9. Business Outcomes to Achieve
By the end of the MVP, the system should allow the business to:

- Add watches into the catalog
- Track product costs and selling prices
- Maintain accurate stock counts
- Register authorized users
- Link purchase records to suppliers
- See which products are popular via likes
- Access specific product history and inventory data quickly

---

## 10. Success Criteria
The MVP is successful when:

- A user can register and sign in
- A product can be created and fetched
- Product stock can be tracked with purchase records
- Supplier information can be stored and retrieved
- Purchase history is associated correctly with a product and supplier
- The API returns proper validation and error responses
- The backend runs reliably with Prisma and PostgreSQL

---

## 11. Non-Functional Requirements
- Use Express.js and Prisma for the backend
- Use PostgreSQL as the database
- Validate incoming request data before writing to the DB
- Return consistent JSON responses
- Use proper HTTP status codes
- Keep the API easy to extend for future features
- Protect user passwords with hashing

---

## 12. Recommended MVP Priority Order
1. Authentication
2. Product CRUD and listing
3. Product detail endpoint
4. Supplier CRUD
5. Purchase creation and tracking
6. Stock update logic
7. Error handling and validation polishing

---

## 13. Final Product Direction
This system should be built as a practical inventory API for a watch business, not as a broad e-commerce app. The initial focus should remain on essential inventory, supplier, and authentication workflows. Once those are stable, advanced features like sales, reports, and dashboard analytics can be added.
