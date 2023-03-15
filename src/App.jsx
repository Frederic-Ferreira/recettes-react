import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListView from "./views/ListView";
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListView />
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}
