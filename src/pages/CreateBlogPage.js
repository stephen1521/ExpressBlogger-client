import CreateBlog from "../components/CreateBlog";

const CreateBlogPage = (props) => {
    return (
        <div>
            <h1>Create Blog</h1>
            <CreateBlog urlEndpoint={props.urlEndPoint}/>
        </div>
    )
}

export default CreateBlogPage;