import React from 'react';

type RecipeProps = {
    id: number;
    name: string;
    ingredients?: string;
    instructions?: string;
};

const Recipe = React.forwardRef<HTMLDivElement, RecipeProps>(function Recipe(props, ref) {
    return (
        <div ref={ref} className='recipe'>
            <h1>{props.name}</h1>
            <h2>Ingredients:</h2>
            <ul>
                {props.ingredients?.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            <ol>
                {props.instructions?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        </div>
    );
});

export default Recipe;