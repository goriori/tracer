import * as echarts from 'echarts'
import {Scatter} from "@/entities/echart/scatter/index.js";


export class Geo {
    constructor(regions) {
        this.map = null
        this.roam = true
        this.label = {
            show: false
        }
        this.emphasis = {
            itemStyle: {
                color: undefined
            },
            label: {
                show: false
            }
        }
        this.select = {
            itemStyle: {
                color: 'red',
            },
            label: {
                color: 'red'
            }
        }
        this.regions = [...regions]
    }
}


export class Series {
    constructor(name, type, system) {
        this.name = name
        this.type = type
        this.coordinateSystem = system
        this.geoIndex = 0
        this.data = []
    }
}

export class EChart {
    constructor(element) {
        this.element = element;
        this.chart = null;
        this.mapSvgText = null
        this.coordinates = [[0, 0], [0, 0]]
        this.regions = []
        this.options = {
            title: {
                text: 'Расчерчиватель',
                left: 'center',
                bottom: 10
            },
            tooltip: {},
            geo: new Geo(this.regions),
            series: []
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


    on(event, callback) {
        this.chart.on(event, callback);
    }

    off(event, callback) {
        this.chart.off(event, callback);
    }

    render() {
        console.log('render')
        this.chart.setOption(this.options);
    }

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
        this.options.series[0].data[0].coords = this.coordinates;
        this.render();
    }

    addRegion(region) {
        this.regions.push(region)
        this.options.geo.regions = this.regions
        this.render()

    }

    addSeries(entity) {
        this.options.series.push(entity)
        this.render()
    }

    deleteSeries(seriesName) {
        this.options.series = this.options.series.filter(series => series.name !== seriesName)
        this.render()
    }

    setRegions(regions) {
        this.regions = regions
        this.options.geo.regions = this.regions
        this.render()
    }

    destroy() {
        this.chart.dispose();
    }

    getCoordinates() {
        return this.coordinates;
    }
}