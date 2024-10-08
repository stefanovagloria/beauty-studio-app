import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/index";

import UserApp from "./components/UserApp/UserApp";
import AdminLogin from "./components/AdminPanel/AdminLogin/AdminLogin";
import AuthProvider from "./context/AuthContext";

import "./App.scss";
import AdminApp from "./components/AdminPanel/AdminApp";
import ProtectedRoute from "./components/UserApp/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Routes>
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<AdminApp />} />}
          />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={<UserApp />} />
        </Routes>
      </Provider>
    </AuthProvider>
  );
}

export default App;
