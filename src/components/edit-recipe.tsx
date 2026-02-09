import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { type RecipeData } from "../recipes"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants"
import Button from "@mui/material/Button"
import { Check } from "@mui/icons-material"
import axios from "axios"
import { TextField, TextareaAutosize } from "@mui/material"

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

        fetch(`${baseUrl}/recipes/${recipe.id}`, {
            method: 'PUT',
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
            navigate(`/recipe/${recipe.id}`)
            return data
        }).catch(error => {
            console.error('Error:', error)
            navigate('/')
        })
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRecipe({...recipe, [event.target.name]:event.target.value})
    }

    return (
        <div className="form-container">
            <h1>Edit {recipe.name}</h1>
            <form onSubmit={handleSubmit}>
                <TextField key={recipe.name} type="text" label="recipe name" fullWidth name="name" value={recipe.name} onChange={changeHandler} required variant="standard" />
                <TextareaAutosize placeholder="Ingredients" name="ingredients" minRows={5} value={recipe.ingredients} onChange={changeHandler}></TextareaAutosize>
                <TextareaAutosize placeholder="Instructions" name="instructions" minRows={5} value={recipe.instructions} onChange={changeHandler} required></TextareaAutosize>
                <div>
                    <Button type="submit" variant="contained"><Check fontSize="large"/></Button>
                </div>
            </form>
        </div>
    )
}