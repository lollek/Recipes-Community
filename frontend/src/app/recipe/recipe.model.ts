import {Ingredient} from './ingredient.model';

export class RecipeRef {

    constructor(
        public id: number,
        public title: string,
        public author: string,
    ) {
    }

}

export class Recipe extends RecipeRef {

    constructor(
        id: number,
        title: string,
        author: string,
        public instructions: string,
        public numPersons: number,
        public time: number,
        public ingredients: Ingredient[]
    ) {
        super(id, title, author);
    }

}
