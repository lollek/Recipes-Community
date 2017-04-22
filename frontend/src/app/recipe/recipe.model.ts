import {Ingredient} from './ingredient.model';
import {User} from "../auth/user.model";

export class RecipeRef {

    constructor(
        public id: number,
        public title: string,
        public author: User,
    ) {
    }

}

export class Recipe extends RecipeRef {

    constructor(
        id: number,
        title: string,
        author: User,
        public instructions: string,
        public numPersons: number,
        public time: number,
        public ingredients: Ingredient[]
    ) {
        super(id, title, author);
    }

}
