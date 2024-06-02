



import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";
import { db } from "../firebase"; 
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

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
  const [views, setViews] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  useEffect(() => {
    // if (!user) return;

    // Fetch initial likes, views and check if the user has liked the post
    const fetchData = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || 0);
        setViews(data.views || 0);
        if (user) {
          setUserHasLiked(data.likedBy?.includes(user.uid) || false);          
        }
      }
    };

    fetchData();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a post.");
      return;
    }
    if (user.uid === userId) return; // Prevent liking own post

    const docRef = doc(db, "blogs", id);
    let newLikes = likes;

    if (userHasLiked) {
      newLikes -= 1;
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: arrayRemove(user.uid)
      });
      setUserHasLiked(false);

    } else {
      newLikes += 1;
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: arrayUnion(user.uid)
      });
      setUserHasLiked(true);

    }

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
                className="icon-spacing"
                style={{ cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  className="icon-spacing"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            <FontAwesome
              name="thumbs-up"
              className="icon-spacing"
              style={{ cursor: !user || user.uid === userId ? "not-allowed" : "pointer", color: userHasLiked ? "blue" : "grey" }}
              size="2x"
              onClick={handleLike}
            />
            <span style={{ marginLeft: "10px" }}>{likes}</span>
            <span style={{ marginLeft: "20px" }}>Views: {views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
