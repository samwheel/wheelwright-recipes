import { NavLink } from "react-router"

export default function Sidebar() {
    return (
        <aside>
            <div className="sticky-content">
                <h2>Help us out!</h2>
                <p>
                    While there isn't a donate option (yet), you can still support us by sharing our app with friends and family. 
                    Another way to support us is by creating your own recipes and adding them to our website, helping everyone out!
                </p>
                <p>
                    Start creating your own recipies by clicking on the "Add Recipe" link in the navigation bar.
                    Or, if that's too much effort, just click <NavLink to="/add-recipe">Add Recipe</NavLink> right here!
                </p>
            </div>
        </aside>
    )
}