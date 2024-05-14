import React from 'react'
import Owlcarousel from 'react-owl-carousel'
import {Link} from 'react-router-dom'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Trending = ({blogs}) => {
    const options={
        loop:true,
        margin:10,
        nev:true,   
        responsive:{
            0:{
                items:1
            },
          400:{
            items:2
          } , 
          600:{
            items:3
          }, 
           1000:{
            items:4
          }  
        }
    }
  return (
    <>
    <div>
      <div className="blog-heading text-start py-2 mb-4">Trending  </div>
    </div>
    <Owlcarousel className='oel-theme'{...options} >
        {blogs?.map((item)=>(
            <div className="item px-2" key={item.id}>
                    <Link to={`/detail/${item.id}`}>
                        <div className="trending-image-position">
                            <div className="trending-image-size">
                                <img src={item.imgurl} alt={item.title} className="trending-img-relative" />
                            </div>
                            <div className="trending-ima-absolute">

                            </div>
                            <div className="trending-ima-absolute-1">
                                <span className="text-white">
                                        {item.title}
                                </span>
                                <div className="trending-meta-info">
                                    {item.author} -{item.timestamp.toDate().toDateString()}
                                </div>
                            </div>
                        </div>

                    </Link>
            </div>    
            ))}
        </Owlcarousel>
    </>
  )
}

export default Trending
