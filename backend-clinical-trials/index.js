const express = require("express");
const cors = require("cors");
const fs = require("fs");
const xlsx = require("xlsx");
const csv = require("csv-parser");

const app = express();

app.use(cors());

app.get("/api/data", (req, res) => {
  // Read the Excel file
  const workbook = xlsx.readFile("updated_data.xlsx");
  const sheetName = workbook.SheetNames[0]; // First sheet
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  res.json(jsonData); // Send JSON response
});

app.get("/api/csvdata", (req, res) => {
  const results = [];

  fs.createReadStream("final_clean_data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results); // Send JSON response
    })
    .on("error", (err) => {
      res
        .status(500)
        .json({ error: "Error reading the CSV file", details: err.message });
    });
});

app.get("/api/get-countries", (req, res) => {
  const filePath = "final_clean_data.csv";

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "CSV file not found" });
  }

  const results = {};
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      if (data.Countries) {
        const countries = JSON.parse(data.Countries.replace(/'/g, '"'));
        countries.forEach((country) => {
          results[country] = (results[country] || 0) + 1;
        });
      }
    })  
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      res
        .status(500)
        .json({ error: "Error processing CSV file", details: err.message });
    });
});


app.get('/api/get-phases', (req, res) => {
    const filePath = 'final_clean_data.csv';
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'CSV file not found' });
    }

    const phaseCount = {};

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const phase = row["Trial Phase"];
            if (phase) {
                phaseCount[phase] = (phaseCount[phase] || 0) + 1;
            }
        })
        .on('end', () => {
            res.json(phaseCount);
        })
        .on('error', (error) => {
            res.status(500).json({ error: 'Error reading CSV file', details: error.message });
        });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("http://localhost:5000/api/data");
});
