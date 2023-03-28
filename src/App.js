import './App.css';

import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import CreateBlogPage from './pages/CreateBlogPage';
import SearchPage from './pages/SearchPage';
import SingleMoviePage from './components/SingleBlog';
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
	const [blogList, setBlogList] = useState();
	const [userList, setUserList] = useState();
	const [shouldRefresh, setShouldRefresh] = useState(false);
	useEffect(() => {
		axios.get(`${urlEndPoint}/blogs/all`)
			.then(function (response) {
		  		setBlogList(response.data.blogs);
		})
		.catch(function (error) {
		  	console.log(error);
		})
		.finally(function () {
		  // always executed
		});
	  }, [])

	useEffect(() => {
		axios.get(`${urlEndPoint}/users/all`)
			.then(function (response) {
				setUserList(response.data.users);
			})
			.catch(function (error){
				console.log(error);
			})
			.finally(function (){

			})
	}, [])
	const router = createBrowserRouter([
		{
		  	path: "/",
		  	element: <Layout />,
		  	children: [
				{
			  		index: true,
			  		element: <HomePage 
						blogList={blogList} 
						urlEndPoint={urlEndPoint} 
						setShouldRefresh={setShouldRefresh}
			  		/>
				},	
				{
					path:'/CreateBlogPage',
					element: <CreateBlogPage 
							urlEndPoint={urlEndPoint}
						/>
				},
				{
					path:'/SearchPage',
					element: <SearchPage
						blogList={blogList}
						userList={userList} 
						urlEndPoint={urlEndPoint}
						/>,
					children: [
						{
							path: "/SearchPage/:blog",
							element: <SingleMoviePage />
						}
					]
				},
				{
					path: "login",
					element: <LoginPage />
				},
				{
					path: "registration",
					element: <RegistrationPage />
				}
		  	]
		}
	  ])

  	return (
		<div className="App-header">
			<RouterProvider router={router} />
	  	</div>
 	 );
}

export default App;
