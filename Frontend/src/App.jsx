// import { useEffect, useState } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import axios from "./axiosInstance";

// import Dashboard from "./components/Dashboard";
// import Property from "./pages/Property";
// import Tenant from "./pages/Tenant";
// import Billing from "./pages/Billing";
// import Account from "./pages/Account";
// import Setting from "./pages/Setting";
// import LandingPage from "./screens/LandingPage";
// import AuthPage from "./screens/AuthPage";
// import PropertyList from "./propertyScreens/PropertyList";
// import CreateProperty from "./propertyScreens/CreateProperty";
// import PropertyDetails from "./propertyScreens/PropertyDetails";
// import CreateTenant from "./tenantScreens/CreateTenant";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/auth/:authMode"
//           element={<AuthPage setUser={setUser} />}
//         />

//         {/* Protected routes */}
//         <Route
//           path="/:userId/dashboard"
//           element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
//         >
//           {/* Dashboard nested routes */}
//           <Route index element={<Navigate to="property" replace />} />

//           {/* Property routes */}
//           <Route path="property" element={<Property user={user} />}>
//             <Route index element={<PropertyList />} />
//             <Route path="create" element={<CreateProperty />} />
//             <Route path=":id" element={<PropertyDetails />} />
//             <Route path=":id/create-tenant" element={<CreateTenant />} />
//           </Route>

//           <Route path="tenant" element={<Tenant />} />
//           <Route path="billing" element={<Billing />} />
//           <Route path="account" element={<Account />} />
//           <Route path="setting" element={<Setting />} />
//         </Route>

//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "./axiosInstance";

import Dashboard from "./components/Dashboard";
import Property from "./pages/Property";
import Tenant from "./pages/Tenant";
import Billing from "./pages/Billing";
import Account from "./pages/Account";
import Setting from "./pages/Setting";
import LandingPage from "./screens/LandingPage";
import AuthPage from "./screens/AuthPage";
import PropertyList from "./propertyScreens/PropertyList";
import CreateProperty from "./propertyScreens/CreateProperty";
import PropertyDetails from "./propertyScreens/PropertyDetails";
import CreateTenant from "./tenantScreens/CreateTenant";
import TenantList from "./tenantScreens/TenantList";
import TenantDetails from "./tenantScreens/TenantDetails";

function App() {
  // const [user, setUser] = useState(null);
  // const [isAuthChecked, setIsAuthChecked] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (token && storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch (e) {
  //       localStorage.removeItem("user");
  //     }
  //   }
  //   setIsAuthChecked(true);
  // }, []);

  // if (!isAuthChecked) {
  //   return <div>Loading...</div>; // Or a loading spinner
  // }

  // console.log("Hello Appp");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:authMode" element={<AuthPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Dashboard nested routes */}
          <Route index element={<Navigate to="property" replace />} />

          {/* Property routes */}
          <Route path="property" element={<Property />}>
            <Route index element={<PropertyList />} />
            <Route path="create" element={<CreateProperty />} />
            <Route path=":id" element={<PropertyDetails />} />
            <Route path=":id/create-tenant" element={<CreateTenant />} />
          </Route>

          {/* <Route path="tenant" element={<Tenant />}>
            <Route index element={<TenantList />} />
            <Route path=":id" element={<TenantDetails />} />
          </Route> */}

          <Route path="tenant" element={<Tenant />} />

          <Route path="billing" element={<Billing />} />
          <Route path="account" element={<Account />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
