import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import "./index.css";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ProductPage from "./components/ProductPage/ProductPage";
import MealDetails from "./components/MealDetails/MealDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProductPage />,
      },
      {
        path: "/meal-details/:mealId",
        element: <MealDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
