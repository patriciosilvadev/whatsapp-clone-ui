import React, {useState, SyntheticEvent, useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import {Link} from "react-router-dom";
import {handleAuth} from "../../services/auth";
import {Avatar, Button, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Forms.scss";
import {RegisterUserResponse} from "../../interfaces/interfaces";

interface Props {
    history: any;
}

const Register: React.FC<Props> = ({history}) => {
    const {handleErrors} = useContext(AppContext);

    const register = (firstName: string, lastName: string, username: string, password: string): RegisterUserResponse => {
        return {} as RegisterUserResponse;
    }


    const [formValues, setFormValues] = useState({firstName: "", lastName: "", username: "", password: ""});

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {firstName, lastName, username, password} = formValues;

        if (firstName && lastName && username && password) {
            try {
                const registerUserResponse = await register(firstName, lastName, username, password);

                if (registerUserResponse.user) {
                    registerUserResponse.user.username = username;
                }

                console.log("user registered successfully")

            } catch (err) {
                handleErrors(err);
            }
        }
    };

    return (
        <div className="register-container">
            <Avatar>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField required variant="outlined" margin="normal" fullWidth label="first name"
                           autoComplete="First Name" value={formValues.firstName}
                           onChange={(e) => setFormValues({...formValues, firstName: e.target.value})}/>
                <TextField required variant="outlined" margin="normal" fullWidth label="last name"
                           autoComplete="Last Name" value={formValues.lastName}
                           onChange={(e) => setFormValues({...formValues, lastName: e.target.value})}/>
                <TextField required variant="outlined" margin="normal" fullWidth label="username"
                           autoComplete="Username" value={formValues.username}
                           onChange={(e) => setFormValues({...formValues, username: e.target.value})}/>
                <TextField required variant="outlined" margin="normal" fullWidth label="password"
                           autoComplete="Password" value={formValues.password} type="password"
                           onChange={(e) => setFormValues({...formValues, password: e.target.value})}/>
                <Link to="/login">Already have an account?</Link>
                <Button type="submit" fullWidth variant="contained">Register</Button>
            </form>
        </div>
    );
};

export default Register;
