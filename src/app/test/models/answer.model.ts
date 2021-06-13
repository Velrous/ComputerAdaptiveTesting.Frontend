export class Answer {
    Id: number;
    Name: string;
    IsRight: boolean;

    constructor (
        id: number,
        name: string,
        isRight: boolean
    ) {
        this.Id = id;
        this.Name = name;
        this.IsRight = isRight;
    }
}