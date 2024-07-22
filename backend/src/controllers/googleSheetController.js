const { google } = require("googleapis");
const User = require("../models/userModels.js");

const createSheet = async (req, res) => {
  const { spreadsheetId, worksheetName } = req.body;
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "User not fount" });
  }
  const { googleId } = req.user;
  if (!googleId || !spreadsheetId || !worksheetName) {
    return res.status(402).send({ message: "Please add all the fileds!" });
  }
  try {
    // Find the user and update their spreadsheets
    const updatedUser = await User.findOneAndUpdate(
      { googleId },
      {
        $push: { spreadsheets: { spreadsheetId, worksheetName } },
      },
      { new: true, upsert: true }
    );

    if (!updatedUser) {
      return res.status(401).send({ message: "User does not exist" });
    }

    return res.status(200).send({ message: "Spreadsheet created!" });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred", error });
  }
};

const getSheetData = async (req, res) => {
  const spreadsheetId = req.params.id;
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "User not found" });
  }
  const { googleId } = req.user;
  const user = await User.findOne({ googleId });

  if (!user) {
    return res.status(401).send({ message: "User not found" });
  }
  const accessToken = user.accessToken;

  const spreadsheet = user.spreadsheets.find(
    (sheet) => sheet.spreadsheetId === spreadsheetId
  );

  if (!spreadsheet) {
    return res.status(404).json({ error: "Spreadsheet not found" });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheet.spreadsheetId,
    range: spreadsheet.worksheetName,
  });

  res.status(200).send(response.data);
};

const postDataToSheet = async (req, res) => {
  const { data } = req.body; // Data to be posted to the Google Sheet

  if (!data) {
    return res.status(400).json({ message: "No data provided" });
  }

  try {
    const { googleId } = req.user;
    const sheetId = req.params.id;
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message: "User not fount" });
    }
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const accessToken = user.accessToken;
    console.log("sheet id", sheetId);
    const spreadsheet = user.spreadsheets.find((sheet) => sheet.spreadsheetId === sheetId);
    if (!spreadsheet) {
      return res.status(404).json({ error: "Spreadsheet not found" });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheet.spreadsheetId,
      range: `${spreadsheet.worksheetName}!A:A`,
    });
    const numRows = response.data.values ? response.data.values.length : 0;

    const range = `${spreadsheet.worksheetName}!A${numRows + 1}`;

    const updatedData = await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheet.spreadsheetId,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[data]],
      },
    });

    res.status(200).json({ message: "Data posted successfully", updatedData });
  } catch (error) {
    console.error("Error posting data to Google Sheet:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createSheet,
  postDataToSheet,
  getSheetData,
};
