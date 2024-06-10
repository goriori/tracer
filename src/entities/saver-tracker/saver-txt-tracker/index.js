import {Saver} from "@/entities/saver-tracker/index.js";


export class SaverTxtTracker extends Saver {
    constructor() {
        super();
    }
    async save(name) {
        super.setOption(name, 'txt')
        await super.save()
    }
}