import { Routes, Route } from "react-router-dom";

import "./App.css";

import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserApp from "./components/UserApp/UserApp";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/" element={<UserApp/>} />
    </Routes>
  );
}

export default App;
