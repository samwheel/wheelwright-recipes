import { useNavigate } from "react-router"
import { baseUrl } from "../constants"
import Button from "@mui/material/Button"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import type { RecipeData } from "../recipes"
import { TextareaAutosize, TextField } from "@mui/material"

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
                <TextField type="text" label="recipe name" fullWidth name="name" value={recipe.name} onChange={changeHandler} required variant="standard" />
                <TextareaAutosize placeholder="Ingredients" name="ingredients" minRows={5} value={recipe.ingredients} onChange={changeHandler}></TextareaAutosize>
                <TextareaAutosize placeholder="Instructions" name="instructions" minRows={5} value={recipe.instructions} onChange={changeHandler} required></TextareaAutosize>
                <div>
                    <Button type="submit" variant="contained"><Add fontSize="large"/></Button>
                </div>
            </form>
        </div>
    )
}