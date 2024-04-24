import { useState } from "react";

import LoginForm from "./LoginForm/LoginForm";
import AdminHomePage from "./AdminHomePage/AdminHomePage";

const AdminPanel = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (username, password) => {
    setIsLoggedIn(true);
  }

  return (
    <>
      {!isLoggedIn && <LoginForm loginHandler={loginHandler}/>}
      {isLoggedIn && <AdminHomePage/>}
    </>
  );
};

export default AdminPanel;
