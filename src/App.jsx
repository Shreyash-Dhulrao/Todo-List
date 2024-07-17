import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import * as ReactDOM from "react-dom/client";
import Calendar from "./Components/Calender";
import Daily from "./Components/Daily";
import Sidebar from "./Components/Sidebar";
import Monthly from "./Components/Monthly";
import Special from "./Components/Special";
import Birthday from "./Components/Birthday";
import Personal from "./Components/Personal";
import Work from "./Components/Work";

let a = Daily.Count
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Sidebar Count={a} /><Daily /></>,
  },
  {
    path: "/monthly",
    element: <><Sidebar Count={a} /><Monthly /></>,
  },
  {
    path: "/special",
    element: <><Sidebar Count={a} /><Special /></>,
  },
  {
    path: "/birthday",
    element: <><Sidebar Count={a} /><Birthday /></>,
  },
  {
    path: "/personal",
    element: <><Sidebar Count={a} /><Personal /></>,
  },
  {
    path: "/work",
    element: <><Sidebar Count={a} /><Work /></>,
  },
  {
    path: "/calendar",
    element: <><Sidebar /><div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Calendar />
  </div></>,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

export default App