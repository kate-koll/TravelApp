import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./routes/Blog";
import Bucket from "./routes/Bucket";
import Visited from "./routes/Visited";
import Login from "./routes/Login";
import Management from "./routes/Management";
import Form from "./components/Management/LocationForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Blog />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="bucket" element={<Bucket />} />
          <Route path="visited" element={<Visited />} />
          <Route path="login" element={<Login />} />
          <Route path="management" element={<Management />}/>
          <Route path="management/add-new" element={<Form view = {"new"}/>}></Route>
          <Route path="management/edit-location" element={<Form view = {"edit"}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
