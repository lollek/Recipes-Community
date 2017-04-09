export class RecipeModel {

    constructor(
        public id: number,
        public title: string,
        public instructions: string,
        public author?: string
    ) {
    }

}
