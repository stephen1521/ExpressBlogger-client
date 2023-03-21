import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SingleMoviePage from "../components/SingleMovie";

const SearchPage = (props) => {
    const [title, setTitle] = useState('');
    const [blogExist, setBlogExist] = useState(false);
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    

    const handleSubmit = () => {
        const blog = props.blogList.find((blog) => {
            if(blog.title === title){
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
    }

    return (
        <div>
            <h1>Search For a Single Movie</h1>
            <label>Search by Title: </label>
            <input type='text'
                        id='title'
                        name='title'
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}/>
            <button onClick={(e) => {
                e.preventDefault()
                handleSubmit()}}>Submit</button>
            <br></br>
            {blogExist && <SingleMoviePage blog={blog}/>}
        </div>
    )
}

export default SearchPage;