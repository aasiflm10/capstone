const express = require('express');
const cors = require('cors');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
    // Read the Excel file
    const workbook = xlsx.readFile('updated_data.xlsx');
    const sheetName = workbook.SheetNames[0]; // First sheet
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    res.json(jsonData); // Send JSON response
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
