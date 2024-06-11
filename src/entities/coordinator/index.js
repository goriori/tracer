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
        const object = this.coordinates.find(object => object.name === name)
        const coordinates = object.coordinates
        const [x, y] = coordinates[0]
        object.coordinates = [[x, y], [x + 1, y + 1]]
    }

    clearCoordinates() {
        this.coordinates = [];
    }
}