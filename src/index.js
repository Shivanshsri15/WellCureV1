import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainHomeScreen from "./screens/MainHomeScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import ServicesScreen from "./screens/ServicesScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<MainHomeScreen />} />
      <Route index={true} path="/home" element={<MainHomeScreen />} />
      <Route index={true} path="/login" element={<MainHomeScreen />} />
      <Route
        index={true}
        path="/services#aboutWell"
        element={<MainHomeScreen />}
      />
      <Route element={<PrivateRoute />}>
        <Route path="/home/:id" element={<MainHomeScreen />} />
        <Route path="/services" element={<ServicesScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
