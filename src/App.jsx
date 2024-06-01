import { Routes, Route } from "react-router-dom";
import UserApp from "./components/UserApp/UserApp";

import "./App.css";

import AuthProvider from "./context/AuthContext.jsX";
import AdminLogin from "./components/AdminPanel/LoginForm/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminLogin />} />
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
