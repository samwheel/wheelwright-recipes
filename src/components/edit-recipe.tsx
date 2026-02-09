import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { type RecipeData } from "../recipes"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants"
import Button from "@mui/material/Button"
import { Check } from "@mui/icons-material"
import axios from "axios"

export default function AddRecipe() {
    const { recipeId } = useParams<{recipeId: string}>()
    const [recipe, setRecipe] = useState<RecipeData>({} as RecipeData)
    useEffect(() => {
        let mounted = true
        axios.get(`${baseUrl}/recipes/${recipeId}`)
            .then(response => { if (mounted) setRecipe(response.data) })
            .catch(err => { console.error(err) })
        return () => { mounted = false }
    }, [recipeId])
    const navigate = useNavigate()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(event.target)

        const name = (event.target as HTMLFormElement).recipeName.value
        const ingredients = (event.target as HTMLFormElement).ingredients.value
        const instructions = (event.target as HTMLFormElement).instructions.value
        const newRecipe = { name, ingredients, instructions }
        fetch(`${baseUrl}/recipes/${recipe.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }).then(data => {
            navigate(`/recipe/${recipe.id}`)
            return data
        }).catch(error => {
            console.error('Error:', error)
            navigate('/')
        })
    }

    return (
        <div className="form-container">
            <h1>Edit {recipe.name}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input type="text" id="recipeName" name="recipeName" defaultValue={recipe.name} required />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" defaultValue={recipe.ingredients} required></textarea>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea id="instructions" name="instructions" defaultValue={recipe.instructions} required></textarea>
                </div>
                <Button type="submit" variant="contained"><Check /></Button>
            </form>
        </div>
    )
}