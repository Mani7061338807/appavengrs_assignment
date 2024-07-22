import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  googleId: "",
  accessToken: "",
  integration: {
    googleSheets: [""],
    user: {
      name: "",
      email: "",
      googleId: "",
      accessToken: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.googleId = action.payload.googleId;
      state.accessToken = action.payload.accessToken;
      state.integration.googleSheets = action.payload.spreadsheets || {
        googleSheets: [""],
      };
    },
    setSheetId: (state, action) => {
      state.integration.googleSheets.push(action.payload.googleSheetId);
    },

    setSheetIntegration: (state, action) => {
      state.integration = action.payload;
    },
  },
});

export const { setUser, setSheetId, setSheetIntegration } = userSlice.actions;
export default userSlice.reducer;
