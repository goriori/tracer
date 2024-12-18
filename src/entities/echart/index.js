import * as echarts from 'echarts'
import {Scatter} from "@/entities/echart/scatter/index.js";

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

            series: []
        };

    }

    init() {
        this.chart = echarts.init(this.element, null, {renderer: 'svg'});
        this.chart.is
    }

    registerMap(name, map) {
        this.options.geo.map = name;
        this.mapSvgText = map
        echarts.registerMap(name, {svg: this.mapSvgText});
    }

    computedCoordinatesFromPixel(coordinates = [0, 0]) {
        return this.chart.convertFromPixel('geo', coordinates);
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

    addSeries(entity) {
        this.options.series.push(entity)
        this.render()
    }

    deleteSeries(seriesName) {
        console.log(this.options.series)
        this.options.series = this.options.series.filter(series => series.name !== seriesName)
        console.log(this.options.series)
        console.log(this.chart)
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