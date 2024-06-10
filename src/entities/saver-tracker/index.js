export class Saver {
    constructor() {
        this.data = null
        this.options = {
            name: 'map',
            extend: 'json',
            type: 'text/plain'
        }
    }

    setOption(name, extend) {
        this.options.name = name
        this.options.extend = extend
    }

    setData(data) {
        this.data = data
    }

    async save() {
        const file = new Blob([this.data], this.options)
        const url = window.URL.createObjectURL(file)
        const downloadLink = document.createElement('a')
        downloadLink.download = `${this.options.name}.${this.options.extend}`
        downloadLink.href = url
        downloadLink.click()
        downloadLink.remove()
    }
}
