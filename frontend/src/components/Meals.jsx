import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";
const config = { method: "GET" };
function Meals() {
  const { data: fetchedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", config, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetched." message={error} />;
  }
  return (
    <ul id="meals">
      {fetchedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
