
export class Trip {
    public name: string;
    public destination: string;
    public startDate: Date;
    public endDate: Date;
    public unitPrice: number;
    public maxParticipants: number;
    public description: string;
    public image: string;

    constructor(
        name: string,
        destination: string,
        startDate: Date,
        endDate: Date,
        unitPrice: number,
        maxPlaces: number,
        description: string,
        image: string
    ) {
        this.name = name;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.unitPrice = unitPrice;
        this.maxParticipants = maxPlaces;
        this.description = description;
        this.image = image;
    }
}