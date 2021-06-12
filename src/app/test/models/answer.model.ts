export class Answer {
    Name: string;
    IsRight: boolean;

    constructor (
        name: string,
        isRight: boolean
    ) {
        this.Name = name;
        this.IsRight = isRight;
    }
}