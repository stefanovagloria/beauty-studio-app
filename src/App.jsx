
import { Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import store from "./store/index";

import UserApp from "./components/UserApp/UserApp";
import AdminLogin from "./components/AdminPanel/AdminLogin/AdminLogin";
import AuthProvider from "./context/AuthContext";
import AdminApp from "./components/AdminPanel/AdminApp";

import "./App.scss";

function App() {





  return (
    <AuthProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={<UserApp />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}

export default App;
