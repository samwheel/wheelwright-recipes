import { useNavigate } from "react-router"
import { baseUrl } from "../constants"
import Button from "@mui/material/Button"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import type { RecipeData } from "../recipes"

export default function AddRecipe() {
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState({} as RecipeData)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(event.target)
        fetch(`${baseUrl}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }).then(data => {
            navigate(`/recipe/${data.id}`)
        }).catch(error => {
            console.error('Error:', error)
        })

        navigate('/')
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRecipe({...recipe, [event.target.name]:event.target.value})
    }

    return (
        <div className="form-container">
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input type="text" id="recipeName" name="name" value={recipe.name} onChange={changeHandler} required />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" value={recipe.ingredients} onChange={changeHandler} required></textarea>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={changeHandler} required></textarea>
                </div>
                <Button type="submit" variant="contained"><Add /></Button>
            </form>
        </div>
    )
}