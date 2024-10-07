import {Series} from "@/entities/echart/index.js";

export class Scatter extends Series {
    constructor(symbol = 'circle', name = 'Terminal') {
        super(name, 'circle', 'geo')
        this.symbol = symbol
        this.symbolSize = 20
        this.label = {
            backgroundColor: '#000',
        }
        this.itemStyle = {
            color: 'green'
        }
        this.data = []
    }

    addPoint(pointPosition = [0, 0]) {
        this.data.push(pointPosition)
    }

    getPoints() {
        return this.data
    }

    removePoint(point = [0, 0]) {
        const [x, y] = point
        this.data = this.data.filter(pointItem => {
            const [iX, iY] = pointItem
            if (x !== iX && y !== iY) return pointItem
        })
    }
}