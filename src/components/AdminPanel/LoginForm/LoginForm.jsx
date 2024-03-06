import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./LoginForm.module.css";
import { useState } from "react";

const LoginForm = ({loginHandler}) => {
  const [values, setValues] = useState({
    usernameValue: "",
    passwordValue: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    loginHandler(values.usernameValue, values.passwordValue)
  };

  const onChangeHandler = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          size="small"
          name="usernameValue"
          value={values.usernameValue}
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
