import React from 'react';

type RecipeProps = {
    name: string;
    ingredients?: string[];
    instructions?: string[];
};

const Recipe = React.forwardRef<HTMLDivElement, RecipeProps>(function Recipe(props, ref) {
    return (
        <div ref={ref} className='recipe'>
            <h1>{props.name}</h1>
            <h2>Ingredients:</h2>
            <ul>
                {props.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            <ol>
                {props.instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
});

export default Recipe;