export class Reservation {
    id: string;
    userId: string;
    tripId: string;
    count: number;

    constructor(
        userId: string,
        tripId: string,
        count: number,
        id?: string
    ) {
        this.id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.count = count;
    }
}