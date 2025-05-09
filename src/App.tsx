import type { FoodList } from "./types/food";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { currentMonth } from "./utils/utils";
import fetchData from "./loadData";
import { FoodDBProvider } from "./contexts/FoodDB";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import FoodPage from "./routes/FoodPage";
import Layout from "./routes/Layout";
import { NotFound } from "./routes/NotFound";
import FirstTimePopup from "./components/FirstTimePopup";
//import PopupDevTools from "./components/PopUpDevTools";

export default function App() {
  const [ food, setFood ] = useState([] as FoodList)

  useEffect(() => {
    fetchData(setFood, "ITALIA-fruits-and-veggies.csv")
  },[])

  const handlePopupClose = (): void => {
    console.log('First-time user has started using the app');
  };

  return food.length > 0 ? (
    <FoodDBProvider initialState={food}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <div className="App">
        
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Layout food={food} />}>
              <Route
                index
                element={<Navigate to={`/month/${currentMonth}`} replace />}
              />
              <Route
                path="/:id"
                element={<FoodPage key="foodpage"/>}
              />
              <Route
                path="/month/:selectedMonthNum"
                element={<FoodOfTheMonth />}
              />
            </Route>
          </Routes><FirstTimePopup onClose={handlePopupClose} />
        {/* <PopupDevTools /> */}
        </div>
      </BrowserRouter>
    </FoodDBProvider>
  ) : (
    <center>not loaded</center>
  );
}
