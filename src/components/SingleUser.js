const SingleUserPage = (props) => {
    if(props.user === undefined){
     return (
         <p>User not found</p>
     )
    }else {
        const users = props.user.map((user, index) => {
            return (
                <div key={index}>
                    <p>Email: {user.email}</p>
                    <p>type: {user.type}</p>
                </div>
            )
        })
         return (
             <div>{users}</div>
         )
    }
 }
 
 export default SingleUserPage;