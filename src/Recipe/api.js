import { useState, useEffect } from 'react';

import * as API from '../constants/urls';

const numberOfHits = 10;

const RecipeItem = (props) => (
    <li>
        {props.recipe.title}
    </li>
);
const RecipeList = (props) => (
    <ul>
        {props.recipes.map(recipe => (
            <RecipeItem recipe={recipe} key={recipe.id} />
        ))}
    </ul>
);

const FetchRecipes = () => {
    const [data, setData] = useState(null);
    const [points, setPoints] = useState(Number(JSON.parse(localStorage.getItem('points'))) || 0)

    const hej = null;
    useEffect(() => {
        fetch(`${API.URLS.randomRecipes}?number=${numberOfHits}&apiKey=${API.API_KEY}`)
        .then(response => response.json())
        .then(resData => {
            // nu har vi fått ett resp
            // in i statet, uppdatera points remaining i state & localStorage
            setData(resData.recipes);
            localStorage.setItem('points', points + 1);
            setPoints(points + 1);
            
        })
        .catch(error => console.log(error))
    }, []);

    return (<div>
        <h3>FetchRecipes</h3>
        <p>You have {} calls remaining today</p>
        {data ? <RecipeList recipes={data} /> : null}
        </div>)
}

export default FetchRecipes;