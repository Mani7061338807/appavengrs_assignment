import { setSheetId, setSheetIntegration, setUser } from "../reducer/user";

export const userAction = (
  name,
  email,
  accessToken,
  googleId,
  spreadsheets
) => {
  return (dispatch) => {
    dispatch(setUser({ name, email, accessToken, googleId, spreadsheets }));
  };
};
export const sheetAction = (googleSheetId) => {
  return (dispatch) => {
    dispatch(setSheetId({ googleSheetId }));
  };
};
export const sheetIntegration = (
  name,
  email,
  accessToken,
  googleId,
  spreadsheets
) => {
  return (dispatch) => {
    dispatch(
      setSheetIntegration({ name, email, accessToken, googleId, spreadsheets })
    );
  };
};
