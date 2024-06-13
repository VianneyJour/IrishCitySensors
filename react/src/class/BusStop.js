export class BusStop {
    name = "no"
    place = [0,0]

    constructor(name, lat, lon) {
        this.name = name
        this.place = [lon, lat]
    }
}