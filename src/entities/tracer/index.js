export class Tracer {

    constructor() {
        this.TYPES_DRAWING = ['point']
        this.history = [];
        this.drawing = false;
        this.scattering = false
    }

    startScatter() {
        this.scattering = true
    }

    startDraw() {
        this.drawing = true;
    }

    draw(type = this.TYPES_DRAWING[0], object, coordinates = [0, 0]) {
        switch (type) {
            case this.TYPES_DRAWING[0]:
                this.addHistory(type, object, coordinates);
                return coordinates;
            default:
                return [];
        }
    }

    addHistory(type, object, coordinates) {
        this.history.push({
            id: Math.floor(Math.random() * 9999),
            type,
            object,
            coordinates,
            timestamp: new Date().getTime()
        });
    }

    backStep() {
        if (this.history.length > 0) {
            this.history.pop()
            return this.history[this.history.length - 1]
        }
    }

    getHistory() {
        return this.history
    }

    clear() {
        this.history = []
        this.drawing = false
    }

    stopDraw() {
        this.drawing = false;
    }

    stopScatter() {
        this.scattering = false
    }
}