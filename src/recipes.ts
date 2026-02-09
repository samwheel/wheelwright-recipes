import { baseUrl } from './constants.ts'

type RecipeData = { id: number; name: string; ingredients: string; instructions: string }
export type { RecipeData }

// Fetch and return the recipes; no module-side mutation or export-time fetch.
export async function getRecipes(): Promise<RecipeData[]> {
    const res = await fetch(`${baseUrl}/recipes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to fetch recipes')
    const data = await res.json() as RecipeData[]
    return data
}

// Remove import-time side effects; export a type or nothing else as needed.