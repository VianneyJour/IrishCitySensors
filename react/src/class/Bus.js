export class Bus {
    id = "no"
    place = [0, 0]
    constructor(id, lat, lon) {
        this.id = id
        this.place = [lon, lat]
    }
}