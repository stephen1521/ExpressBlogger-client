import BlogForm from "../components/BlogForm";

//home page component 
const HomePage = (props) => {
    const {
        blogList, 
        setBlogList, 
        urlEndPoint,
        setShouldRefresh, 
    } = props

    return (
        <div>
            <h1>Blog Form</h1>
            {blogList.map((item, index) => {
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