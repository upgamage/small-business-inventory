# Small Business Inventory Management System

## Project Goal

Build a backend system that helps small businesses manage
products, suppliers, purchase orders, incoming stock, and inventory.


## 1. Project Overview

The Small Business Inventory Management System is a backend-based
application designed to help small businesses manage products,
suppliers, purchase orders, incoming stock, and inventory records.


## 2. Problem

Small businesses often manage their inventory using manual methods
such as notebooks, spreadsheets, or disconnected records.

This can make it difficult to accurately track current stock,
incoming stock, suppliers, purchase orders, and the history of
inventory changes.

When new stock arrives, the business owner may need to manually
update inventory records, increasing the possibility of mistakes
and making it difficult to trace how the current stock quantity
was calculated.


## 3. Proposed Solution

The system will provide a centralized inventory management backend
that allows a small business owner to manage products, categories,
and suppliers, create purchase orders, record incoming stock, and
view current inventory.

When stock is received from a supplier, the system will validate
the received quantity, automatically update the product's current
stock, record an inventory transaction, and update the purchase
order status.

The system will expose these capabilities through a RESTful API
that can later be consumed by a Flutter mobile application.


## 4. Target User

The primary user of the MVP is a small business owner or shop owner
who needs to manage products, suppliers, purchase orders, and
inventory.


## 5. Project Goal

The goal of this project is to build a reliable RESTful backend
for small-business inventory management while demonstrating
practical backend development concepts including authentication,
database design, API development, validation, business logic,
database transactions, and inventory tracking.


## 6. MVP Features

### 6.1 Authentication

The user can register and log in to the system.

The backend will:
- Store user account information securely.
- Hash passwords before storing them.
- Authenticate users using JWT.
- Protect inventory-related API endpoints.


### 6.2 Categories

The user can create and manage product categories.

The backend will support:
- Creating categories.
- Viewing categories.
- Updating categories.
- Deleting categories.


### 6.3 Products

The user can create and manage products.

Each product will contain:
- Name.
- SKU.
- Optional barcode.
- Description.
- Category.
- Cost price.
- Selling price.
- Current stock.
- Minimum stock level.

The backend will support:
- Creating products.
- Viewing products.
- Viewing a single product.
- Updating products.
- Deleting products.
- Searching products.
- Filtering products by category.


### 6.4 Suppliers

The user can manage suppliers from whom products are purchased.

The backend will support:
- Creating suppliers.
- Viewing suppliers.
- Viewing a single supplier.
- Updating suppliers.
- Deleting suppliers.

Supplier information will include:
- Name.
- Phone number.
- Email.
- Address.


### 6.5 Purchase Orders

The user can create and view purchase orders for suppliers.

A purchase order will:
- Belong to one supplier.
- Contain one or more products.
- Store the quantity ordered for each product.
- Store the unit cost for each product.
- Track how much of each item has been received.
- Have a defined status.

Purchase order statuses:
- PENDING
- PARTIALLY_RECEIVED
- RECEIVED
- CANCELLED


### 6.6 Stock Receiving

The user can record stock received against an existing purchase order.

When stock is received, the backend will:
- Validate the purchase order.
- Validate the received products and quantities.
- Ensure that the received quantity does not exceed the remaining ordered quantity.
- Increase the product's current stock.
- Create an inventory transaction.
- Update the received quantity of the purchase order item.
- Recalculate the purchase order status.

Stock receiving must be performed as a database transaction so that
related inventory records remain consistent.


### 6.7 Inventory

The user can view current inventory levels.

The backend will provide:
- Current stock for each product.
- Product search.
- Low-stock products.
- Basic inventory information.


### 6.8 Inventory History

The user can view inventory transactions for a product.

Each transaction will record:
- Product.
- Transaction type.
- Quantity.
- Reference.
- Date/time.

The MVP will support stock-in and inventory adjustment transactions.


### 6.9 Low-Stock Detection

Each product will have a minimum stock threshold.

A product is considered low stock when:

currentStock <= minimumStock

The backend will provide an endpoint for retrieving low-stock products.


## 7. Out of Scope

The following features will not be implemented in the MVP:

- Customer accounts.
- Customer shopping/cart.
- Online payments.
- Full POS functionality.
- Sales management.
- Multiple branches.
- Multiple warehouses.
- Supplier accounts/portals.
- Email or SMS notifications.
- Advanced analytics.
- Advanced reporting.
- Automatic purchasing.
- Offline synchronization.
- AI features.
- Full barcode/QR scanning workflow.


## 8. Future Improvements

Possible future versions may include:

- Barcode and QR code scanning.
- Sales/POS module.
- Multiple users and role-based permissions.
- Multiple branches.
- Warehouse management.
- Supplier portal.
- Low-stock notifications.
- Automatic reorder suggestions.
- Advanced reporting and analytics.
- Flutter mobile application.
- Web administration dashboard.
- Offline synchronization.
- Audit logging.


## 9. Business Workflows

### 9.1 Create Purchase Order

1. The user selects an existing supplier.
2. The user adds one or more products.
3. The user specifies the quantity required for each product.
4. The user specifies the unit cost for each item.
5. The system validates the products and quantities.
6. The system creates the purchase order.
7. The purchase order is initially assigned the `PENDING` status.


### 9.2 Receive Stock

1. The user selects an existing purchase order.
2. The system verifies that the purchase order exists.
3. The system verifies that the purchase order can receive stock.
4. The user specifies the quantity received for each item.
5. The system validates that the received quantity is greater than zero.
6. The system verifies that the received quantity does not exceed the remaining ordered quantity.
7. The system increases the current stock of each product.
8. The system records an inventory transaction for each received item.
9. The system updates the quantity received for each purchase order item.
10. The system recalculates the purchase order status.
11. All related database changes are completed as one transaction.


### 9.3 Purchase Order Status Rules

#### PENDING
The purchase order has been created but no stock has been received.

#### PARTIALLY_RECEIVED
At least one item has been partially or fully received, but some
ordered quantity is still outstanding.

#### RECEIVED
All ordered quantities have been received.

#### CANCELLED
The purchase order has been cancelled and can no longer receive stock.


### 9.4 Valid Status Transitions

PENDING → PARTIALLY_RECEIVED
PENDING → RECEIVED
PENDING → CANCELLED

PARTIALLY_RECEIVED → RECEIVED
PARTIALLY_RECEIVED → CANCELLED


### 9.5 Inventory Rules

1. Current stock must never become negative.
2. Receiving stock increases current stock.
3. Every stock receipt creates an inventory transaction.
4. Manual inventory adjustments must create an inventory transaction.
5. Inventory changes must be traceable through inventory transactions.
6. Inventory updates must be performed atomically with their related
   purchase order changes.


### 9.6 Product Rules

1. Product name is required.
2. SKU is required and must be unique.
3. Barcode is optional but must be unique when provided.
4. Cost price cannot be negative.
5. Selling price cannot be negative.
6. Minimum stock cannot be negative.
7. Every product belongs to a category.



### 9.7 Inventory Adjustment

The user can perform a manual inventory adjustment when the recorded
stock differs from the actual physical stock.

An adjustment must:
- Specify the product.
- Specify the quantity change.
- Have a valid reason/reference.
- Update current stock.
- Create an `ADJUSTMENT` inventory transaction.


### 9.8 Low-Stock Rule

A product is considered low stock when:

currentStock <= minimumStock

The system will provide a way to retrieve all low-stock products.

The MVP will not send notifications.


### 9.9 Deletion Rules

A product cannot be permanently deleted if it is referenced by existing
purchase order items or inventory transactions.

A supplier cannot be permanently deleted if it is referenced by an
existing purchase order.

The system should return an appropriate error when deletion is not
allowed.



## 10. Database Design

### Entities

- User
- Category
- Product
- Supplier
- PurchaseOrder
- PurchaseOrderItem
- InventoryTransaction

### Relationships

- Category has many Products.
- Supplier has many PurchaseOrders.
- PurchaseOrder has many PurchaseOrderItems.
- Product can appear in many PurchaseOrderItems.
- Product has many InventoryTransactions.

### Design Decisions

- The MVP does not use a Business table.
- Current stock is stored on Product.
- InventoryTransaction stores stock-change history.
- PurchaseOrderItem stores product-specific purchase information.




## 11. Database Constraints

### Users
- `email` is required and unique.

### Categories
- `name` is required and unique.

### Products
- `sku` is required and unique.
- `barcode` is optional and unique when provided.
- `categoryId` is required.
- `costPrice` cannot be negative.
- `sellingPrice` cannot be negative.
- `currentStock` cannot be negative.
- `minimumStock` cannot be negative.

### Suppliers
- `name` is required.

### Purchase Orders
- `supplierId` is required.
- `status` must use the predefined purchase order statuses.

### Purchase Order Items
- `purchaseOrderId` is required.
- `productId` is required.
- `quantityOrdered` must be greater than zero.
- `quantityReceived` cannot be negative.
- `unitCost` cannot be negative.
- `(purchaseOrderId, productId)` must be unique.

### Inventory Transactions
- `productId` is required.
- `type` must use a predefined transaction type.
- `quantity` cannot be zero.
- Inventory transactions are immutable.





