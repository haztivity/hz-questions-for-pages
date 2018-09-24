/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {Service} from "@haztivity/core";
import {HzQuestionsForPagesComponent} from "./HzQuestionsForPages";
@Service(
    {
        name: "HzQuestionsForPagesService",
        dependencies:[]
    }
)
export class HzQuestionsForPagesService{
    constructor(){
        let publish = [
            "on",
            "one",
            "off"
        ];
        for (let method of publish) {
            this[method] = HzQuestionsForPagesComponent.__instance[method].bind(HzQuestionsForPagesComponent.__instance);
        }
    }
    /**
     * @see EventEmitter#on
     */
    public on(events: string, data: any, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): Navigator {
        return undefined;
    }

    public one(events: string, data: any, handler: (eventObject: JQueryEventObject) => any): Navigator {
        return undefined;
    }

    public off(events: string, handler?: (eventObject: JQueryEventObject) => any): Navigator {
        return undefined;
    }

}