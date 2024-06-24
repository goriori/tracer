export class Brush {
    constructor() {
        this.brushTypes = ['dotted', 'dashed', 'solid']
        this.color = '#000'
        this.brush = this.brushTypes[0]
    }

    changeBrush(brush = this.brushTypes[0]) {
        console.log(brush)
        if (!this.brushTypes.includes(brush)) return false
        this.brush = brush
    }

    changeColor(color) {
        this.color = color
    }

    getBrush() {
        return this.brush
    }

    getColor() {
        return this.color
    }
}
