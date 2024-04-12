import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      const url = "https://mittarv-backend.onrender.com/recips/get-recipe";
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        const formatedData = data.recipe.map((eachData) => ({
          title: eachData.title,
          id: eachData.id,
          description: eachData.description,
          ingredients: eachData.ingredients,
          instructions: eachData.instructions,
          image: eachData.image,
        }));
        console.log(data);
        setRecipeData(formatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onclickLogout = () => {
    Cookie.remove("jwt_token");
    navigate("/login");
  };
  return (
    <div className="home-container">
      <div className="heading-button">
        <h1>All Recipes</h1>
        <button type="button" className="logout" onClick={onclickLogout}>
          Logout
        </button>
      </div>
      <div className="al">
        {recipeData.map((eachData) => (
          <div
            key={eachData.id}
            className="recipes"
            style={{
              backgroundImage: `url(${eachData.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              objectFit: "cover",
            }}
          >
            <div className="title-img-container">
              <p className="title">
                <span>Title:</span>
                {eachData.title}
              </p>
            </div>
            <div>
              <p className="des">
                <span>Description:</span>
                <p>{eachData.description}</p>
              </p>
              <p className="des">
                <span>Ingredients:</span>
                <p>{eachData.ingredients}</p>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
