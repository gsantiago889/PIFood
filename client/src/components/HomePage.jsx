import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  dietTypeFilter,
  aplhabeticalSort,
  scoreSort,
  savePage,
  clearDetail,
} from "../actions";

import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import cocinero from "../Images/cocinero1.gif";
import cocinero1 from "../Images/cocinero2.gif";
import asadoArgentino from "../Images/asadoArgentino.png";
import "./home.css";

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const Pages = useSelector((state) => state.pages);

  const [order, setOrder] = useState("");

  const [page, setPage] = useState(Pages);
  const [recipesPage, setRecipesPage] = useState(9);

  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(`${e.target.value}`);
  }
  function handleNextpage() {
    dispatch(savePage(page));
  }
  return (
    <div className="home">
      <h1 className="initialMsg">Find your recipe!, GO!!</h1>
      <img className="cocinero" src={cocinero} alt="cocinero gif" />
      <img className="cocinero1" src={cocinero1} alt="cocinero1 gif" />
      <SearchBar />
      <div>
        <button className="refreshButton" onClick={handleClick}>
          Refresh recipes
        </button>
        <Link to="/recipe">
          <button className="addButton">Add new recipe</button>
        </Link>
      </div>
      <div className="select">
        <label className="filters">Sort:</label>
        <select
          className="select"
          name="alphabetical"
          onChange={(e) => handleAlphabeticalSort(e)}
        >
          <option disabled selected>
            Alphabetical
          </option>
          <option value="atoz">A to Z</option>
          <option value="ztoa">Z to A</option>
        </select>

        <select
          className="select"
          name="numerical"
          onChange={(e) => handleScoreSort(e)}
        >
          <option disabled selected>
            Health Score
          </option>
          <option value="asc">From Min to Max</option>
          <option value="desc">From Max to Min</option>
        </select>

        <label className="filters">Diet Types:</label>
        <select
          className="select"
          name="diets"
          onChange={(e) => handleDietTypeFilter(e)}
        >
          <option disabled selected>
            Select...
          </option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Keto</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto vegetarian">Lacto-Vegetarian</option>
          <option value="ovo vegetarian">Ovo-Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
          <option value="dairy free">Dairy Free</option>
        </select>
      </div>

      <Paged
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />

      <div className="allrecipes">
        {showRecipesPage?.map((e) => {
          return (
            <div className="eachRecipe" key={prevId++}>
              <Link
                onClick={(e) => handleNextpage(e)}
                className="linkRecetas"
                to={`home/${e.id}`}
              >
                <Recipe
                  image={e.image ? e.image : asadoArgentino}
                  name={e.name}
                  dietTypes={e.dietTypes}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <Paged
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />
    </div>
  );
}
