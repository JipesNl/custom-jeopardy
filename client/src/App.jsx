import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Host from "./routes/host.js";
import Home from "./routes/home.js";
import NotFound from "./routes/notfound.js";
import HostLogin from "./pages/host/HostLogin.js";
import ProtectedHostRoute from "./pages/host/ProtectedHostRoute.js";
import { isLoggedIn } from "./pages/host/auth.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/host" /> : <HostLogin />}
        />
        <Route element={<ProtectedHostRoute />}>
          <Route path="/host/" element={<Host />} />
          <Route path="/answer" element={<Host />} />
        </Route>
        <Route path="/404" exact={true} element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
