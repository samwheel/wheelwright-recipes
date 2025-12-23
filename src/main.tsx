import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import RecipePage from './components/recipe-page.tsx'
import Navbar from './components/navbar.tsx'
import NotFound from './components/not-found.tsx'
import About from './components/about.tsx'
import Sidebar from './components/sidebar.tsx'
import AddRecipe from './components/add-recipe.tsx'
import EditRecipe from './components/edit-recipe.tsx'
import './autoResizeTextareas';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <div className='main'>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<App />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                    <Route path="/recipe/:recipeName" element={<RecipePage />} />
                    <Route path="/edit-recipe/:recipeName" element={<EditRecipe />} />
                </Routes>
            </div>
            <Sidebar />
        </BrowserRouter>
    </StrictMode>,
)
