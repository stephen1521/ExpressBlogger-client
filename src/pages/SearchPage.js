import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SingleBlogPage from "../components/SingleBlog";
import SingleUserPage from "../components/SingleUser";
import { useAuth } from "../Hooks/Auth";

const SearchPage = (props) => {
    const [input, setInput] = useState('');
    const [blogExist, setBlogExist] = useState(false);
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const [selectedOption, setSelectedOption] = useState();
    const [userExist, setUserExist] = useState(false);
    const [user, setUser] = useState();
	const auth = useAuth()
	
    const handleSubmit = () => {
        if(selectedOption === 'blogs'){
            const blog = props.blogList.find((blog) => {
                if(blog.title === input){
                    return blog;
                }
            })
            if(blog !== undefined){
                navigate(`/SearchPage/${blog.title}`)
            }else {
                navigate('/SearchPage')
            }
            setBlog(blog);
            setBlogExist(true);
            setUserExist(false);
        }else if(selectedOption === 'users') {
            const user = props.userList.filter((user) => {
                if(user.email === input){
                    return user;
                }else if(input === 'admin' && user.type === 'admin'){
                    return user;
                }else if(input === 'user' && user.type === 'user'){
                    return user;
                }
            })
            setUser(user);
            setUserExist(true);
            setBlogExist(false);
        }
    }

    return (
        <div>
            {!auth.userEmail && <p>You need to create an account to search for blogs or users, click below to create an account or login.</p>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/registration');
            }}>RegistrationPage</button>}
            {!auth.userEmail && <button onClick={() => {
                navigate('/login');
            }}>LoginPage</button>}
            <h1>Search</h1>
            {auth.userEmail && <label>Search by: </label>}
            {auth.userEmail && <div className="radio">
                <label>
                <input type="radio" value="blogs" 
                      checked={selectedOption === 'blogs'} 
                      onChange={() => setSelectedOption('blogs')} />
                Blogs
                </label>
            </div>}
            {auth.userEmail && <div className="radio">
                <label>
                <input type="radio" value="users" 
                      checked={selectedOption === 'users'} 
                      onChange={() => setSelectedOption('users')} />
                Users
                </label>
            </div>}
            {auth.userEmail && <input type='text'
                        id='input'
                        name='input'
                        value={input}
                        onChange={(e)=>{setInput(e.target.value)}}
                        />}
            {auth.userEmail && <button onClick={(e) => {
                e.preventDefault()
                handleSubmit()}}>Submit
                </button>}
            <br></br>
            {blogExist && <SingleBlogPage blog={blog}/>}
            {userExist && <SingleUserPage user={user}/>}
        </div>
    )
}

export default SearchPage;