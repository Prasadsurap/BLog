import React from 'react'
import {useNavigate} from 'react-router-dom'

const Mostpopular = ({blogs}) => {
    const navigate=useNavigate();
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-3mb-4">
        Mostpopular
      </div>
      {blogs?.map((item)=>(
        <div className="row pb-3"
            key={item.div} style={{cursor:"pointer"}} onClick={()=>navigate(`/detail/${item.id}`)}>

                <div className="col-5 align-self-center">
                    <img src={item.imgurl} alt={item.title} className='most-popular-img'/>
                </div>
                <div className="col-7 padding">
                    <div className="text-start most-popular-font">{item.title}</div>
                     <div className="text-start most-popular-font-meta">
                        {item.timestamp.toDate().toDateString()}
                    </div>
                </div>
        </div>
      ))}
    </div>
  )
}

export default Mostpopular
// 9916518340
// shbaz begum
// 1500