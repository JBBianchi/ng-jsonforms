import { __extends } from "tslib";
/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { and, categorizationHasCategory, defaultJsonFormsI18nState, deriveLabelForUISchemaElement, getAjv, isVisible, mapStateToLayoutProps, rankWith, uiTypeIs, } from '@jsonforms/core';
import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer, } from '@jsonforms/angular';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/tabs";
import * as i4 from "@angular/flex-layout/extended";
var CategorizationTabLayoutRenderer = /** @class */ (function (_super) {
    __extends(CategorizationTabLayoutRenderer, _super);
    function CategorizationTabLayoutRenderer(jsonFormsService) {
        var _this = _super.call(this) || this;
        _this.jsonFormsService = jsonFormsService;
        return _this;
    }
    CategorizationTabLayoutRenderer.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.jsonFormsService.$state.subscribe({
            next: function (state) {
                var props = mapStateToLayoutProps(state, _this.getOwnProps());
                _this.hidden = !props.visible;
                _this.visibleCategories = _this.uischema.elements.filter(function (category) {
                    return isVisible(category, props.data, undefined, getAjv(state));
                });
                _this.categoryLabels = _this.visibleCategories.map(function (element) {
                    var _a, _b;
                    return deriveLabelForUISchemaElement(element, (_b = (_a = state.jsonforms.i18n) === null || _a === void 0 ? void 0 : _a.translate) !== null && _b !== void 0 ? _b : defaultJsonFormsI18nState.translate);
                });
            },
        });
    };
    CategorizationTabLayoutRenderer.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CategorizationTabLayoutRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CategorizationTabLayoutRenderer, deps: [{ token: i1.JsonFormsAngularService }], target: i0.ɵɵFactoryTarget.Component });
    CategorizationTabLayoutRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CategorizationTabLayoutRenderer, selector: "jsonforms-categorization-layout", usesInheritance: true, ngImport: i0, template: "\n    <mat-tab-group dynamicHeight=\"true\" [fxHide]=\"hidden\">\n      <mat-tab\n        *ngFor=\"let category of visibleCategories; let i = index\"\n        [label]=\"categoryLabels[i]\"\n      >\n        <div *ngFor=\"let element of category.elements\">\n          <jsonforms-outlet\n            [uischema]=\"element\"\n            [path]=\"path\"\n            [schema]=\"schema\"\n          ></jsonforms-outlet>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.JsonFormsOutlet, selector: "jsonforms-outlet", inputs: ["renderProps"] }, { kind: "component", type: i3.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i3.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "directive", type: i4.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }] });
    return CategorizationTabLayoutRenderer;
}(JsonFormsBaseRenderer));
export { CategorizationTabLayoutRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CategorizationTabLayoutRenderer, decorators: [{
            type: Component,
            args: [{
                    selector: 'jsonforms-categorization-layout',
                    template: "\n    <mat-tab-group dynamicHeight=\"true\" [fxHide]=\"hidden\">\n      <mat-tab\n        *ngFor=\"let category of visibleCategories; let i = index\"\n        [label]=\"categoryLabels[i]\"\n      >\n        <div *ngFor=\"let element of category.elements\">\n          <jsonforms-outlet\n            [uischema]=\"element\"\n            [path]=\"path\"\n            [schema]=\"schema\"\n          ></jsonforms-outlet>\n        </div>\n      </mat-tab>\n    </mat-tab-group>\n  ",
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }]; } });
export var categorizationTester = rankWith(2, and(uiTypeIs('Categorization'), categorizationHasCategory));
//# sourceMappingURL=categorization-layout.renderer.js.map