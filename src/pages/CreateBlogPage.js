import CreateBlog from "../components/CreateBlog";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

const CreateBlogPage = (props) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate()
	const auth = useAuth()
	useEffect(()=>{
		const fetchStatus = async () => {
			const headers = {
				"Content-Type": "application/json",
				// [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
			}
			headers[process.env.REACT_APP_TOKEN_HEADER_KEY] = auth.userToken
			// headers.process.env.REACT_APP_TOKEN_HEADER_KEY = auth.userToken
			const response = await fetch(`${urlEndpoint}/users/message`, {
				method: "GET",
				headers: headers,
			});
			const responseJSON = await response.json();
			setStatus(responseJSON.message)
		}
		if (auth.userToken !== null) {
			fetchStatus()
		}
		if (auth.userToken === null) {
			setStatus(false)
		}
	}, [auth.userToken])
    return (
        <div>
            {!status && 
            <p>You need to create an account to create a blog, click below to create an account or login.</p>}
            {!status && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!status && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            <h1>Create Blog</h1>
            {status && <CreateBlog urlEndpoint={props.urlEndPoint}/>}
        </div>
    )
}

export default CreateBlogPage;