import {
    $,
    Component,
    ComponentController,
    EventEmitterFactory,
    DataOptions,
    Navigator,
    PageManager
} from "@haztivity/core";
import "jquery-ui-dist/jquery-ui";
import "jq-quiz";
@Component(
    {
        name: "HzQuestionsForPages",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions,
            Navigator,
            PageManager
        ]
    }
)
export class HzQuestionsForPagesComponent extends ComponentController {
    public static readonly NAMESPACE = "hzQuestionsForPages";
    protected static readonly PREFIX = "hz-questions-for-pages";
    protected _running:boolean = false;
    protected _$quiz;
    protected static __instance;
    protected static readonly _DEFAULTS = {
        dialog:{
            autoOpen:false,
            resizable:false,
            draggable:false,
            closeOnEscape:false
        }
    };

    constructor(_$: JQueryStatic, _EventEmitterFactory, protected _DataOptions, protected _Navigator, protected _PageManager) {
        super(_$, _EventEmitterFactory);
        HzQuestionsForPagesComponent.__instance = this;
    }

    init(options, config?) {
        this._options = $.extend(true, {}, HzQuestionsForPagesComponent._DEFAULTS, options);
        this._$element.dialog(this._options.dialog);
        this._$quiz = this._$element.find("[data-hz-questions-for-pages-quiz]");
    }
    /**
     * Asigna los handlers a eventos
     * @protected
     */
    protected _assignEvents() {

    }
    protected _parseJQuizOptions(){
        this._options
    }
    isRunning(){
        return this._running;
    }
    start(){
        if(!this._running){
            this._running = true;
            const completed = this._PageManager.getCompleted(true);
            let questions = [];
            if(completed.length > 0) {
                for (let page of completed) {
                    let pageOptions = this._options.options.pages[page];
                    if(pageOptions && pageOptions.questions) {
                        questions = questions.concat(pageOptions.questions);
                    }
                }
                if(questions.length > 0) {
                    let options = $.extend(true, {}, this._options.options.quiz);
                    options.quiz = options.quiz || {};
                    options.quiz.body = options.quiz.body || {};
                    options.quiz.body.questions = questions;
                    this._$quiz.empty();
                    this._$quiz.jqQuiz(options);
                    this._$element.dialog("open");
                }
            }
        }
    }
    stop(){
        if(this._running){
            this._running = false;
            this._$quiz.empty();
            if(this._$quiz.data("uiJqQuiz")){
                this._$quiz.jqQuiz("destroy");
            }
            this._$element.dialog("close");
        }
    }
}