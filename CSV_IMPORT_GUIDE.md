# CSV Import Feature Guide

## Overview
The CSV import feature allows you to bulk import property listings into your real estate CRM system from a CSV file.

## How to Use

1. **Access the Import Feature**
   - Log in to the dashboard at `/dashboard`
   - Navigate to **Admin Settings** from the sidebar
   - Click the **"Import Inventory"** button in the top right

2. **Prepare Your CSV File**
   Your CSV file should have the following structure:

   ```csv
   Title,Description,Price,Type,Category,Region,Bedrooms,Bathrooms,Area,Address,Images,Featured,Status
   Luxury Villa,Beautiful villa with sea view,500000,sell,villa,Alexandria,4,3,350,123 Beach Road,https://example.com/img1.jpg|https://example.com/img2.jpg,true,active
   Modern Apartment,City center apartment,3000,rent,apartment,Cairo,2,2,120,45 Downtown St,https://example.com/apt1.jpg,false,active
   ```

3. **Field Mapping**

   ### Required Fields (must be mapped):
   - **Title** - Property title/name
   - **Description** - Full description of the property
   - **Price** - Numeric value (no currency symbols)
   - **Type** - Either "sell" or "rent"
   - **Category** - villa, apartment, house, duplex, penthouse, chalet, studio, land, or commercial
   - **Region** - Cairo, Giza, Alexandria, New Cairo, 6th October, Sheikh Zayed, or other Egyptian regions

   ### Optional Fields:
   - **Bedrooms** - Number of bedrooms (integer)
   - **Bathrooms** - Number of bathrooms (integer)
   - **Area** - Size in square meters (numeric)
   - **Address** - Full address string
   - **Images** - Multiple URLs separated by pipe `|` character
   - **Featured** - "true" or "false" for homepage display
   - **Status** - "active", "sold", or "rented"

4. **Upload Process**
   - Click "Choose CSV File" button
   - Select your CSV file from your computer
   - Review the automatic column mapping
   - Adjust mappings if needed by selecting the correct field from dropdowns
   - Review the preview of the first row
   - Click "Import Properties" to complete the import

5. **Column Mapping**
   - The system will attempt to auto-match your CSV columns to property fields
   - If column names match (e.g., "Title" → Title field), they're mapped automatically
   - You can manually adjust mappings using the dropdown menus
   - To skip a column, select "Skip this column" from the dropdown

6. **Validation**
   - The system validates that all required fields are mapped
   - Missing required fields will show an error message
   - You must correct these before importing

7. **Success**
   - After successful import, you'll see a confirmation message
   - The modal will close automatically
   - Navigate to **Inventory** to view your imported properties

## CSV Example Files

### Example 1: Minimal Required Fields
```csv
Title,Description,Price,Type,Category,Region
Luxury Penthouse,Stunning penthouse with panoramic views,1200000,sell,penthouse,New Cairo
Cozy Studio,Perfect for singles or students,2500,rent,studio,Cairo
Beach Chalet,Direct beach access with private pool,800000,sell,chalet,North Coast
```

### Example 2: Complete Fields
```csv
Title,Description,Price,Type,Category,Region,Bedrooms,Bathrooms,Area,Address,Images,Featured,Status
Modern Villa,Contemporary villa with smart home features,2500000,sell,villa,Sheikh Zayed,5,4,450,Plot 123 Beverly Hills,https://cdn.example.com/villa1.jpg|https://cdn.example.com/villa2.jpg|https://cdn.example.com/villa3.jpg,true,active
Duplex Apartment,Spacious duplex in gated community,4500,rent,duplex,6th October,3,3,220,Tower 5 Apt 301 Palm Hills,https://cdn.example.com/duplex1.jpg,false,active
Commercial Space,Prime location for retail or office,350000,sell,commercial,Cairo,0,2,180,15 Tahrir Square,https://cdn.example.com/commercial1.jpg,false,active
```

## Tips for Success

1. **Images**: Separate multiple image URLs with the pipe `|` character
2. **Numbers**: Don't include commas, currency symbols, or units
3. **Headers**: First row must contain column headers
4. **Encoding**: Save your CSV as UTF-8 to support Arabic text
5. **Testing**: Start with a small CSV (2-3 rows) to test before bulk import
6. **Backup**: Always keep a backup of your original CSV file

## Troubleshooting

**Problem**: "CSV file must have headers and at least one data row"
- **Solution**: Ensure your CSV has a header row and at least one data row

**Problem**: "Missing required fields: [field names]"
- **Solution**: Map all required fields in the column mapping interface

**Problem**: "Error importing properties"
- **Solution**: Check that:
  - Price values are numeric (no symbols)
  - Type is exactly "sell" or "rent"
  - Category matches one of the allowed values
  - Image URLs are valid (start with http:// or https://)

**Problem**: Images not showing
- **Solution**: Ensure image URLs are:
  - Publicly accessible
  - Separated by pipe `|` for multiple images
  - Valid image file extensions (.jpg, .png, .webp, etc.)

## API Endpoint

The import feature uses the following API endpoint:
```
POST /api/properties/import
```

Request body:
```json
{
  "properties": [
    {
      "title": "Property Title",
      "description": "Description",
      "price": 500000,
      "type": "sell",
      "category": "villa",
      "region": "Cairo",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 250,
      "address": "123 Main St",
      "images": ["url1", "url2"],
      "featured": false,
      "status": "active"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "count": 1,
  "properties": [...]
}
```
