export class Region {
    constructor(name) {
        this.name = name
        this.itemStyle = {
            color: 'red',
            areaColor:'red'
        }
        this.data = {
            id: Math.floor(Math.random() * 1000),
            routes: [],
        }
    }
}