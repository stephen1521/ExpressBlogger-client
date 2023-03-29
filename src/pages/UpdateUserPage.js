import { useState } from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateUserPage = (props) => {
    const {urlEndPoint} = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
	const auth = useAuth()
    
    async function handleUpdateUser () {
        const req = {
            email: email,
            password: password
        } 
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        await axios.put(`${urlEndPoint}/users/updateUser/${auth.userEmail}`, req, {headers:headers})
            .then(function (response){
                console.log(response);
        }).catch(function (e){
            console.log(e);
        })
        resest();
        auth.logout();
        navigate('/login');
    }

    function resest () {
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            {!auth.userEmail && 
            <p>You need to create an account to update it, click below to create an account or login.</p>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            {auth.userEmail && <h3>Update User</h3>}
            {auth.userEmail && <label>Update Email</label>}
            {auth.userEmail && <input 
                        type='text'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}></input>}
            {auth.userEmail && <label>Update Password</label>}
            {auth.userEmail && <input
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}></input>}
            <br></br>
            {auth.userEmail && <button onClick={()=>handleUpdateUser()}>Submit</button>}
            {auth.userEmail && <p>You will need to relogin after you submit changes.</p>}
        </div>
    )
}

export default UpdateUserPage;