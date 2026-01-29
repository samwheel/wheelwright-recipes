import { useParams } from 'react-router'
import Recipe from './recipe'
import { getRecipes, type RecipeData } from '../recipes'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import { baseUrl } from '../constants'

export default function RecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    const { recipeName } = useParams<{recipeName: string}>()
    const recipe = recipes.find((r: { name: string }) => r.name === recipeName)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        getRecipes()
            .then(data => { if (mounted) setRecipes(data) })
            .catch(err => { console.error(err) })
        return () => { mounted = false }
    }, [])

    const componentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: componentRef
    })

    function deleteRecipe(name: string) {
        fetch(`${baseUrl}/recipes/${encodeURIComponent(name)}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok && response.status === 200) {
                console.log(response.json(), response.status)
                alert('Recipe deleted successfully.')
            } else {
                alert('Failed to delete recipe.')
            }
        })
        .catch(error => {
            console.error('Error deleting recipe:', error)
            alert('An error occurred while deleting the recipe.')
        })
        .finally(() => {
            navigate('/')
        })
    }

    return (
        <div>
            <Recipe
                name={recipe?.name || 'Recipe Not Found'}
                ingredients={recipe?.ingredients}
                instructions={recipe?.instructions}
                ref={componentRef}
            />
            <div className="recipe-buttons">
                <button onClick={reactToPrintFn} disabled={!recipe}>
                    Print Recipe
                </button>
                <button onClick={() => navigate(`/edit-recipe/${recipe?.name}`)} disabled={!recipe}>
                    Edit Recipe
                </button>
                <button onClick={() => recipe?.name && deleteRecipe(recipe.name)} disabled={!recipe}>
                    Delete Recipe
                </button>
            </div>
        </div>
    )
}