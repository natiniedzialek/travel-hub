export class Review {
    _id: string;
    nick: string;
    tripId: string;
    title: string;
    content: string;
    rating: number;
    purchaseDate?: Date;

    constructor(
        nick: string,
        tripId: string,
        title: string,
        content: string,
        rating: number,
        purchaseDate?: Date,
        id?: string
    ) {
        this._id = id;
        this.nick = nick;
        this.tripId = tripId;
        this.title = title;
        this.content = content;
        this.rating = rating;
        this.purchaseDate = purchaseDate;
    }
}
