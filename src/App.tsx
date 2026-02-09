import './App.css'
import { useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import RecipeList from './components/recipe-list'
import { Search } from '@mui/icons-material'

function App() {
    const [searchText, setSearchText] = useState("")

    

    return (
        <div className="app">
            <h1>Wheelwright Recipes</h1>
            <TextField 
                label="Search Recipes"
                size='small'
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search/>
                            </InputAdornment>
                        )
                    }
                }}
            />
            <RecipeList searchQuery={searchText}/>
        </div>
    )
}

export default App
