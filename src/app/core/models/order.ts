export class Order {
    _id?: string;
    userId: string;
    tripId: string;
    count: number;
    date: Date;

    constructor(
        userId: string,
        tripId: string,
        count: number,
        date: Date,
        id?: string
    ) {
        this._id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.count = count;
        this.date = date;
    }
}
