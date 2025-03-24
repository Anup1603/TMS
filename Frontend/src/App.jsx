import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "./axiosInstance";

import Dashboard from "./components/Dashboard";

import Property from "./pages/Property";
import Tenant from "./pages/Tenant";
import Billing from "./pages/Billing";
import Account from "./pages/Account";
import Setting from "./pages/Setting";

import LandingPage from "./screens/LandingPage";
import AuthPage from "./screens/AuthPage";

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:authMode" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="property" element={<Property />} />
          <Route path="tenant" element={<Tenant />} />
          <Route path="billing" element={<Billing />} />
          <Route path="account" element={<Account />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
