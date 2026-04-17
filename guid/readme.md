# Project Specification: OLX Lebanon Technical Assessment

## 1. Core Mandate & Technology Stack
You are to build a React Native application based on the OLX Lebanon mobile app. You must strictly adhere to the following technical requirements:
* [cite_start]**Framework:** React Native CLI (Do NOT use Expo)[cite: 15].
* [cite_start]**Language:** TypeScript is mandatory[cite: 16]. [cite_start]You must provide robust interfaces for all API responses and component props to ensure type safety in a large-scale project context[cite: 5, 16].
* [cite_start]**Styling:** No external UI libraries (e.g., MaterialUI, NativeBase)[cite: 15].
* [cite_start]**Utility Frameworks:** No styling utility frameworks (e.g., Tailwind)[cite: 15]. Use standard `StyleSheet`.
* [cite_start]**Localization:** Full support for both Arabic and English, including proper RTL (Right-to-Left) layout handling[cite: 79].

## 2. Required Screens & Visual Standards
[cite_start]The implementation must mimic the OLX Lebanon app as closely as possible, focusing on code organization, readability, and visual attention to detail[cite: 7, 8, 9, 80].

### A. Home Screen
* [cite_start]**Search Bar:** A prominent search input at the top[cite: 22].
* [cite_start]**Categories:** A "Browse Categories" grid with icons and labels[cite: 23].
* [cite_start]**Featured Sections:** Implementation of horizontal or vertical lists for "International Properties" and "Cars for Sale"[cite: 27, 28].

### B. Search Results Screen
* [cite_start]**List View:** Display ads with clear visual hierarchy[cite: 31].
* [cite_start]**Card Components:** Each ad must show a thumbnail image, price (e.g., USD), title, location, and a timestamp (e.g., "5 days ago")[cite: 32, 33].

### C. Search Filters Screen
* [cite_start]**Core Filters:** Implement filtering by Location, Category, and Price[cite: 87].
* [cite_start]**Dynamic UI:** Based on the selected category, the UI must dynamically render additional filter fields (e.g., Brand, Condition, Kilometers, Color) fetched from the API[cite: 87].

## 3. API Integration Requirements
You must integrate the following endpoints to drive the application logic:

* [cite_start]**Categories API:** `https://www.olx.com.lb/api/categories`[cite: 54].
* [cite_start]**Category Fields API:** `https://www.olx.com.lb/api/categoryFields?includeChildCategories=true&splitByCategoryIDs=true&flatChoices=true&groupChoicesBySection=true&flat=true`[cite: 57].
    * [cite_start]*Logic:* Use the keys in the response object (Category IDs) to determine which dynamic fields to display[cite: 58, 59].
* [cite_start]**Ads Fetching:** `https://search.mena.sector.run/_msearch`[cite: 63, 72].
    * *Payload Structure:* Use the Elasticsearch multi-search format.
    * [cite_start]Example: `{"index":"olx-lb-production-ads-en"}` followed by a query object containing terms like `category.externalID` and `location.externalID`[cite: 67, 68, 69].

## 4. Architectural Expectations
* [cite_start]**Scalability:** Organize the code for a large-scale project[cite: 5].
* [cite_start]**Reusability:** Create generic components that can be reused across different sections of the app[cite: 14].
* [cite_start]**Business Logic:** Demonstrate clear handling of complex state, especially within the dynamic filter synchronization[cite: 13, 60].
* **Testing Focus:** Ensure the filtering and display logic works perfectly for these subcategories:
    * [cite_start]Vehicles -> Cars for sale[cite: 84].
    * [cite_start]Mobile Phones & Accessories -> Mobile Phones[cite: 85].
    * [cite_start]Properties -> Apartments & villas for sale[cite: 86].