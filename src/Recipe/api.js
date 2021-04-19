import { useState, useEffect } from 'react';

const URLS = {
    'randomRecipes': 'https://api.spoonacular.com/recipes/random',
    'recipeInfo': ''
}
const API_KEY = "526eba0616874a9db294da2d1502ca37";
const numberOfHits = 10;

const FetchRecipes = () => {
    const [data, setData] = useState(null);
    const [points, setPoints] = useState(Number(JSON.parse(localStorage.getItem('points'))) || 0)


    useEffect(() => {
        console.log("Hej från useEffect")
        fetch(`${URLS.randomRecipes}?number=${numberOfHits}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // nu har vi fått ett resp
            // in i statet, uppdatera points remaining i state & localStorage
            setData(data);
            localStorage.setItem('points', points + 1);
            setPoints(points + 1);
            
        })
        .catch(error => console.log(error))
    }, []);

    return (<div>
        <h3>FetchRecipes</h3>
        <p>You have {} calls remaining today</p>
        </div>)
}

export default FetchRecipes;