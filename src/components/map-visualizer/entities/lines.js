export class Lines {
    constructor(coords = [[0, 0], [0, 0]], name = 'Way') {
        this.name = name
        this.type = 'lines'
        this.coordinateSystem = 'geo'
        this.geoIndex = 0
        this.emphasis = {
            label: {
                show: true
            }
        }
        this.tooltip = {
            show: false
        }
        this.polyline = true
        this.lineStyle = {
            color: '#c46e54',
            width: 5,
            opacity: 1,
            type: 'solid'
        }
        this.effect = {
            show: true,
            period: 8,
            color: '#a10000',
            constantSpeed: 80,
            trailLength: 0,
            symbolSize: [20, 12],
            symbol:
                'path=//M 32 9 C 20.491 9 13 15.577 13 27 L 13 32 C 13 32 12 33.853 12 36 C 12 38.875 14.338 41.181 16 42 C 17.896 49.908 27 55 32 55 C 37 55 46.104 49.908 48 42 C 49.662 41.181 52 38.521484 52 35.646484 C 52 33.499484 51 32 51 32 L 51 27 C 51 13.514 41.337891 12.755859 41.337891 12.755859 C 41.337891 12.755859 38.481 9 32 9 z M 39.410156 23.566406 C 40.926156 24.924406 44.471625 30.759 44.515625 34 L 47.589844 34 C 47.805685 34.401766 48 34.945566 48 35.646484 C 48 37.852484 44.548828 39.242188 44.548828 39.242188 C 44.548828 45.865187 35.417 51 32 51 C 28.583 51 19.451172 45.470188 19.451172 39.242188 C 19.451172 39.242187 16 38.248 16 36 C 16 35.159263 16.191918 34.494993 16.40625 34 L 19.132812 34 L 21.136719 29.990234 C 29.647719 29.858234 35.607156 27.322406 39.410156 23.566406 z'.trim()

        }
        this.data = [{coords}]
    }
}