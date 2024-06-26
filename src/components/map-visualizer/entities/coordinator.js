export class Coordinator {
    constructor() {
        this.coordinates = [];
    }

    addCoordinate(name, coordinate) {
        const nameExist = this.coordinates.find(c => c.name === name);
        if (!nameExist) {
            this.coordinates.push({name, option: {color: '#c46e54'}, coordinates: [[...coordinate]]})
        } else {
            const coordinatorObject = this.coordinates.find(c => c.name === name);
            coordinatorObject.coordinates.push(coordinate);
        }
    }

    setOptionCoordinate(name, option) {
        const coordinateObject = this.coordinates.find(coordinate => coordinate.name === name)
        if (!coordinateObject) return
        Object.assign(coordinateObject.option, option)
    }

    getCoordinateOption(name) {
        const coordinateObject = this.coordinates.find(coordinate => coordinate.name === name)
        if (!coordinateObject) return
        return coordinateObject.option
    }

    getCoordinates(name) {
        const coordinateObject = this.coordinates.find(object => object.name === name)
        if (!coordinateObject) return null
        return this.coordinates.find(c => c.name === name).coordinates;
    }

    getCoordinateAll() {
        console.log(this.coordinates)
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