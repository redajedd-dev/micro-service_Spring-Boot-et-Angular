# Microservices Management System (NexusFlow)

A comprehensive microservices-based full-stack application built with **Spring Boot** (Backend) and **Angular** (Frontend). This system demonstrates a modern distributed architecture for managing Customers, Inventory, and Billing.

## 🚀 Architecture

The application is composed of several independent microservices communicating via a generic Gateway.

### Backend Services (Spring Boot)

| Service | Port | Description |
| :--- | :--- | :--- |
| **Discovery Service** (Eureka) | `8761` | Service Registry & Discovery |
| **Config Service** | `9999` | Centralized Configuration Server |
| **Gateway Service** | `8888` | Main Entry Point & Routing |
| **Customer Service** | `8081` | Manages Customer data (H2 DB) |
| **Inventory Service** | `8082` | Manages Products & Stock (H2 DB) |
| **Billing Service** | `8083` | Manages Invoices & Bills (H2 DB) |

### Frontend (Angular)

| Application | Port | Description |
| :--- | :--- | :--- |
| **Angular Client** | `4200` | Modern SPA Dashboard |

---

## 🛠️ Technology Stack

- **Backend**: Java 17+, Spring Boot 3, Spring Cloud (Gateway, Config, Eureka, OpenFeign).
- **Frontend**: Angular 19, TypeScript, Modern CSS (Dark Theme).
- **Database**: H2 (In-memory) for development.
- **Tools**: Maven, NPM, Git.

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Java 17** or higher
- **Node.js** (v18+) & **NPM**
- **Maven**

### 2. Backend Setup
The backend consists of multiple maven modules. You can start them all using the provided script.

```bash
# Give execution permission
chmod +x start-all.sh

# Start all services
./start-all.sh
```
*Note: The script starts services in the correct order (Discovery -> Config -> Others).*

### 3. Frontend Setup (Angular)
Navigate to the Angular project directory:

```bash
cd angular-service

# Install dependencies
npm install

# Start the development server
npm start
```

### 4. Access the Application
Open your browser and navigate to:
**[http://localhost:4200](http://localhost:4200)**

---

## 🔌 API Endpoints (via Gateway)

- **Customers**: `http://localhost:8888/customer-service/api/customers`
- **Products**: `http://localhost:8888/inventory-service/api/products`
- **Bills**: `http://localhost:8888/billing-service/api/bills`

## 👨‍💻 Project Structure
```
micro-services-app-main/
├── billing-service/    # Spring Boot Billing Service
├── config-repo/        # Configuration files for all services
├── config-service/     # Spring Cloud Config Server
├── customer-service/   # Spring Boot Customer Service
├── discovery-service/  # Eureka Discovery Server
├── frontend-service/   # (Deprecated) React Frontend
├── angular-service/    # Current Angular Frontend
├── gatewey-service/    # Spring Cloud Gateway
└── start-all.sh        # Startup script
```
