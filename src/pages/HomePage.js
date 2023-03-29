import BlogForm from "../components/BlogForm";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

//home page component 
const HomePage = (props) => {
    const {
        blogList, 
        setBlogList, 
        urlEndPoint,
        setShouldRefresh, 
    } = props
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
            <p>You need to create an account to view the Blogs, click below to create an account or login.</p>}
            {!status && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!status && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            <h1>Blog Form</h1>
            {status && blogList.map((item, index) => {
                return (
                    <BlogForm 
                        blog={item} 
                        setBlogList={setBlogList} 
                        urlEndPoint={urlEndPoint}
                        setShouldRefresh={setShouldRefresh}
                        key={index} 
                    /> 
                );
            })}
        </div>
    )
}

export default HomePage