import {
    $,
    Component,
    ComponentController,
    EventEmitterFactory,
    DataOptions
} from "@haztivity/core";
@Component(
    {
        name: "HzTimeControl",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzQuestionsForPagesComponent extends ComponentController {
    public static readonly NAMESPACE = "hzQuestionsForPages";
    protected static readonly PREFIX = "hz-questions-for-pages";
    protected static readonly _DEFAULTS = {
    };

    constructor(_$: JQueryStatic, _EventEmitterFactory, protected _DataOptions) {
        super(_$, _EventEmitterFactory);
    }

    init(options, config?) {
        this._options = $.extend(true, {}, HzQuestionsForPagesComponent._DEFAULTS, options);
    }
    /**
     * Asigna los handlers a eventos
     * @protected
     */
    protected _assignEvents() {

    }
}