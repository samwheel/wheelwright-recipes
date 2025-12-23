import './App.css'
import { useEffect, useState } from 'react'
import { getRecipes, type RecipeData } from './recipes'
import { NavLink } from 'react-router'

function App() {
    const [items, setItems] = useState<RecipeData[] | null>(null)

    useEffect(() => {
        let mounted = true
        getRecipes()
        .then(data => {
            if (mounted) {
                const sorted_data = data.sort((a, b) => a.name.localeCompare(b.name))
                setItems(sorted_data)
            }
            })
        .catch(err => { console.error(err) })
        return () => { mounted = false }
    }, [])

    return (
        <div className="app">
            <h1>Recipe App</h1>
            {items?.map((recipe, index) => (
                <h2 key={recipe.name ?? index}>
                    <NavLink to={`/recipe/${encodeURIComponent(recipe.name)}`}>{recipe.name}</NavLink>
                </h2>
            ))}
            <br />
            <NavLink to="/add-recipe">
                <button>Add Recipe</button>
            </NavLink>
        </div>
    )
}

export default App
