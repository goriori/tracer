import {EChart} from "@/entities/echart/index.js";

export class Tracer {
    constructor(element, map) {
        this.TYPES_DRAWING = ['point']
        this.tracer = new EChart(element);
        this.history = [];
        this.mapSvg = map;
        this.drawing = false;
    }

    init() {
        this.tracer.init()
        this.tracer.registerMap(this.mapSvg.name, this.mapSvg.mapSvg);
        this.tracer.render()
    }

    start() {
        this.drawing = true;
    }

    draw(type = this.TYPES_DRAWING[0], coordinates = [0, 0]) {
        switch (type) {
            case this.TYPES_DRAWING[0]:
                this.tracer.addCoordinates(coordinates);
                this.addHistory(type, coordinates);
                return coordinates;
            default:
                return [];
        }
    }

    convertCoordinates(coordinates) {
        return this.tracer.computedCoordinatesFromPixel(coordinates);
    }

    addHistory(type, coordinates) {
        this.history.push({id: Math.floor(Math.random() * 9999), type, coordinates, timestamp: new Date().getTime()});
    }

    backStep() {
        if (this.history.length > 0) {
            this.tracer.removeLastCoordinates();
        }
    }

    on(event, callback) {
        this.tracer.on(event, callback)
    }

    off(event, callback) {
        this.tracer.off(event, callback)
    }

    setDraw(coordinates) {
        this.tracer.setCoordinates(coordinates);
    }

    clear()  {
        this.tracer.setCoordinates([[10,10], [10,10]]);
    }
    stop() {
        this.drawing = false;
    }
}