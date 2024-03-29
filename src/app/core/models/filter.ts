export class Filter {
    destination: string[];
    minPrice: number;
    maxPrice: number;
    startDate: Date;
    endDate: Date;
    minRating: number;

    constructor(
        destination: string[] = [],
        minPrice: number = 0,
        maxPrice: number = Number.POSITIVE_INFINITY,
        startDate: Date = new Date(0),
        endDate: Date = new Date(8640000000000000),
        minRating: number = 0
    ) {
        this.destination = destination;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minRating = minRating;
    }
}
