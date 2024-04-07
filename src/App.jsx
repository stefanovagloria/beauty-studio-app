import { Routes, Route } from "react-router-dom";

import "./App.css";

import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserApp from "./components/UserApp/UserApp";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserApp />} />
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
