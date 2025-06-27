import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST", // Confirm if POST is required
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFoodItem(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
    <div>
      <Navbar />
      <Carousel />

      <div className="container my-3">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <h3 className="mb-3">{category.CategoryName}</h3>
              <div className="row">
                {foodItem
                  .filter((item) => item.CategoryName === category.CategoryName)
                  .map((item) => (
                    <div key={item._id} className="col-md-4 mb-3">
                      <Card
                        name={item.name}
                        options={item.options}
                        img={item.img}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No categories found</h4>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}