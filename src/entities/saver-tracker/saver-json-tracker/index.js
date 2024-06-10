import {Saver} from "@/entities/saver-tracker/index.js";


export class SaverJsonTracker extends Saver {
    constructor() {
        super();
    }

    async save(name, data) {
        super.setData(JSON.stringify(data))
        super.setOption(name, 'json')
        await super.save()
    }
}