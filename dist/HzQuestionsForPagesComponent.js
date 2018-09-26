"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@haztivity/core");
require("jquery-ui-dist/jquery-ui");
require("jq-quiz");
var HzQuestionsForPagesComponent = /** @class */ (function (_super) {
    __extends(HzQuestionsForPagesComponent, _super);
    function HzQuestionsForPagesComponent(_$, _EventEmitterFactory, _DataOptions, _Navigator, _PageManager) {
        var _this = _super.call(this, _$, _EventEmitterFactory) || this;
        _this._DataOptions = _DataOptions;
        _this._Navigator = _Navigator;
        _this._PageManager = _PageManager;
        _this._running = false;
        HzQuestionsForPagesComponent_1.__instance = _this;
        return _this;
    }
    HzQuestionsForPagesComponent_1 = HzQuestionsForPagesComponent;
    HzQuestionsForPagesComponent.prototype.init = function (options, config) {
        this._options = core_1.$.extend(true, {}, HzQuestionsForPagesComponent_1._DEFAULTS, options);
        this._$element.dialog(this._options.dialog);
        this._$quiz = this._$element.find("[data-hz-questions-for-pages-quiz]");
        this._$toggler = this._$("[data-hz-questions-for-pages-toggler]").addClass(HzQuestionsForPagesComponent_1.CLASS_TOGGLER);
        this._assignEvents();
    };
    HzQuestionsForPagesComponent.prototype._onQuestionChange = function (e, quiz, questionId, optionId, optionValue, questionRuntime) {
        var instance = e.data.instance;
        instance._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_OPTION_CHANGE, [quiz, questionId, optionId, optionValue, questionRuntime]);
    };
    HzQuestionsForPagesComponent.prototype._onQuizEnd = function (e, quiz, calification) {
        var instance = e.data.instance;
        instance._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_QUIZ_END, [quiz, calification]);
    };
    HzQuestionsForPagesComponent.prototype._onDialogClose = function (e) {
        e.data.instance.stop();
    };
    /**
     * Asigna los handlers a eventos
     * @protected
     */
    HzQuestionsForPagesComponent.prototype._assignEvents = function () {
        this._$quiz.on("jqQuiz:questionChange", { instance: this }, this._onQuestionChange);
        this._$quiz.on("jqQuiz:end", { instance: this }, this._onQuizEnd);
        this._$element.on("dialogclose", { instance: this }, this._onDialogClose);
        this._Navigator.on(core_1.Navigator.ON_CHANGE_PAGE_START + "." + HzQuestionsForPagesComponent_1.NAMESPACE, { instance: this }, this._onPageChangeStart);
        this._eventEmitter.globalEmitter.on(core_1.PageController.ON_COMPLETE_CHANGE + "." + HzQuestionsForPagesComponent_1.NAMESPACE, { instance: this }, this._onPageCompleted);
        if (this._$toggler) {
            var that_1 = this;
            this._$toggler.on("click", function () {
                that_1.toggle();
            });
        }
    };
    HzQuestionsForPagesComponent.prototype._onPageChangeStart = function (e) {
        e.data.instance.stop();
        e.data.instance.disableToggler();
    };
    HzQuestionsForPagesComponent.prototype._onPageCompleted = function (e) {
        e.data.instance.enableToggler();
    };
    HzQuestionsForPagesComponent.prototype.isRunning = function () {
        return this._running;
    };
    HzQuestionsForPagesComponent.prototype.start = function () {
        if (!this._running) {
            this._running = true;
            var completed = this._PageManager.getCompleted(true);
            var questions = [];
            if (completed.length > 0) {
                for (var _i = 0, completed_1 = completed; _i < completed_1.length; _i++) {
                    var page = completed_1[_i];
                    var pageOptions = this._options.options.pages[page];
                    if (pageOptions && pageOptions.questions) {
                        questions = questions.concat(pageOptions.questions);
                    }
                }
                if (questions.length > 0) {
                    var options = core_1.$.extend(true, {}, this._options.options.quiz);
                    options.quiz = options.quiz || {};
                    options.quiz.body = options.quiz.body || {};
                    options.quiz.body.questions = questions;
                    this._$quiz.empty();
                    this._$quiz.jqQuiz(options);
                    this._$element.dialog("open");
                    this._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_START, [this]);
                }
            }
        }
    };
    HzQuestionsForPagesComponent.prototype.stop = function () {
        if (this._running) {
            this._running = false;
            this._$quiz.empty();
            if (this._$quiz.data("uiJqQuiz")) {
                this._$quiz.jqQuiz("destroy");
                this._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_END, [this]);
            }
            if (this._$element.dialog("isOpen")) {
                this._$element.dialog("close");
            }
        }
    };
    HzQuestionsForPagesComponent.prototype.toggle = function () {
        if (this.isRunning()) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    HzQuestionsForPagesComponent.prototype.enableToggler = function () {
        if (this._togglerDisabled) {
            this._togglerDisabled = false;
            this._$toggler.prop("disabled", false);
            this._$toggler.removeClass(HzQuestionsForPagesComponent_1.CLASS_TOGGLER_DISABLED);
            this._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_TOGGLER_ENABLED, [this]);
        }
    };
    HzQuestionsForPagesComponent.prototype.disableToggler = function () {
        if (!this._togglerDisabled) {
            this._togglerDisabled = true;
            this._$toggler.prop("disabled", true);
            this._$toggler.addClass(HzQuestionsForPagesComponent_1.CLASS_TOGGLER_DISABLED);
            this._eventEmitter.trigger(HzQuestionsForPagesComponent_1.ON_TOGGLER_DISABLED, [this]);
        }
    };
    var HzQuestionsForPagesComponent_1;
    HzQuestionsForPagesComponent.NAMESPACE = "hzQuestionsForPages";
    HzQuestionsForPagesComponent.PREFIX = "hz-questions-for-pages";
    HzQuestionsForPagesComponent.ON_START = HzQuestionsForPagesComponent_1.NAMESPACE + ":start";
    HzQuestionsForPagesComponent.ON_END = HzQuestionsForPagesComponent_1.NAMESPACE + ":end";
    HzQuestionsForPagesComponent.ON_OPTION_CHANGE = HzQuestionsForPagesComponent_1.NAMESPACE + ":optionchange";
    HzQuestionsForPagesComponent.ON_QUIZ_END = HzQuestionsForPagesComponent_1.NAMESPACE + ":quizend";
    HzQuestionsForPagesComponent.ON_TOGGLER_ENABLED = HzQuestionsForPagesComponent_1.NAMESPACE + ":togglerenabled";
    HzQuestionsForPagesComponent.ON_TOGGLER_DISABLED = HzQuestionsForPagesComponent_1.NAMESPACE + ":togglerdisabled";
    HzQuestionsForPagesComponent.CLASS_TOGGLER = HzQuestionsForPagesComponent_1.PREFIX + "-toggler";
    HzQuestionsForPagesComponent.CLASS_TOGGLER_DISABLED = HzQuestionsForPagesComponent_1.CLASS_TOGGLER + "--disabled";
    HzQuestionsForPagesComponent._DEFAULTS = {
        dialog: {
            autoOpen: false,
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            dialogClass: "hz-questions-for-pages",
            position: { my: "center", at: "center", of: window },
            modal: true,
            show: "fade",
            hide: "fade"
        }
    };
    HzQuestionsForPagesComponent = HzQuestionsForPagesComponent_1 = __decorate([
        core_1.Component({
            name: "HzQuestionsForPages",
            dependencies: [
                core_1.$,
                core_1.EventEmitterFactory,
                core_1.DataOptions,
                core_1.Navigator,
                core_1.PageManager
            ]
        })
    ], HzQuestionsForPagesComponent);
    return HzQuestionsForPagesComponent;
}(core_1.ComponentController));
exports.HzQuestionsForPagesComponent = HzQuestionsForPagesComponent;
//# sourceMappingURL=HzQuestionsForPagesComponent.js.map