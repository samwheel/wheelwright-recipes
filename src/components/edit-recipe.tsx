import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { getRecipes, type RecipeData } from "../recipes"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants"

export default function AddRecipe() {
    const { recipeName } = useParams<{recipeName: string}>()
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    useEffect(() => {
        let mounted = true
        getRecipes()
            .then(data => { if (mounted) setRecipes(data) })
            .catch(err => { console.error(err) })
        return () => { mounted = false }
    }, [])
    const recipe = recipes.find((r: RecipeData) => r.name === recipeName) || { name: '' , ingredients: [], instructions: [] }
    const navigate = useNavigate()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(event.target)

        const name = (event.target as HTMLFormElement).recipeName.value
        const ingredients = (event.target as HTMLFormElement).ingredients.value.split('\n').map((ing: string) => ing.trim())
        const instructions = (event.target as HTMLFormElement).instructions.value.split('\n').map((inst: string) => inst.trim()).filter((inst: string) => inst.length > 0)
        const newRecipe = { name, ingredients, instructions }
        fetch(`${baseUrl}/recipes/${encodeURIComponent(recipe.name)}`, {
            method: 'POST',
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
            navigate(`/recipe/${data.name}`)
        }).catch(error => {
            console.error('Error:', error)
        })

        navigate('/')
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
                    <textarea id="ingredients" name="ingredients" defaultValue={recipe.ingredients.join('\n')} required></textarea>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea id="instructions" name="instructions" defaultValue={recipe.instructions.join('\n')} required></textarea>
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
        </div>
    )
}