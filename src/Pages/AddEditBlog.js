import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc,collection,getDoc,serverTimestamp,doc,updateDoc,} from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  Content: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user, setActive }) =>
 {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);



  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, Content } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",


        
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();

  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && Content && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="yes"
                      name="radioOption"
                      checked={trending === "yes"}
                      onChange={handleTrending}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      Yes&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="no"
                      name="radioOption"
                      checked={trending === "no"}
                      onChange={handleTrending}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      No
                    </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control Content-box"
                  placeholder="Blog content"
                  value={Content}
                  name="Content"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;



















// import React ,{useState,useEffect}from 'react'
// import ReactTagInput from '@pathofdev/react-tag-input'
// import "@pathofdev/react-tag-input/build/index.css";
// import { db, storage } from '../firebase';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import {Navigate, useNavigate} from 'react-router-dom'
// const initialstate={
//   title:"",
//   tags:[],
//   trending:"no",
//   category:"",
//   description:""
// }
// const categoryOption = [
//   "Fashion",
//   "Technology",
//   "Food",
//   "Politics",
//   "Sports",
//   "Business",
// ];
// const navigate=useNavigate();
// const AddEditBlog = ({user}) => {
//     const [form,setform]=useState(initialstate  )
//     const [file,setfile]=useState(null)
//     const [progress,setprogress]=useState(null)

//   const {title,tags,category,trending,description}=form;

//   useEffect(()=>
//   {
//     const uploadfile=()=>{
//       const storageref=ref(storage,file.name)
//       const uploadTask= uploadBytesResumable(storageref,file);
//       uploadTask.on("state_changed ",(snapshot)=>{
//           const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
//           console.log("Uploading"+ progress +"% done");
//            // document.write("Uploading"+ progress +"% done");

//           setprogress(progress);
//           switch(snapshot.state)
//           {
//             case"paused":
//                console.log("upload is paused")
//             break;
//             case"running":
//                console.log("Uploading")
//             break;
//             default:
//               break;

//           }
//       },(error)=>{
//           console.log(error)
//       },
//       ()=>
//       {
//           getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL)=>{
//             setform((prev)=>({...prev,imgUrl:DownloadURL}))
//           })
//       })
//     }
//     file && uploadfile();
//   },[file])

//   const handlechange=(e)=>
//   {
//       setform({...form,[e.target.name]:e.target.value})
//   }
//   const handletags=(tags)=>
//   {
//       setform({...form,tags});
//   }
//   const handleTrending=(e)=>
//   {
//       setform({...form,trending:e.target.value});
//   }
//    const onCategoryChange=(e)=>
//   {
//       setform({...form,category:e.target.value})
//   }
//   const handlesubmit=async(e)=>
//   {
//       e.preventDefault();
//       if(category && tags && title && files && description &&tren);
//       try
//       {
//         await addDoc(collection(db,blogs),
//         {

//           ...form,
//           Timestamp:serverTimestamp(),
//           author:user.displayname,
//           userId:user.uid
//         })

//       }
//       catch(err){
//       console.log(err);
    

//       }
//   }
  
//   return (
//   <div className="container-fluid mb-4">
//     <div className="container">
//       <div className="col-12 ">
//         <div className="text-center heading py-2">
//           create Blog

//         </div>
//       </div>
//       <div className="row h-100 justify-content-center align-item-center">
//         <div className="col-10 col-md-8 col-lg-6">
//           <form className="row blog-form" onSubmit={handlesubmit}>

//             <div className="col-12 py-3">
//                 <input type="text" 
//                 className='form-control input-text-box'
//                  placeholder='Title'
//                   name="title" 
//                   value={title} onChange={handlechange} />
//             </div>

//             <div className="col-12 py-3">
//             <ReactTagInput tags={tags} placeholder='tags' onChange={handletags}/>
//             </div>

//             <div className="col-12 py-3">
//               <p className='trending'>Trending Blog</p>
//               <div className="form-check-inline mx-2">
//                   <input type="radio" 
//                      className='form-check-input'
//                      value="yes"
//                      name="radioOptions" 
//                      checked={trending==="yes"}
//                      onChange={handleTrending} 
//                    />
//                   <label htmlFor="radioOption " className="form-check-label">
//                     Yes&nbsp;
//                   </label>

//                   <input type="radio" 
//                      className='form-check-input'
//                      value="no"
//                      name="radioOptions" 
//                      checked={trending === "no"}
//                      onChange={handleTrending} 
//                    />
//                   <label htmlFor="radioOption " className="form-check-label">
//                     no

//                   </label>
//               </div>
//             </div>

//             <div className="col-12 py-3">
//               <select value={category} onChange={onCategoryChange}className="catg-dropdown">
//                 <option >Select category</option>
//                 {categoryOption.map((option,index)=>(
//                   <option value={option || ""} key={index}>{option}</option>
//                 ))}

//               </select>
//             </div>
//             <div className="col-12 py-3">
//               <textarea
//                   className='form-control description-box'
//                   placeholder='Description'
//                   value={description}
//                   name='description'
//                   onChange={handlechange}
//               />
//             </div>

//             <div className="mb-3">
//               <input type="file" className='form-control' onChange={(e)=>setfile(e.target.files[0])} />
//             </div>
//             <div className="col-12 py-3 text-center">
//               <button className="btn btn-add" type='submit' disabled={progress !== null && progress < 100}>
//                   submit
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default AddEditBlog
