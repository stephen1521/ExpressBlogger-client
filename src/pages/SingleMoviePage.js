const SingleMoviePage = (props) => {
   if(props.blog === undefined){
    return (
        <p>Movie not found</p>
    )
   }else {
        return (
            <div>
                <p>Title: {props.blog.title}</p>
                <p>Text: {props.blog.text}</p> 
                <p>Author: {props.blog.author}</p>
                <p>Categories: {props.blog.categories}</p>
                <p>CreatedAt: {props.blog.createdAt}</p>
            </div>
        )
   }
}

export default SingleMoviePage;