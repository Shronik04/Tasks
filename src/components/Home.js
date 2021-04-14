import React, { useState, useEffect } from "react";
import axios from "axios";
function Home({ logi, setLogi }) {
	const [blogs, setBlogs] = useState();
	const [page, setPage] = useState(1);
	const [len, setLen] = useState();
	const limit = 6;
	const [edit, setEdit] = useState(true);
	const [idx, setIdx] = useState("");
	const [auth, setAuth] = useState();

	// useEffect(() => {
	//     console.log("loading",edit);
	// },[edit])

	useEffect(() => {
		axios
			.get(`http://localhost:5000/blogs?page=${page}&limit=${limit}`)
			.then((res) => {
				console.log(res.data.result);
				setBlogs(res.data.result);
				// setAuth(res.data.result)
				setLen(res.data.total);
				setEdit(false);
				// console.log("data lentghhhhh", len);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	// const updateBlog = (e,index) => {
	//     e.preventDefault();

	//     const cardId= blogs[index]._id
	//     blogs && axios.put(`http://localhost:5000/update/${cardId}`, blogs[index])
	//         .then((res) => {
	//             console.log("updated");

	//             setEdit(false)
	//         }).catch(err =>
	//         alert(err.response.data))

	// }

	// const editTitle = (e, index) => {
	//     var data = [...blogs];
	//     console.log(data[index].title);
	//     setBlogs(data,(data[index].title =e.target.value))
	// }
	// const editDesc = (e, index) => {
	//     var data = [...blogs];
	//     setBlogs(data,(data[index].description=e.target.value))
	// }

	function pageNext() {
		setPage(page + 1);
	}

	function previous() {
		setPage(page - 1);
	}

	function sho() {
		console.log(blogs);
	}
	function showForm(e, index) {
		setEdit(true);
		setIdx(index);
	}
	return (
		<div className="container">
			<div className="row">
				{edit && edit == true ? (
					<h1>Loading...</h1>
				) : (
					<>
						{blogs &&
							blogs.map((i, index) => (
								<>
									{/* {console.log("sjkanskjasaa  author",  i.author)} */}

									<div className="card p-3 col-md-4 m-2 cmain">
										<div key={index}>
											<div>
												<img src={i.file} alt="Image" className="image" />
											</div>

											<div>
												<b>Title:</b> {i.title}
											</div>
											<hr />
											<div>
												<b>Description:</b> {i.description}
											</div>
											<hr />
											<div>
												<b>Author:</b> {i.author ? i.author.name : "N/A"}
											</div>

											{/* <button className="m-2 btn btn-secondary" onClick={(e) => {showForm(e,index) }}>Edit</button> */}
										</div>{" "}
									</div>
									{/* {edit && idx == index ? <form onSubmit={(e)=>updateBlog(e,index)}>
                            <label>Title:</label><br /><input type="text" value={i.title} onChange={(e) => { editTitle(e, index) }} /> <br />
                <label>Description:</label><br /><textarea type="text" value={i.description} onChange={(e)=>{editDesc(e,index)}} /><br />
                            <button type="submit" className="btn btn-primary m-1">Done</button>
                            <button className="btn btn-danger m-1" onClick={() => setEdit(false)}>Cancel</button>         
                                    
                            
            </form>:null}  */}
								</>
							))}{" "}
					</>
				)}
			</div>

			{page > 1 ? (
				<button className="m-2 btn btn-warning" onClick={previous}>
					Prev
				</button>
			) : null}

			{len < limit ? null : (
				<button onClick={pageNext} className="m-2 btn btn-success">
					Next
				</button>
			)}

			<h5>Page {page}</h5>
		</div>
	);
}

export default Home;
