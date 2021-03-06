/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-pug";
import {PageFactory, PageRegister, PageController} from "@haztivity/core";
import template from "./page.pug";
import {HzQuestionsForPagesService} from "../../../components/hz-questions-for-pages/HzQuestionsForPages";
export let page: PageRegister = PageFactory.createPage(
    {
        title: "Start to use",
        name: "6611",
        resources: [
        ],
        template: template,
        timeControl:{
            weight:2
        }
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);