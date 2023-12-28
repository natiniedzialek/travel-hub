export class Order {
    id: string;
    userId: string;
    tripId: string;
    count: number;
    date: Date;

    constructor(
        id: string,
        userId: string,
        tripId: string,
        count: number,
        date: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.count = count;
        this.date = date;
    }
}