import {Saver} from "@/entities/saver-tracker/index.js";


export class SaverSvgTracker extends Saver {
    constructor() {
        super();
    }

    async save(svg) {
        super.setData(svg)
        super.setOption('map','svg')
        await super.save();
    }
}