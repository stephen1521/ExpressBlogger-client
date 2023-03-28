import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useAuth(); //access the authentication context 
	const navigate = useNavigate() // be able to navigate to home on login

    return (
        <div>
            <h1>Login Page</h1>
            <h3>{loginMessage}</h3>
            <label>email</label>
            <input
                type="text"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <label>Password</label>
            <input
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button
                onClick={async () => {
                //login in using auth context
                const loginResult = await auth.login(email, password);
					if (loginResult.success) {
						navigate("/")
					}
                    if (!loginResult.success) {
                        setLoginMessage(loginResult.message)
                    }
                }}
            >Login
            </button>
        </div>
    );
};

export default LoginPage;