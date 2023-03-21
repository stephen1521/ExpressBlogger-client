import './App.css';

import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import CreateBlogPage from './pages/CreateBlogPage';
import SearchPage from './pages/SearchPage';
import SingleMoviePage from './pages/SingleMoviePage';

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
	const [blogList, setBlogList] = useState();
	const [shouldRefresh, setShouldRefresh] = useState(false);
	useEffect(() => {
		axios.get(`${urlEndPoint}/blogs/all`)
			.then(function (response) {
		  		console.log(response);
		  		setBlogList(response.data.blogs);
		})
		.catch(function (error) {
		  	console.log(error);
		})
		.finally(function () {
		  // always executed
		});
	  
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
						urlEndPoint={urlEndPoint}
						/>,
					children: [
						{
							path: "/SearchPage/:blog",
							element: <SingleMoviePage />
						}
					]
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
