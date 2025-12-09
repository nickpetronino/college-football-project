# Database Seed Scripts

This directory contains scripts to seed your MongoDB database with initial data.

## Seed Schools

The `seedSchools.js` script populates your database with FBS college football school data, including:

-   School name
-   Icon/logo URL
-   Conference
-   City
-   State
-   School colors (array of hex color codes)
-   Mascot name
-   Rivals (array of rival school names)

### Usage

From the `service` directory, run:

```bash
npm run seed:schools
```

Or directly with node:

```bash
node scripts/seedSchools.js
```

### What it does

1. Connects to your MongoDB database (using `MONGODB_URI` from your `.env` file)
2. Deletes all existing school records
3. Inserts all FBS schools with their complete information
4. Displays a summary of schools grouped by conference
5. Closes the database connection

### Environment Variables Required

Make sure your `.env` file (in the root directory) contains:

```
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

### Notes

-   The script will **delete all existing school records** before inserting new ones
-   Schools are organized by conference: SEC, Big Ten, Big 12, ACC, Pac-12, AAC, C-USA, MAC, Mountain West, Sun Belt, and Independent
-   Each school includes location data (city and state) for geographic queries
