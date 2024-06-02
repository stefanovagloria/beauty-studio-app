import { Routes, Route } from "react-router-dom";
import UserApp from "./components/UserApp/UserApp";

import "./App.css";

import AdminLogin from "./components/AdminPanel/AdminLogin/AdminLogin";
import AuthProvider from "./context/AuthContext";
import AdminApp from "./components/AdminPanel/AdminApp";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
