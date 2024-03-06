import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const LoginForm = () => {
    return(
        <form>
        <TextField id="outlined-basic" label="Username" variant="outlined" size="small"/>
        <TextField id="outlined-basic" label="Password" variant="outlined" size="small"/>
        <Button variant="contained">LogIn</Button>
      </form>
    )
}

export default LoginForm;