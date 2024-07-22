const { createSheet, getSheetData, postDataToSheet } = require("../controllers/googleSheetController");

const express  = require("express");
const router = express.Router();

router.get("/sheets/:id", getSheetData);
router.post("/sheets/create", createSheet);
router.post("/sheets/:id", postDataToSheet);

module.exports=  router;
