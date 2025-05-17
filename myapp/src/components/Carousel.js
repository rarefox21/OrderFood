import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div>
   <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
  <div className="carousel-inner"  id='carousel'>
     <div className="carousel-caption " style={{zIndex: "10"}}>
       <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
       </form>
      </div>
    <div className="carousel-item active">
      <img src="https://media.istockphoto.com/id/1498243668/photo/tasty-cheeseburger-with-lettuce-cheddar-cheese-tomato-and-pickles-burger-bun-with-sesame.jpg?s=2048x2048&w=is&k=20&c=M98uCHFxBVxBbGLW5UeN0ubVGYSLe_GAb-hSVPh6FBk=" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=2048x2048&w=is&k=20&c=5qfqYi5DEhhVjJ-DIYB4MxUq31EmkvyEnNgNLm5LVpY=" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://media.istockphoto.com/id/1803824141/photo/table-top-view-of-variety-of-uncooked-pasta.jpg?s=612x612&w=0&k=20&c=1dheGAK-gKd-7X9pacJwwifujJOb_ERIqv_YWi4JSUk=" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</div>
  )
}
