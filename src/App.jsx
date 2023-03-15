import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListView from "./views/ListView";
// import RecipeView from "./views/RecipeView";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListView />,
    // children: [
    //   {
    //     path: '/:id',
    //     element: RecipeView
    //   }
    // ]
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
