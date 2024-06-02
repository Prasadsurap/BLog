// // import React, { useEffect } from "react";
// import FontAwesome from "react-fontawesome";
// import { Link } from "react-router-dom";
// import { excerpt } from "../Utility";

// const BlogSection = ({
//   id,
//   title,
//   description,
//   category,
//   imgUrl,
//   userId,
//   author,
//   timestamp,
//   user,
//   handleDelete,
// }) => {
//   return (
//     <div>
//       <div className="row pb-4" key={id}>
//         <div className="col-md-5">
//           <div className="hover-blogs-img">
//             <div className="blogs-img">
//               <img src={imgUrl} alt={title} />
//               <div></div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-7">
//           <div className="text-start">
//             <h6 className="category catg-color">{category}</h6>
//             <span className="title py-2">{title}</span>
//             <span className="meta-info">
//               <p className="author">{author}</p> -&nbsp;
//               {timestamp.toDate().toDateString()}
//             </span>
//           </div>
//           <div className="short-description text-start">
//             {excerpt(description, 120)}
//           </div>
//           <Link to={`/detail/${id}`}>
//             <button className="btn btn-read">Read More</button>
//           </Link>
//           {user && user.uid === userId && (
//             <div style={{ float: "right" }}>
//               <FontAwesome
//                 name="trash"
//                 style={{ margin: "15px", cursor: "pointer" }}
//                 size="2x"
//                 onClick={() => handleDelete(id)}
//               />
//               <Link to={`/update/${id}`}>
//                 <FontAwesome
//                   name="edit"
//                   style={{ cursor: "pointer" }}
//                   size="2x"
//                 />
//               </Link>
              

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogSection;








import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";
import { db } from "../firebase"; // Make sure to import your Firebase configuration
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import './BlogSection.css'; // Import the CSS file

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);

  useEffect(() => {
    if (!user) return; // Avoid running the effect if user is null

    // Fetch initial likes and dislikes count and check if the user has liked/disliked the post
    const fetchData = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setUserHasLiked(data.likedBy?.includes(user.uid) || false);
        setUserHasDisliked(data.dislikedBy?.includes(user.uid) || false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return; // Return early if user is null
    if (user.uid === userId) return; // Prevent liking own post

    const docRef = doc(db, "blogs", id);
    let newLikes = likes;
    let newDislikes = dislikes;

    if (userHasLiked) {
      // User is unliking the post
      newLikes -= 1;
      setUserHasLiked(false);
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: arrayRemove(user.uid)
      });
    } else {
      // User is liking the post
      newLikes += 1;
      setUserHasLiked(true);
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: arrayUnion(user.uid)
      });

      // If the user had previously disliked the post, remove the dislike
      if (userHasDisliked) {
        newDislikes -= 1;
        setUserHasDisliked(false);
        await updateDoc(docRef, {
          dislikes: newDislikes,
          dislikedBy: arrayRemove(user.uid)
        });
      }
    }

    setLikes(newLikes);
    setDislikes(newDislikes);
  };

  const handleDislike = async () => {
    if (!user) return; // Return early if user is null
    if (user.uid === userId) return; // Prevent disliking own post

    const docRef = doc(db, "blogs", id);
    let newDislikes = dislikes;
    let newLikes = likes;

    if (userHasDisliked) {
      // User is undisliking the post
      newDislikes -= 1;
      setUserHasDisliked(false);
      await updateDoc(docRef, {
        dislikes: newDislikes,
        dislikedBy: arrayRemove(user.uid)
      });
    } else {
      // User is disliking the post
      newDislikes += 1;
      setUserHasDisliked(true);
      await updateDoc(docRef, {
        dislikes: newDislikes,
        dislikedBy: arrayUnion(user.uid)
      });

      // If the user had previously liked the post, remove the like
      if (userHasLiked) {
        newLikes -= 1;
        setUserHasLiked(false);
        await updateDoc(docRef, {
          likes: newLikes,
          likedBy: arrayRemove(user.uid)
        });
      }
    }

    setDislikes(newDislikes);
    setLikes(newLikes);
  };

  return (
    <div>
      <div className="row pb-4" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(description, 120)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                className="icon-spacing" // Add spacing class
                style={{ cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  className="icon-spacing" // Add spacing class
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
          <div style={{ marginTop: "10px"}}>
            <FontAwesome
              name="thumbs-up"
              className="icon-spacing" // Add spacing class
              style={{ cursor: !user || user.uid === userId ? "not-allowed" : "pointer", color: userHasLiked ? "blue" : "grey" }}
              size="2x"
              onClick={handleLike}
            />
            <span style={{ marginLeft: "2px",marginRight:"20px" }}>{likes}</span>
            {/* <FontAwesome
              name="thumbs-down"
              className="icon-spacing" // Add spacing class
              style={{ cursor: !user || user.uid === userId ? "not-allowed" : "pointer", color: userHasDisliked ? "red" : "grey" }}
              size="2x"
              onClick={handleDislike}
            />
            <span style={{ marginLeft: "2px" }}>{dislikes}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
