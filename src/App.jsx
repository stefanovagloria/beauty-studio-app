import { Routes, Route } from "react-router-dom";
import UserApp from "./components/UserApp/UserApp";

import "./App.css";
import LoginForm from "./components/AdminPanel/LoginForm/LoginForm";
import AdminHomePage from "./components/AdminPanel/AdminHomePage/AdminHomePage";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserApp />} />
      <Route path="/admin/login" element={<LoginForm />} />
      <Route path="/admin/*" element={<AdminHomePage />} />
    </Routes>
  );
}

export default App;
