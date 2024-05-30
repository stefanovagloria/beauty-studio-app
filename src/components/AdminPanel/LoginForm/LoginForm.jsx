import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./LoginForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const LoginForm = () => {
  const [values, setValues] = useState({
    emailValue: "",
    passwordValue: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/admin/login", {
      email: values.emailValue,
      password: values.passwordValue,
    });

    if (response.status === 201) {
      navigate("/admin");
    }
  };

  return (
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
  );
};

export default LoginForm;
