import React from 'react'
import {Link} from 'react-router-dom'
import transitions from 'bootstrap'
const Header=({active,setActive,user,handleLogout})=> {
    const userId=user?.uid;
    console.log("userId",userId);
    console.log("name",user?.displayName);
  return (
    <nav className='navbar navbar-expand lg navbar-light bg-light'>
        <div className='container-fluid bg-faded padding-meadia'>
            <div className="container padding-meadia">
                <nav className="navbar navbar-toggleable-md navbar-light">
                    <button className='navbar-toggler mt-3' type='button'
                             data-bs-toggle="collapse"
                               data-bs-target="#navbarsupportedcontent"
                               data-bs-parent="#navbarsupportedcontent"
                               aria-controls='navbarsupportedcontent'
                               aria-expanded="true"
                               aria-label='Toggle Navigation'>

                                <span className="fa fa-bars"></span>  
                                
    
                    </button>
                       <div className="collapse navbar-collapse" id='navbarsupportedcontent'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                <Link to="/" style={{textDecoration:"none"}}>
                                <li 
                                    className={`nav-item nav-link ${active === "home" ? "active" : " "}` } 
                                    onClick={()=>setActive("Home")}>
                                        Home
                                </li>
                                </Link>


                              <Link to="/create" style={{textDecoration:"none"}}>
                                <li 
                                    className={`nav-item nav-link ${active === "create" ? "active" : " "}` } 
                                    onClick={()=>setActive("create")}>
                                        Create
                                </li>
                             </Link>

                             <Link to="/about" style={{textDecoration:"none"}}>
                                <li 
                                    className={`nav-item nav-link ${active === "about" ? "active" : " "}` } 
                                    onClick={()=>setActive("about")}>
                                        About
                                </li>
                             </Link>

                            </ul>

                       </div>
                            <div className="row g-3">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                    {userId ?(
                                        <>
                                        <div className="profile-logo">
                                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" 
                                            style={{width:"30px", height:"30px", borderRadius:"50%", marginTop:"10px"}}
                                            />
                                            
                                        </div>
                                        <p style={{marginTop:"10px",marginLeft:"5px"}}> {user?.displayName}</p>
                                        <li className="nav-item nav-link" onClick={handleLogout}>
                                            Logout
                                        </li>
                                        </>
                                    ):(
                                        <Link to="/auth" style={{textDecoration:"none"}}>
                                    <li 
                                        className={`nav-item nav-link ${active === "login" ? "active" : " "}` } 
                                        onClick={()=>setActive("login")}>
                                        Login
                                    </li>
                                </Link> 

                                    )}
                                                                  
                                </ul>
                            </div>
                        
                </nav>
            </div>

        </div>
    </nav>
  )
}

export default Header
