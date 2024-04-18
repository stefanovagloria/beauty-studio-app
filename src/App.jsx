import { Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserApp from "./components/UserApp/UserApp";

import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserApp />} />
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
