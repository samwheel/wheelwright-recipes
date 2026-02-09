import { useParams } from 'react-router'
import Recipe from './recipe'
import { getRecipes, type RecipeData } from '../recipes'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import { baseUrl } from '../constants'
import { Button } from '@mui/material'
import { Delete, Edit, Print } from '@mui/icons-material'

export default function RecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    const { recipeId } = useParams()
    const recipe = recipes.find((r: { id: number }) => r.id === (recipeId ? parseInt(recipeId) : -1))
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

    function deleteRecipe(id: number) {
        fetch(`${baseUrl}/recipes/${id}`, {
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
                id={recipe?.id || -1}
                name={recipe?.name || 'Recipe Not Found'}
                ingredients={recipe?.ingredients}
                instructions={recipe?.instructions}
                ref={componentRef}
            />
            <div className="recipe-buttons">
                <Button onClick={reactToPrintFn} disabled={!recipe} variant='contained'>
                    <Print />
                </Button>
                <Button onClick={() => navigate(`/edit-recipe/${recipe?.id}`)} disabled={!recipe} variant='contained'>
                    <Edit />
                </Button>
                <Button onClick={() => recipe?.name && deleteRecipe(recipe.id)} disabled={!recipe} variant='contained'>
                    <Delete />
                </Button>
            </div>
        </div>
    )
}