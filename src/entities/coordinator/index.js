export class Coordinator {
    constructor() {
        this.coordinates = [];
    }

    addCoordinate(name, coordinate) {
        const nameExist = this.coordinates.find(c => c.name === name);
        if (!nameExist) {
            this.coordinates.push({name, coordinates: []})
        } else {
            const coordinatorObject = this.coordinates.find(c => c.name === name);
            coordinatorObject.coordinates.push(coordinate);
        }
    }

    getCoordinates(name) {
        return this.coordinates.find(c => c.name === name).coordinates;
    }

    clearCoordinates() {
        this.coordinates = [];
    }
}