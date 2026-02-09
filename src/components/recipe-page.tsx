import { useParams } from 'react-router'
import Recipe from './recipe'
import { getRecipes, type RecipeData } from '../recipes'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import { baseUrl } from '../constants'
import { Alert, Button, CircularProgress, Collapse, IconButton, type AlertColor} from '@mui/material'
import { Close, Delete, Edit, Print } from '@mui/icons-material'

export default function RecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    const { recipeId } = useParams()
    const recipe = recipes.find((r: { id: number }) => r.id === (recipeId ? parseInt(recipeId) : -1))
    const navigate = useNavigate()
    const [alertText, setAlertText] = useState("")
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success")
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        getRecipes()
            .then(data => { if (mounted) {
                setRecipes(data)
                setLoading(false)
            }})
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
                setAlertText("Successfully deleted.")
                setAlertSeverity("success")
                setIsAlertOpen(true)
            } else {
                setAlertText("Failed to delete.")
                setAlertSeverity("error")
                setIsAlertOpen(true)
            }
        })
        .catch(error => {
            console.error('Error deleting recipe:', error)
            setAlertText("Failed to delete.")
            setAlertSeverity("error")
            setIsAlertOpen(true)
        }).finally(() => {
            setTimeout(() => {navigate("/")}, 2000)
        })
    }

    if (!loading) {
    return (
        <div>
            <Collapse in={isAlertOpen}>
                <Alert severity={alertSeverity} action={<IconButton aria-label='close' color='inherit' size='small' onClick={() => setIsAlertOpen(false)}>
                    <Close fontSize="inherit" />
                </IconButton>}>
                    {alertText}
                </Alert>
            </Collapse>
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
                <Button onClick={() => recipe?.id && deleteRecipe(recipe.id)} disabled={!recipe} variant='contained'>
                    <Delete />
                </Button>
            </div>
        </div>
    )
    } else {
        return (
            <div className='progress'>
                <CircularProgress />
            </div>
        )
    }


}