export class Reservation {
    _id: string;
    userId: string;
    tripId: string;
    count: number;
    selected: boolean;

    constructor(
        userId: string,
        tripId: string,
        count: number,
        selected: boolean = true,
        id?: string
    ) {
        this._id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.count = count;
        this.selected = selected;
    }
}
