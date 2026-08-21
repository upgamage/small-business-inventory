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