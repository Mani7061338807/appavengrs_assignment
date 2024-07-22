import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Integration from "./Components/Integration";
import GoogleSheet from "./Components/GoogleSheet";
import Setting from "./Components/Setting";
import LeftPannel from "./Components/LeftPannel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sheetIntegration, userAction } from "./redux/action/user";

function App() {
  const dispatch = useDispatch();
  const email = useSelector(state=>state.user.email);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(`http://localhost:3001/login/success`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data) {
        if(!email){
          dispatch(
            userAction(
              data.user.displayName,
              data.user.email,
              data.user.accessToken,
              data.user.googleId,
              data.user.spreadsheets
            )
          );
        }else{
          dispatch(
            sheetIntegration(
              data.user.displayName,
              data.user.email,
              data.user.accessToken,
              data.user.googleId,
              data.user.spreadsheets
            )
          );
        }
      }
    };
    checkAuth();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signup" element={<Register />}></Route> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/site/integration" element={<Integration />}></Route>
        <Route
          path="/integration/google-sheet"
          element={<GoogleSheet />}
        ></Route>
        <Route path="/site/setting" element={<Setting />}></Route>
        <Route path="/site" element={<LeftPannel />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
