//---------------- interface for food being consumed --------------------//

export interface Food{
    id: number;
    date: string;
    name: string;
    calories: number;
    checked ?: boolean;
}
