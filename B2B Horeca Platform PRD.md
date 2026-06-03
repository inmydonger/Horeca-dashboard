# **Product Requirements Document (PRD)**

## **RME Horeca \- B2B Wholesale SaaS Platform**

### **1\. Executive Summary**

RME Horeca is a specialized B2B e-commerce SaaS (Software as a Service) platform designed to empower wholesale sellers in the Hotel, Restaurant, and Cafe (Horeca) industry. As a multi-tenant SaaS, RME Horeca provides the underlying infrastructure.

**System Boundary Clarification:** The platform is divided into two distinct interfaces:

1. **The Seller Dashboard (Scope of this PRD):** The back-office command center used exclusively by RME Horeca internal staff (SaaS Admins) and the subscribing wholesale suppliers (Seller Admins).  
2. **The Buyer Portal (External):** A separate, restricted-access storefront where vetted Horeca buyers log in to view their custom pricing and place order requests. Buyers *never* access the Seller Dashboard.

Unlike standard B2C platforms like Shopify, RME Horeca accounts for the complexities of B2B relationships: offline payment reconciliation (Net-30/60 terms), manual customer vetting, account-level global discounts, and decoupled order fulfillment tracks.

### **2\. Target Audience & Roles (Seller Dashboard Users)**

* **SaaS Super Admin (RME Horeca Internal):** Manages the core SaaS infrastructure, onboards new wholesale seller partners (tenants), sets up their dedicated environments, and monitors system-wide platform analytics.  
* **Seller Admin (The Partner \- Primary User):** The wholesale supplier (e.g., a coffee roaster or meat distributor) subscribing to RME Horeca. They use this dashboard to manage their inventory, vet their Horeca buyers, adjust incoming order requests, and reconcile offline payments.

*External Actors (Interacting via Buyer Portal & Email only):*

* *Buyer Operations (Chef/Purchaser):* Receives access via the Seller Admin's manual invite. Places orders on the Buyer Portal based on kitchen needs.  
* *Buyer Finance (HO Accountant):* Receives automated PDF invoices via email. Responsible for executing offline bank transfers.

### **3\. Core Architectural Decisions**

* **SaaS Multi-Tenancy:** The dashboard will feature "Powered by RME Horeca" branding while prominently displaying the specific Seller Partner's logo and identity in their tenant space.  
* **Account Structure (1:1 Model):** One Company \= One Account. Registration for buyers is strictly manual via Seller Admin invite to enforce credit limits. No open B2C sign-ups.  
* **Pricing Strategy:** Unified Base Price on products with a "Global Discount Percentage" applied at the Customer Account level. Low-margin products feature an "Exclude from Discount" toggle.  
* **Payment Flow:** Strictly offline (bank transfers). The dashboard tracks "Booked Revenue" (orders placed) versus "Collected Revenue" (orders marked paid by admin).  
* **Fulfillment vs. Payment:** Order statuses are decoupled into two distinct tracks: Fulfillment (Pending \> Processing \> Shipped) and Payment (Unpaid \> Paid \> Overdue).

### **4\. Key Features (Seller Dashboard)**

* **Admin Invite & Onboarding:** UI for sellers to input vetted company details, assign global discounts, set Net-terms, and trigger secure email invites to the Buyer Portal.  
* **Order Triage Inbox:** A Kanban-style data table prioritizing "Pending" orders requiring stock verification.  
* **Order Detail Hub & Line-Item Adjustment:** Allows Seller Admins to modify requested quantities before accepting the order (handling partial stock) and generate final adjusted invoices.  
* **Cash Flow Analytics:** Dashboard separating Booked Revenue, Collected Cash, and Outstanding A/R (Accounts Receivable).  
* **B2B PDF Invoicing:** Automated generation of tax-compliant PDF invoices detailing HO Billing vs. Branch Delivery addresses.  
* **Automated Email Triggers:** Role-specific email routing managed by the system (e.g., sending dispatch notices to the Chef, but overdue reminders to HO Finance).

### **5\. Core User Flows (Cross-System Interactions)**

**Flow 1: Customer Onboarding (Manual Vetting)**

*Objective: Seller brings a new Horeca buyer onto the platform.*

1. **Offline Agreement:** Seller negotiates pricing and payment terms with a new Horeca business offline.  
2. **Dashboard Action:** Seller Admin navigates to "Customers" \> "Create Customer Account" in the **Seller Dashboard**.  
3. **Data Entry:** Seller Admin inputs Company Name, Tax ID, Addresses, and Contact Email. Sets "Global Discount" and "Payment Terms".  
4. **System Action:** RME Horeca generates a secure invite link and emails it to the Buyer.  
5. **External Action:** Buyer clicks the link, sets their password, and gains access to the separate **Buyer Portal**.

**Flow 2: Order Triage & Fulfillment**

*Objective: Seller processes an incoming request and handles partial stock.*

1. **External Action:** Buyer logs into the **Buyer Portal**, builds a cart, and submits an "Order Request".  
2. **Dashboard Action:** Order appears in the Seller Admin's "Triage Inbox" (Seller Dashboard) as "Pending".  
3. **Stock Review:** Seller Admin clicks into the order and verifies warehouse stock.  
4. **Line-Item Adjustment:** If short on stock (e.g., requested 10, only 8 available), the Seller Admin edits the line-item quantity down to 8\. The system auto-recalculates totals.  
5. **Acceptance:** Seller Admin clicks "Accept Order". System emails the Buyer confirming the adjusted order.  
6. **Dispatch:** Seller Admin marks order as "Shipped". System emails the final PDF Tax Invoice to the Buyer's Finance department.

**Flow 3: Offline Payment Reconciliation**

*Objective: Seller records cash received to clear Accounts Receivable.*

1. **External Action:** Buyer Finance executes an offline bank transfer to the Seller.  
2. **Dashboard Action:** Seller Finance checks their corporate bank statement, then searches the **Seller Dashboard** for the corresponding Invoice ID.  
3. **Logging Payment:** Seller Admin clicks "Mark as Paid" on the order detail page.  
4. **Mandatory Input:** A modal prompts the Admin to input the "Date Received" and "Bank Reference Number".  
5. **System Action:** Order payment status updates to "Paid". "Collected Revenue" analytics increase. Receipt is emailed to Buyer Finance.

**Flow 4: Product Catalog Management**

*Objective: Seller adds a new product while protecting margins.*

1. **Dashboard Action:** Seller Admin navigates to "Products" \> "Add Product" in the **Seller Dashboard**.  
2. **Data Entry:** Admin inputs Name, SKU, Base Price, Unit of Measure, and Minimum Order Quantity (MOQ).  
3. **Margin Protection:** For low-margin commodities, Admin toggles **OFF** "Apply Account Discounts to this SKU".  
4. **System Action:** When buyers log into the Buyer Portal, they see this item at the exact Base Price, regardless of their global discount rate.

### **6\. Sitemap & Information Architecture (Seller Dashboard)**

**Main Navigation (Shopify-style Sidebar)**

* **🏠 Home (Dashboard)**  
  * KPI Scorecards (Booked vs. Collected Revenue)  
  * Outstanding A/R Alert Widget  
  * Top Selling SKUs (Volume vs. Value)  
* **🛒 Orders**  
  * Triage Inbox (List view with separated fulfillment/payment badges)  
  * Order Detail (Line items, quantity adjustments, PDF Invoice Generator, Mark as Paid)  
  * Draft Orders (For manual order entry by seller staff on behalf of a buyer)  
* **📦 Products**  
  * Inventory Catalog (List view)  
  * Product Add/Edit (Base price, UoM, MOQ, Discount Exclude Toggle)  
* **👥 Customers**  
  * Account Directory (List of vetted companies)  
  * "Create Customer Account" Modal (Invite flow)  
  * Customer Profile (Billing info, Net-terms, Global Discount %, Order History, Primary Contact)  
* **📊 Analytics & Reports**  
  * A/R Aging Report (Exportable CSV)  
  * Sales Summary (Exportable CSV)  
  * Automated Email Report Scheduler  
* **⚙️ Settings**  
  * Partner Profile (Seller details, Tax IDs, Bank details for invoices, Partner Logo Upload)  
  * User Roles (Internal seller staff permissions \- e.g., Warehouse vs. Finance)