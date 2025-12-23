import { useNavigate } from "react-router"
import { baseUrl } from "../constants"

export default function AddRecipe() {
    const navigate = useNavigate()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(event.target)

        const name = (event.target as HTMLFormElement).recipeName.value
        const ingredients = (event.target as HTMLFormElement).ingredients.value.split('\n').map((ing: string) => ing.trim())
        const instructions = (event.target as HTMLFormElement).instructions.value.split('\n').map((inst: string) => inst.trim()).filter((inst: string) => inst.length > 0)
        const recipe = { name, ingredients, instructions }
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
            navigate(`/recipe/${data.name}`)
        }).catch(error => {
            console.error('Error:', error)
        })

        navigate('/')
    }

    return (
        <div className="form-container">
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input type="text" id="recipeName" name="recipeName" required />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" required></textarea>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea id="instructions" name="instructions" required></textarea>
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    )
}