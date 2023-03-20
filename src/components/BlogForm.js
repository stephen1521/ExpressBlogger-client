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
        const response = axios.delete(`${urlEndPoint}/blog/delete-one/${blog.id}`)
            .then(function (response) {
                console.log(response);
            },{
                'Content-Type': 'application/json'
            })
        }

        const handleUpdateToDo = () => {
            setShouldRefresh(true);
            const req = {
                title: title,
                text: text,
                author: author,
                categories: categories,
            } 
            const response = axios.put(`${urlEndPoint}/blog/update-one/${blog.id}`, req)
                .then(function (response) {
                    console.log(response);
            },{
                'Content-Type': 'application/json'
            })
            setShouldRefresh(false);
        }
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>{title}</td>
                            <td>{text}</td>
                            <td>{author}</td>
                            <td>{categories}</td>
                            <td>{createdAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}

export default BlogForm;