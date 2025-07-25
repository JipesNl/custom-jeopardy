import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Host from "./routes/host.js";
import Home from "./routes/home.js";
import NotFound from "./routes/notfound.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/404" exact={true} element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
