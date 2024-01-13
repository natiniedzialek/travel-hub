export class Trip {
    public id: string;
    public name: string;
    public destination: string;
    public startDate: Date;
    public endDate: Date;
    public unitPrice: number;
    public placesLeft: number;
    public description: string;
    public images: string[];
    public mapSrc: string;

    constructor(
        name: string = '',
        destination: string = '',
        startDate: Date = new Date(),
        endDate: Date = new Date(),
        unitPrice: number = 0,
        placesLeft: number = 0,
        description: string = '',
        images: string[] = [],
        mapSrc: string = ''
    ) {
        this.name = name;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.unitPrice = unitPrice;
        this.placesLeft = placesLeft;
        this.description = description;
        this.images = images;
        this.mapSrc = mapSrc;
    }
}
