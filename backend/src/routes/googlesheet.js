const { createSheet, getSheetData, postDataToSheet } = require("../controllers/googleSheetController");

const express  = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/sheets/:id", verifyToken,getSheetData);
router.post("/sheets/create",verifyToken, createSheet);
router.post("/sheets/:id",verifyToken, postDataToSheet);

module.exports=  router;
