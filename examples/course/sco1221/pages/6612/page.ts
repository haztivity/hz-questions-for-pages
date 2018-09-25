/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-pug";
import {HzTooltipResource} from "@haztivity/hz-tooltip";
import {PageFactory, PageRegister, PageController, NavigatorService} from "@haztivity/core";
import  template from "./page.pug";
import {HzQuestionsForPagesService} from "../../../components/hz-questions-for-pages/HzQuestionsForPagesService";

export let page: PageRegister = PageFactory.createPage(
    {
        title: "Manipulation",
        name: "6612",
        resources: [
            HzTooltipResource
        ],
        template: template
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
        const service = pageController.InjectorService.get(HzQuestionsForPagesService);
        debugger;
        service.start();
    }
);