export class MapSVG {
    constructor(name, map) {
        this.name = name
        this.mapSvgText = new XMLSerializer().serializeToString(map)
        this.mapSvgDOM = this.convertMapToDomElement()
    }

    convertMapToDomElement() {
        const parser = new DOMParser()
        const element = parser.parseFromString(this.mapSvgText, 'image/svg+xml')
        return element.documentElement
    }

}