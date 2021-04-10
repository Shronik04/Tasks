// import axios from 'axios';
// import React,{useState} from 'react'

// function Upload() {
//     const [im, setIm]=useState()

//     function handleFile(file) {
      
//         const formdata = new FormData();
//         formdata.append("file", file);
//         // setFiles(formdata)
//         setIm(formdata)

//         function imgUp () {
//             axios.post(`http://localhost:5000/upload`, im)
//                 .then((res) => {
//                 console.log("Uploaded");
//                 })
//                 .catch((err) => {
//                 console.log(err);
//             })
//         }
//         imgUp();
//     }

   
//     return (
//         <div>
//             <input type="file" name="file" id="" onChange={(e) => handleFile(e.target.files[0])} /><br /><br />
//             {/* <button onClick={(e)=>imgUp(e)}>Upload</button> */}
//         </div>
//     )
// }

// export default Upload
