"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
var HzQuestionsForPages_1 = require("./HzQuestionsForPages");
var HzQuestionsForPagesService = /** @class */ (function () {
    function HzQuestionsForPagesService() {
        var publish = [
            "enableToggler",
            "disableToggler",
            "toggle",
            "start",
            "stop",
            "on",
            "one",
            "off"
        ];
        for (var _i = 0, publish_1 = publish; _i < publish_1.length; _i++) {
            var method = publish_1[_i];
            this[method] = HzQuestionsForPages_1.HzQuestionsForPagesComponent.__instance[method].bind(HzQuestionsForPages_1.HzQuestionsForPagesComponent.__instance);
        }
    }
    HzQuestionsForPagesService.prototype.start = function () {
    };
    HzQuestionsForPagesService.prototype.stop = function () {
    };
    HzQuestionsForPagesService.prototype.enableToggler = function () {
    };
    HzQuestionsForPagesService.prototype.disableToggler = function () {
    };
    HzQuestionsForPagesService.prototype.toggle = function () {
    };
    HzQuestionsForPagesService.prototype.hasInstance = function () {
        return HzQuestionsForPages_1.HzQuestionsForPagesComponent.__instance != undefined;
    };
    /**
     * @see EventEmitter#on
     */
    HzQuestionsForPagesService.prototype.on = function (events, data, handler) {
        return undefined;
    };
    HzQuestionsForPagesService.prototype.one = function (events, data, handler) {
        return undefined;
    };
    HzQuestionsForPagesService.prototype.off = function (events, handler) {
        return undefined;
    };
    HzQuestionsForPagesService = __decorate([
        core_1.Service({
            name: "HzQuestionsForPagesService",
            dependencies: []
        })
    ], HzQuestionsForPagesService);
    return HzQuestionsForPagesService;
}());
exports.HzQuestionsForPagesService = HzQuestionsForPagesService;
//# sourceMappingURL=HzQuestionsForPagesService.js.map