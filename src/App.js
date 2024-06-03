import {useState,useEffect} from 'react'
import "./App.css"
import "./style.scss";
import "./media-query.css";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import AddEditBlog from './Pages/AddEditBlog';
import About from './Pages/About';
import Notfound from './Pages/Notfound';
import{Routes,Route,useNavigate, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Auth from './Pages/Auth';
import { auth, storage } from './firebase';
import { signOut, updateProfile } from 'firebase/auth';
import TagBlog from "./Pages/TagBlog";
import CategoryBlog from "./Pages/CategoryBlog";
import ScrollToTop from "./Components/ScrollToTop";
import Blogs from "./Pages/Blogs";
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileEdit from './Components/ProfileEdit';
import { toast } from 'react-toastify';
import { db } from './firebase'; // Remove 'auth' from here
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };
  // const handleProfileUpdate = async (displayName, profilePicURL) => {
  //   try {
  //     const user = auth.currentUser;
  //     if (user) {
  //       await updateProfile(user, { displayName });
  //       const userDocRef = doc(db, 'users', user.uid);
  //       await setDoc(userDocRef, { displayName, profilePicURL });
  //       const updatedUser = {
  //         ...user,
  //         displayName,
  //         profilePic: URL.createObjectURL(profilePicURL),
  //       };
  //       const storageRef = ref(storage, `profile-pictures/${user.uid}/${profilePicFile.name}`);
  //       await uploadBytes(storageRef, profilePicFile);

  //     // Get download URL of uploaded image
  //       const profilePicURL = await getDownloadURL(storageRef);
  //       console.log("Updatoing app.js");
  //       setUser(updatedUser);
  //       localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to local storage
  //       toast.success('Profile updated successfully');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error.message);
  //     toast.error('Failed to update profile');
  //   }
  // };
  const handleProfileUpdate = async (displayName, profilePicFile) => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Update display name
        await updateProfile(user, { displayName });
  
        // Upload profile picture to Firebase Storage
        const storageRef = ref(storage, `profile-pictures/${user.uid}/${profilePicFile.name}`);

        await uploadBytes(storageRef, profilePicFile);
  
        // Get download URL of uploaded image
        const profilePicURL = await getDownloadURL(storageRef);
  
        // Update Firestore document with profile picture URL
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { displayName, profilePicURL });
  
        // Update user object with new profile picture URL
        const updatedUser = { ...user, displayName, profilePicURL };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ScrollToTop />
      <ToastContainer position="top-center" />
      
      <Routes>
        <Route
          path="/"
          element={<Home setActive={setActive} active={active} user={user} />}
        />
        <Route
          path="/search"
          element={<Home setActive={setActive} user={user} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail setActive={setActive} user={user} />}
        />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/blogs" element={<Blogs setActive={setActive}  user={user}/>} />
        <Route path="/tag/:tag" element={<TagBlog setActive={setActive} />} />
        <Route path="/category/:category" element={<CategoryBlog setActive={setActive}  />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" element={<Notfound />} />

        <Route path="/" element={<Blogs user={user} setActive={() => {}} />} />
        <Route path="/edit-profile" element={<ProfileEdit user={user} handleProfileUpdate={handleProfileUpdate} />} />
        

        
      </Routes>
      <Footer>
        
      </Footer>
    </div>
  );
}

export default App;
