import BlogForm from "../components/BlogForm";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";

//home page component 
const HomePage = (props) => {
    const {
        blogList, 
        setBlogList, 
        urlEndPoint,
        setShouldRefresh, 
    } = props
    const navigate = useNavigate()
	const auth = useAuth()
    return (
        <div>
            {!auth.userEmail && 
            <p>You need to create an account to view the Blogs, click below to create an account or login.</p>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            <h1>Blog Form</h1>
            {auth.userEmail && blogList.map((item, index) => {
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