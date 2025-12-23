import { NavLink } from 'react-router'

export default function Navbar() {
    return (
        <nav>
            <div className="sticky-content">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/add-recipe">Add Recipe</NavLink>
            </div>
        </nav>
    )
}