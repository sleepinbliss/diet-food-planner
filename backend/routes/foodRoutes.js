const express = require('express');
const fs = require('fs');
// Node.js File System Module - lets you read/write files
const path = require('path');
// Node.js Path module - helps build file paths correctly across different operating systems.
const router = express.Router();
// router is like a mini-app that handles specific routes.


// Read food data from JSON file.
const getFoodsData = () => {
    try {
        const dataPath = path.join(__dirname, '../data/foods.json');
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading foods data:', error);
        return [];
    }
}
/*
getFoodsData(): A helper function that reads your JSON file.
__dirname: Current directory (Where this file is located).
path.join(): Safely builds file path: /routes/../data/foods.json -> /data/foods.json
fs.readFileSync(): Reads the entire file as text(utf8 encoding)
JSON.parse(): Converts JSON text into JavaScript objects.
try/catch: If file reading fails, it logs error and returns empty array instead of crashing.
*/

// GET all foods
router.get('/foods', (req, res) => {
    const foods = getFoodsData();
    res.json({
        success: true,
        count: foods.length,
        data: foods
    });
});

/*
URL: GET/api/foods
Process: Reads all foods from JSON file
Response: Sends structured JSON with success status, count, and all food data.
*/


// GET foods by category
router.get('/foods/category/:category', (req, res) => {
    const foods = getFoodsData();
    const category = req.params.category.toLowerCase();
    const filteredFoods = foods.filter(food => food.category.toLowerCase() === category);

    res.json({
        success: true,
        count: filteredFoods.length,
        data: filteredFoods
    });
});

/*
URL: GET /api/foods/category/protein (: category is a URL parameter)
req.params.category: Extracts "protein" from the URL
.toLowerCase(): Makes comparison case-insensitive
.filter(): Creates new array with only foods matching the category.
*/

// GET single food by ID
router.get('/foods/:id', (req, res) => {
    const foods = getFoodsData();
    const foodId = parseInt(req.params.id);
    const food = foods.find(f => f.id === foodId);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: 'Food not found'
        });
    }

    res.json({
        success: true,
        data: food
    });
});

/*
URL: GET /api/foods/1 (:id is a URL parameter)
parseInt(): Converts string "1" to number 1
.find(): Searches array for first food with matching ID
Error handling: If no food found. sends 404 status with error message.
Success: If found, sends the single food object.
*/


module.exports = router;
// This exports our router so other files can use it.

