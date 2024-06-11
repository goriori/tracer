export class Coordinator {
    constructor() {
        this.coordinates = [];
    }

    addCoordinate(name, coordinate) {
        const nameExist = this.coordinates.find(c => c.name === name);
        if (!nameExist) {
            this.coordinates.push({name, coordinates: [[...coordinate]]})
        } else {
            const coordinatorObject = this.coordinates.find(c => c.name === name);
            coordinatorObject.coordinates.push(coordinate);
        }
    }

    getCoordinates(name) {
        const nameObject = this.coordinates.find(object => object.name === name)
        if (!nameObject) return null
        return this.coordinates.find(c => c.name === name).coordinates;
    }

    getCoordinateAll() {
        return this.coordinates
    }

    deleteCoordinatesObject(name) {
        this.coordinates.find(object => object.name === name).coordinates = []
    }

    clearCoordinates() {
        this.coordinates = [];
    }
}