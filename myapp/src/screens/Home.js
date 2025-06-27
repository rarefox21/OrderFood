import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {

  const[search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fooddata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // If your backend returns an object { items: [...], categories: [...] }
      setFoodItems(data.items || []);
      setFoodCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching food data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center my-5">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption " style={{ zIndex: "10" }}>
                <div className="d-flex" justifyContent="center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange ={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://media.istockphoto.com/id/1498243668/photo/tasty-cheeseburger-with-lettuce-cheddar-cheese-tomato-and-pickles-burger-bun-with-sesame.jpg?s=2048x2048&w=is&k=20&c=M98uCHFxBVxBbGLW5UeN0ubVGYSLe_GAb-hSVPh6FBk="
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=2048x2048&w=is&k=20&c=5qfqYi5DEhhVjJ-DIYB4MxUq31EmkvyEnNgNLm5LVpY="
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://media.istockphoto.com/id/1803824141/photo/table-top-view-of-variety-of-uncooked-pasta.jpg?s=612x612&w=0&k=20&c=1dheGAK-gKd-7X9pacJwwifujJOb_ERIqv_YWi4JSUk="
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container my-4">
        {foodCategories.length ? (
          foodCategories.map((category) => (
            <div key={category._id} className="mb-5">
              <h3 className="mb-3">{category.CategoryName}</h3>
              <div className="row">
                {foodItems
                  .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((item) => (
                    <div key={item._id} className="col-md-4 mb-4">
                      <Card
                        name={item.name}
                        options={item.options[0]}
                        img={item.img}
                        //description={item.description}
                        price={item.price}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <h4>No categories found</h4>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
