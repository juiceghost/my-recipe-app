import { useState, useEffect } from 'react';

import * as API from '../constants/urls';

const numberOfHits = 10;

const RecipeItem = (props) => {
    const [recipeDetail, setRecipeDetail] = useState(null);

    return (
        <>
            <li onClick={() => setRecipeDetail(props.recipe.id)}>
                {props.recipe.title}
            </li>
            {recipeDetail && <FetchRecipe recipe={props.recipe} />}
        </>
    );
}

const RecipeList = (props) => (
    <ul>
        {props.recipes.map(recipe => (
            <RecipeItem recipe={recipe} key={recipe.id} />
        ))}
    </ul>
);

const FetchRecipe = (props) => {
    const [data, setData] = useState(null);
    // hämta detlajer om recept med id = props.recipe.id
    // in i statet
    // rendera ut bilden :)
    useEffect(() => {
        fetch(`${API.URLS.recipeInfo(props.recipe.id)}?apiKey=${API.API_KEY}`)
            .then(response => response.json())
            .then(resData => {
                // nu har vi fått ett resp
                // in i statet, uppdatera points remaining i state & localStorage
                setData(resData);
                console.log(resData)
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>{data &&
            <p onClick={() => setData(null)}>{data.title}
                <img src={data.image} alt='Picture of food' />
            </p>
        }
        </>
    )

}
const FetchRecipes = () => {
    const [data, setData] = useState(null);
    const [points, setPoints] = useState(Number(JSON.parse(localStorage.getItem('points'))) || 0)

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
        <p>You have { } calls remaining today</p>
        {data && <RecipeList recipes={data} />}
    </div>)
}

export default FetchRecipes;