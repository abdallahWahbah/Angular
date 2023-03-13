export class Ingredient
{
    public name: string;
    public amount: number;

    constructor(name: string, amount: number)
    {
        this.name = name;
        this.amount = amount;
    }
}

// you can simplify the code above using TS

// export class Ingredient
// {
//     constructor(public name: string, public amount: number){}
// }