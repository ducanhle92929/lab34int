const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    MaXe: { type: String, required: true },
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Year: { type: Number, required: true, min: 1980, max: 2024 },
    Brand: { type: String, required: true }
});
var Car = module.exports = mongoose.model("Car", carSchema);
//Lấy form tạo xe
router.get('/form', (req, res) => {
    res.render("cars");
});

// Tạo ô tô mới
router.post("/create", async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lấy danh sách ô tô dạng JSON
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
