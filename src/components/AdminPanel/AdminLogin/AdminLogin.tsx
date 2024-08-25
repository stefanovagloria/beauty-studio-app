import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AdminLogin.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { AuthContext } from "../../../context/AuthContext";

const AdminLogin = () => {
  const [values, setValues] = useState({
    emailValue: "",
    passwordValue: "",
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await login(values.emailValue, values.passwordValue);

    console.log("response", response.success);

    if (response.success === true) {
      navigate("/admin");
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmitHandler} className={styles.form}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            name="emailValue"
            value={values.emailValue}
            onChange={onChangeHandler}
            className={styles.input}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            name="passwordValue"
            value={values.passwordValue}
            onChange={onChangeHandler}
            type="password"
            className={styles.input}
          />
          <Button variant="contained" className={styles.button} type="submit">
            LogIn
          </Button>
        </form>
      </div>

    </>
  );
};

export default AdminLogin;
