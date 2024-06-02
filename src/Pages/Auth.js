import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import {useNavigate} from 'react-router-dom'

const initialstate = {
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  confirmpassword:""
};


const Auth = ({setActive,setUser}) => {
  const [state,setState] = useState(initialstate);
  const[signUp,setsignUp]=useState(false);
  const{email,password,firstname,lastname,confirmpassword}=state;
  const navigate=useNavigate();

  const handlechange =(e)=>{
    setState({...state,[e.target.name]:e.target.value});
  }

  const handleAuth= async(e)=>{
    e.preventDefault();
    try {
      if (!signUp) {
        if (email && password) {
          const {user}=await signInWithEmailAndPassword(auth,email,password)
          setActive("home");
          setUser(user);
          navigate("/");
        } else {
          toast.error("Fill in all fields");
        }
      } else {
        if (password !== confirmpassword) {
          toast.error("Passwords do not match");
        } else if (firstname && lastname && email && password) {
          const {user} = await createUserWithEmailAndPassword(auth,email,password);
          await updateProfile(user,{displayName:`${firstname} ${lastname}`});
          setActive("Home");
          setUser(user)
          navigate("/");

        } else {
          toast.error("Fill in all fields");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else {
        toast.error("Failed to sign in or sign up. Please try again.");
      }
    }
  }

  return (
    <div className="container-fluid md-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "sign-In": "sign-up"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signUp &&(
                <>
                  <div className="col-6 py-3">
                    <input type="text" 
                      className='form-control input-text-box'
                      placeholder='firstname'
                      name="firstname" 
                      value={firstname} onChange={handlechange} />
                  </div>
                  <div className="col-6 py-3">
                    <input type="text" 
                      className='form-control input-text-box'
                      placeholder='lastname'
                      name="lastname" 
                      value={lastname} onChange={handlechange} />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input type="email" 
                  className='form-control input-text-box'
                  placeholder='Email'
                  name="email" 
                  value={email} onChange={handlechange} />
              </div>
              <div className="col-12 py-3">
                <input type="password" 
                  className='form-control input-text-box'
                  placeholder="password"
                  name="password" 
                  autoComplete="off"
                  value={password} onChange={handlechange} />
              </div>
              {signUp &&(
                <div className="col-12 py-3">
                  <input type="password" 
                    className='form-control input-text-box'
                    placeholder="confirmpassword"
                    name="confirmpassword" 
                    value={confirmpassword} onChange={handlechange} />
                </div>
              )}
              <div className="col-12 py-3 text-center">
                <button className={ `btn ${!signUp ? "btn-sign-In":"btn-sign-Up"}`}
                  type='submit'>
                  {!signUp ? "sign-in":"sign-up"}
                </button>
              </div>
            </form>
            <div>
              {!signUp ?(
                <>
                  <div className="text center justify-content center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      You dont have an account ?&nbsp;
                      <span className="link-danger"
                        style={{textDecoration:"none",
                        cursor:"pointer"}}
                        onClick={()=>setsignUp(true)}>
                        signUp
                      </span>
                    </p>
                  </div>
                </>
              ):(
                <>
                  <div className="text center justify-content center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      You have an account ?&nbsp;
                      <span style={{textDecoration:"none",cursor:"pointer", color:"#298af2"}}
                          onClick={()=>setsignUp(false)} >
                          signIn
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;



