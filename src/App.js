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
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import TagBlog from "./Pages/TagBlog";
import CategoryBlog from "./Pages/CategoryBlog";
import ScrollToTop from "./Components/ScrollToTop";
import Blogs from "./Pages/Blogs";



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
        <Route path="/blogs" element={<Blogs setActive={setActive} />} />
        <Route path="/tag/:tag" element={<TagBlog setActive={setActive} />} />
        <Route path="/category/:category" element={<CategoryBlog setActive={setActive}  />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
