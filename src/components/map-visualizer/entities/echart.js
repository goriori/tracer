import * as echarts from 'echarts'

export class EChart {
    constructor(element) {
        this.element = element;
        this.chart = null;
        this.mapSvgText = null
        this.coordinates = [[0, 0], [0, 0]]
        this.regions = []
        this.lineStyle = {
            color: '#c46e54',
            width: 5,
            opacity: 1,
            type: 'line'
        }
        this.options = {
            title: {
                text: 'Расчерчиватель',
                left: 'center',
                bottom: 10
            },
            geo: {
                map: null,
                roam: true,
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        color: undefined
                    },
                    label: {
                        show: false
                    }
                },
                select: {
                    itemStyle: {
                        color: 'red',
                    },
                    label: {
                        color: 'red'
                    }
                },
                regions: [...this.regions]
            },
            series: [
                {
                    name: 'Tracer',
                    type: 'lines',
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    polyline: true,
                    lineStyle: {...this.lineStyle},
                    effect: {
                        show: true,
                        period: 8,
                        color: '#a10000',
                        constantSpeed: 80,
                        trailLength: 0,
                        symbolSize: [20, 12],
                        symbol:
                            'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
                    },
                    data: [{coords: this.coordinates}]
                }
            ]
        };

    }

    init() {
        this.chart = echarts.init(this.element, null, {renderer: 'svg'});
    }

    registerMap(name, map) {
        this.options.geo.map = name;
        this.mapSvgText = map
        echarts.registerMap(name, {svg: this.mapSvgText});
    }

    computedCoordinatesFromPixel(coordinates = [0, 0]) {
        return this.chart.convertFromPixel('geo', coordinates);
    }

    addCoordinates(coordinates) {
        this.coordinates.push(coordinates);
        this.render();
    }

    removeLastCoordinates() {
        this.coordinates.pop();
        this.render();
    }

    on(event, callback) {
        this.chart.on(event, callback);
    }

    off(event, callback) {
        this.chart.off(event, callback);
    }

    render() {
        console.log('render')
        console.log(this.options)
        this.chart.setOption(this.options);
    }

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
        this.options.series[0].data[0].coords = this.coordinates;
        this.render();
    }

    addRegion(region) {
        console.log(this.regions)
        this.regions.push(region)
        this.options.geo.regions = this.regions
        this.render()

    }

    setRegions(regions) {
        this.regions = regions
        this.options.geo.regions = this.regions
        this.render()
    }

    changeBrush(brush) {
        this.lineStyle.type = brush
        this.options.series[0].lineStyle = this.lineStyle
        this.render()
    }

    changeBrushColor(color) {
        this.lineStyle.color = color
        this.options.series[0].lineStyle = this.lineStyle
        this.render()
    }

    destroy() {
        this.chart.dispose();
    }

    getCoordinates() {
        return this.coordinates;
    }
}