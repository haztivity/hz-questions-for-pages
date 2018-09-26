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
    public static readonly ON_START = `${HzQuestionsForPagesComponent.NAMESPACE}:start`;
    public static readonly ON_END = `${HzQuestionsForPagesComponent.NAMESPACE}:end`;
    public static readonly ON_OPTION_CHANGE = `${HzQuestionsForPagesComponent.NAMESPACE}:optionchange`;
    public static readonly ON_QUIZ_END = `${HzQuestionsForPagesComponent.NAMESPACE}:quizend`;
    protected _running:boolean = false;
    protected _$quiz;
    protected static __instance;
    protected _$toggler;
    protected static readonly _DEFAULTS = {
        dialog:{
            autoOpen:false,
            resizable:false,
            draggable:false,
            closeOnEscape:false,
            dialogClass:"hz-questions-for-pages",
            position:{my:"center",at:"center",of:window},
            modal:true
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
        this._$toggler = this._$(["data-hz-questions-for-pages-toggler"]);
        this._assignEvents();
    }
    protected _onQuestionChange(e,quiz, questionId, optionId,optionValue,questionRuntime){
        let instance = e.data.instance;
        instance._eventEmitter.trigger(HzQuestionsForPagesComponent.ON_OPTION_CHANGE,[quiz, questionId, optionId,optionValue,questionRuntime]);
    }
    protected _onQuizEnd(e,quiz,calification){
        let instance = e.data.instance;
        instance._eventEmitter.trigger(HzQuestionsForPagesComponent.ON_QUIZ_END,[quiz, calification]);
    }
    protected _onDialogClose(e){
        e.data.instance.stop();
    }
    /**
     * Asigna los handlers a eventos
     * @protected
     */
    protected _assignEvents() {
        this._$quiz.on("jqQuiz:questionChange",{instance:this},this._onQuestionChange);
        this._$quiz.on("jqQuiz:end",{instance:this},this._onQuizEnd);
        this._$element.on("dialogclose",{instance:this},this._onDialogClose);
        this._Navigator.on(Navigator.ON_CHANGE_PAGE_START+"."+HzQuestionsForPagesComponent.NAMESPACE,{instance:this},this._onPageChangeStart);
        if(this._$toggler){
            let that = this;
            this._$toggler.on("click",function(){
                that.toggle();
            });
        }
    }
    protected _onPageChangeStart(e){
        e.data.instance.stop();
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
                    this._eventEmitter.trigger(HzQuestionsForPagesComponent.ON_START,[this]);
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
                this._eventEmitter.trigger(HzQuestionsForPagesComponent.ON_END,[this]);
            }
            if(this._$element.dialog("isOpen")) {
                this._$element.dialog("close");
            }
        }
    }
    toggle(){
        if(this.isRunning()){
            this.stop();
        }else{
            this.start();
        }
    }
}