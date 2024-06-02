import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer id="footer">
 
       
        <div className="company-details">
            <div className="row">
                <div id="col1">
                    <span id="icon" className="fa fa-map-marker"></span>
 
                    <span>
                        Jainagar second block
                        <br />Cims, India
                    </span>
                </div>
 
                <div id="col2">
                    <span id="icon" className="fa fa-phone"></span>
 
                    <span>
                        Telephone: +91-890 * * * * * * *
                    </span>
                </div>
 
                <div id="col3">
                    <span id="icon" className="fa fa-envelope"></span>
                    <span>Blogwebsite@gmail.com</span>
                </div>
            </div>
        </div>
      
        <div className="copyright">
            <p>© Prasad | Bharath</p>
 
            <ul className="contact">
                <li>
                 <a href="https://twitter.com/login" class="fa fa-twitter">

                  </a>
                    
                </li>
 
                <li>
                    <a href="#" className="fa fa-instagram">
 
                    </a>
                </li>
 
                <li>
                    <a href="#" className="fa fa-pinterest-p">
 
                    </a>
                </li>
            </ul>
        </div>
    </footer>
    </div>
  )
}

export default Footer
