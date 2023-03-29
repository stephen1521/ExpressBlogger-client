import CreateBlog from "../components/CreateBlog";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = (props) => {
    const navigate = useNavigate()
	const auth = useAuth()
    return (
        <div>
            {!auth.userEmail && 
            <p>You need to create an account to create a blog, click below to create an account or login.</p>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            <h1>Create Blog</h1>
            {auth.userEmail && <CreateBlog urlEndpoint={props.urlEndPoint}/>}
        </div>
    )
}

export default CreateBlogPage;