import { AddCircle, Home, Info } from '@mui/icons-material'
import { NavLink } from 'react-router'

export default function Navbar() {
    return (
        <nav>
            <div className="sticky-content">
                <NavLink to="/"><Home fontSize='large'/></NavLink>
                <NavLink to="/about"><Info fontSize='large'/></NavLink>
                <NavLink to="/add-recipe"><AddCircle fontSize='large'/></NavLink>
            </div>
        </nav>
    )
}