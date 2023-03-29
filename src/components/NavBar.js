import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";

const NavBar = () => {
    const auth = useAuth();
    return (
        <div>
            <h3>{auth.userEmail && `Current User: ${auth.userEmail}`}</h3>
            <Link to="/">Home</Link>
            <Link to="/CreateBlogPage">Create Blog</Link>
            <Link to="/SearchPage">Search</Link>
            <Link to="/UpdateUserPage">Update User</Link>
			{auth.userEmail && <button onClick={()=>{
				    auth.logout()
			}}>Logout</button>}
        </div>
    )
}
export default NavBar;