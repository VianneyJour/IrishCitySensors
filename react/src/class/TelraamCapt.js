export class TelraamCapt {
    id = "no"
    place = []
    pedestrian = 0
    bike = 0
    car = 0
    lorry = 0
    constructor(id, place, pedestrian, bike, car, lorry) {
        this.id = id
        this.place = place
        this.pedestrian = pedestrian
        this.bike = bike
        this.car = car
        this.lorry = lorry
    }
    setdata(pedestrian, bike, car, lorry) {
        this.pedestrian = pedestrian
        this.bike = bike
        this.car = car
        this.lorry = lorry
    }
}