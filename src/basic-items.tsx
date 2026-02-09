import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import About from "./components/about";
import AddRecipe from "./components/add-recipe";
import EditRecipe from "./components/edit-recipe";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import RecipePage from "./components/recipe-page";
import Sidebar from "./components/sidebar";
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'

export default function BasicItems() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light'
        }
    })
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Navbar />
                <div className='main'>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<App />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/add-recipe" element={<AddRecipe />} />
                        <Route path="/recipe/:recipeId" element={<RecipePage />} />
                        <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
                    </Routes>
                </div>
                <Sidebar />
            </ThemeProvider>
        </BrowserRouter>
    )
}