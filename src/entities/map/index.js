export class MapSVG {
    constructor(name, map) {
        this.name = name
        this.mapSvgText = map
        this.mapSvgDOM = this.convertMapToDomElement()
    }

    convertMapToDomElement() {
        const parser = new DOMParser()
        const element = parser.parseFromString(this.mapSvg, 'image/svg+xml')
        return element.documentElement
    }

}