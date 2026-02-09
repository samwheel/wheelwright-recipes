import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getRecipes, type RecipeData } from "../recipes";
import stripCommonWords from "../strip-common-words";

export default function RecipeList(props: {searchQuery: string}) {
    const [items, setItems] = useState<RecipeData[] | null>(null)

    useEffect(() => {
        (async () => {
            const result = await getRecipes()
            const sortedResult = result.toSorted((item, nextItem) => stripCommonWords(item.name).localeCompare(stripCommonWords(nextItem.name)))
            setItems(sortedResult)
        })()
    })
    
    return (
        <div>
            {items?.filter(item => (
                item.name.toLowerCase().includes(props.searchQuery.toLowerCase())
            )).map((recipe, index) => (
                <h2 key={recipe.name ?? index}>
                    <NavLink to={`/recipe/${recipe.id}`}>{recipe.name}</NavLink>
                </h2>
            ))}
            <div className="add-recipe-button">
                <NavLink to="/add-recipe">
                    <Button><AddCircle/></Button>
                </NavLink>
            </div>
        </div>
    )
}