import { useState } from "react";
import axios from 'axios';

const CreateBlog = (props) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [categories, setCategories] = useState([]);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const req = {
            title: title,
            text: text,
            author: author,
            categories: categories,
            createdAt: new Date(),
            lastModified: new Date()
        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        await axios.post(`${props.urlEndpoint}/blogs/create-one`, req, {headers:headers})
            .then(function (response){
                console.log(response);
        }).catch(function (e){
            console.log(e);
        })

        reset();
    }

    const reset = () => {
        setTitle('');
        setText('');
        setAuthor('');
        setCategories([]);
    }

    return (
            <form onSubmit={onFormSubmit}>
                <label htmlFor="title">Title: </label>
                <input type='text'
                        id='title'
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}/><br/>
                <label htmlFor="text">Text: </label>
                <input type='text'
                        id='text'
                        name='text'
                        value={text}
                        onChange={e => setText(e.target.value)}/><br/>
                <label htmlFor="author">Author: </label>
                <input type='text'
                        id='author'
                        name='author'
                        value={author}
                        onChange={e => setAuthor(e.target.value)}/><br/>
                <label htmlFor="categories">Categories: </label>
                <input type='text'
                        id='categories'
                        name='categories'
                        value={categories}
                        onChange={e => setCategories(e.target.value)}/><br/>
                <button type='submit'>Submit</button>
            </form>
    )
}

export default CreateBlog;