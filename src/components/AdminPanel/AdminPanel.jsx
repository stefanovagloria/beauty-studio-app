import { useState } from "react";

import LoginForm from "./LoginForm/LoginForm";
import AdminHomePage from "./AdminHomePage/AdminHomePage";

const AdminPanel = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn && <LoginForm/>}
      {isLoggedIn && <AdminHomePage/>}
    </>
  );
};

export default AdminPanel;
