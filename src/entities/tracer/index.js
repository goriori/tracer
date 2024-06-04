import {EChart} from "@/entities/echart/index.js";

export class Tracer {
    constructor(element, map) {
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

    draw(type = 'point', coordinates = [0, 0]) {
        if (type === 'point') {
            const computedCoordinates = this.tracer.computedCoordinatesFromPixel(coordinates);
            this.tracer.addCoordinates(computedCoordinates);
            this.addHistory(type, computedCoordinates);
            return computedCoordinates;
        }
    }

    addHistory(type, coordinates) {
        this.history.push({id: Math.floor(Math.random() * 9999), type, coordinates, timestamp: new Date().getTime()});
    }

    backStep() {
        if (this.history.length > 0) {
            this.tracer.removeLastCoordinates();
        }
    }

    stop() {
        this.drawing = false;
    }
}