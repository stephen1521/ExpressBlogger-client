import { useState } from "react";
import axios from 'axios';

const BlogForm = (props) => {
    const {blog, urlEndPoint, setShouldRefresh} = props;
    const [title, setTitle] = useState(blog.title);
    const [text, setText] = useState(blog.text);
    const [author, setAuthor] = useState(blog.author);
    const [categories, setCategories] = useState(blog.categories);
    const [createdAt] = useState(blog.createdAt);
    const [isEditing, setIsEditing] = useState(false);

    const handleDeleteBlog = () => {
        setShouldRefresh(true);
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        axios.delete(`${urlEndPoint}/blogs/delete-one/${blog._id}`, {headers:headers})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (e){
                console.log(e);
            })
        setShouldRefresh(false);
    }

        const handleUpdateBlog = async () => {
            setShouldRefresh(true);
            const req = {
                title: title,
                text: text,
                author: author,
                categories: categories
            } 
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            await axios.put(`${urlEndPoint}/blogs/update-one/${blog._id}`, req, {headers:headers})
                .then(function (response){
                    console.log(response);
            }).catch(function (e){
                console.log(e);
            })
            setShouldRefresh(false);
        }

        return (
            <div>
                {!isEditing && <p>Title: {title}</p>}
                {isEditing && (
                    <div>
                        <p>Editing Movie</p>
                        <label>Title: </label>
                        <input
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                )}
                {!isEditing && <p>Text: {text}</p>}
                {isEditing && (
                    <div>
                        <br></br>
                        <label>Text: </label>
                        <textarea
                            type='text'
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                )}
                {!isEditing && <p>Author: {author}</p>}
                {isEditing && (
                    <div>
                        <br></br>
                        <label>Author: </label>
                    <input
                        type='text'
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    </div>
                )}
                {!isEditing && <p>Categories: {categories}</p>}
                {isEditing && (
                    <div>
                        <br></br>
                        <label>Categories: </label>
                        <input
                            type='array'
                            value={categories}
                            onChange={e => setCategories(e.target.value)}
                        />
                    </div>
                )}
                <p>CreatedAt: {createdAt}</p>
                {!isEditing && 
                    <button onClick={() => setIsEditing(true)}>
                    Edit Movie
                    </button>}
                {isEditing && 
                    <button onClick={() => {
                        setIsEditing(false);
                        handleUpdateBlog();
                    }}>
                    Update Movie
                    </button>}
                <button onClick={() => handleDeleteBlog()}>
                    Delete Movie
                </button>
            </div>
        )
}

export default BlogForm;