import { __assign, __extends } from "tslib";
/*
  The MIT License

  Copyright (c) 2017-2020 EclipseSource Munich
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
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { JsonFormsAngularService, JsonFormsAbstractControl, } from '@jsonforms/angular';
import { createDefaultValue, findUISchema, isObjectArrayWithNesting, mapDispatchToArrayControlProps, mapStateToArrayLayoutProps, Paths, rankWith, setReadonly, unsetReadonly, } from '@jsonforms/core';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/flex-layout/flex";
import * as i4 from "@angular/flex-layout/extended";
import * as i5 from "@angular/material/card";
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/icon";
import * as i8 from "@angular/material/tooltip";
import * as i9 from "@angular/material/badge";
var ArrayLayoutRenderer = /** @class */ (function (_super) {
    __extends(ArrayLayoutRenderer, _super);
    function ArrayLayoutRenderer(jsonFormsService) {
        return _super.call(this, jsonFormsService) || this;
    }
    ArrayLayoutRenderer.prototype.mapToProps = function (state) {
        var props = mapStateToArrayLayoutProps(state, this.getOwnProps());
        return __assign({}, props);
    };
    ArrayLayoutRenderer.prototype.remove = function (index) {
        this.removeItems(this.propsPath, [index])();
    };
    ArrayLayoutRenderer.prototype.add = function () {
        this.addItem(this.propsPath, createDefaultValue(this.scopedSchema, this.rootSchema))();
    };
    ArrayLayoutRenderer.prototype.up = function (index) {
        this.moveItemUp(this.propsPath, index)();
    };
    ArrayLayoutRenderer.prototype.down = function (index) {
        this.moveItemDown(this.propsPath, index)();
    };
    ArrayLayoutRenderer.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var _a = mapDispatchToArrayControlProps(this.jsonFormsService.updateCore.bind(this.jsonFormsService)), addItem = _a.addItem, removeItems = _a.removeItems, moveUp = _a.moveUp, moveDown = _a.moveDown;
        this.addItem = addItem;
        this.moveItemUp = moveUp;
        this.moveItemDown = moveDown;
        this.removeItems = removeItems;
    };
    ArrayLayoutRenderer.prototype.mapAdditionalProps = function (props) {
        this.translations = props.translations;
        this.noData = !props.data || props.data === 0;
        this.uischemas = props.uischemas;
    };
    ArrayLayoutRenderer.prototype.getProps = function (index) {
        var uischema = findUISchema(this.uischemas, this.scopedSchema, this.uischema.scope, this.propsPath, undefined, this.uischema, this.rootSchema);
        if (this.isEnabled()) {
            unsetReadonly(uischema);
        }
        else {
            setReadonly(uischema);
        }
        return {
            schema: this.scopedSchema,
            path: Paths.compose(this.propsPath, "".concat(index)),
            uischema: uischema,
        };
    };
    ArrayLayoutRenderer.prototype.trackByFn = function (index) {
        return index;
    };
    ArrayLayoutRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ArrayLayoutRenderer, deps: [{ token: i1.JsonFormsAngularService }], target: i0.ɵɵFactoryTarget.Component });
    ArrayLayoutRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ArrayLayoutRenderer, selector: "app-array-layout-renderer", usesInheritance: true, ngImport: i0, template: "\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\" [fxHide]=\"hidden\">\n      <div [ngClass]=\"'array-layout-toolbar'\">\n        <h2 [ngClass]=\"['mat-h2', 'array-layout-title']\">{{ label }}</h2>\n        <span fxFlex></span>\n        <mat-icon\n          *ngIf=\"this.error?.length\"\n          color=\"warn\"\n          matBadge=\"{{\n            this.error.split(\n              '\n'\n            ).length\n          }}\"\n          matBadgeColor=\"warn\"\n          matTooltip=\"{{ this.error }}\"\n          matTooltipClass=\"error-message-tooltip\"\n        >\n          error_outline\n        </mat-icon>\n        <span fxFlex></span>\n        <button\n          mat-button\n          matTooltip=\"{{ translations.addTooltip }}\"\n          [disabled]=\"!isEnabled()\"\n          (click)=\"add()\"\n          attr.aria-label=\"{{ translations.addAriaLabel }}\"\n        >\n          <mat-icon>add</mat-icon>\n        </button>\n      </div>\n      <p *ngIf=\"noData\">{{ translations.noDataMessage }}</p>\n      <div\n        *ngFor=\"\n          let item of [].constructor(data);\n          let idx = index;\n          trackBy: trackByFn;\n          last as last;\n          first as first\n        \"\n      >\n        <mat-card appearance=\"outlined\">\n          <mat-card-content>\n            <jsonforms-outlet [renderProps]=\"getProps(idx)\"></jsonforms-outlet>\n          </mat-card-content>\n          <mat-card-actions *ngIf=\"isEnabled()\">\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-up\"\n              mat-button\n              [disabled]=\"first\"\n              (click)=\"up(idx)\"\n              attr.aria-label=\"{{ translations.upAriaLabel }}\"\n              matTooltip=\"{{ translations.up }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_upward</mat-icon>\n            </button>\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-down\"\n              mat-button\n              [disabled]=\"last\"\n              (click)=\"down(idx)\"\n              attr.aria-label=\"{{ translations.downAriaLabel }}\"\n              matTooltip=\"{{ translations.down }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_downward</mat-icon>\n            </button>\n            <button\n              mat-button\n              color=\"warn\"\n              (click)=\"remove(idx)\"\n              attr.aria-label=\"{{ translations.removeAriaLabel }}\"\n              matTooltip=\"{{ translations.removeTooltip }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </mat-card-actions>\n        </mat-card>\n      </div>\n    </div>\n  ", isInline: true, styles: ["\n      .array-layout-toolbar {\n        display: flex;\n        align-items: center;\n      }\n      .array-layout-title {\n        margin: 0;\n      }\n      ::ng-deep .error-message-tooltip {\n        white-space: pre-line;\n      }\n    "], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.JsonFormsOutlet, selector: "jsonforms-outlet", inputs: ["renderProps"] }, { kind: "directive", type: i3.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i3.DefaultLayoutGapDirective, selector: "  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]", inputs: ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"] }, { kind: "directive", type: i3.DefaultFlexDirective, selector: "  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],  [fxFlex.gt-md], [fxFlex.gt-lg]", inputs: ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"] }, { kind: "directive", type: i4.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }, { kind: "directive", type: i4.DefaultClassDirective, selector: "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", inputs: ["ngClass", "ngClass.xs", "ngClass.sm", "ngClass.md", "ngClass.lg", "ngClass.xl", "ngClass.lt-sm", "ngClass.lt-md", "ngClass.lt-lg", "ngClass.lt-xl", "ngClass.gt-xs", "ngClass.gt-sm", "ngClass.gt-md", "ngClass.gt-lg"] }, { kind: "component", type: i5.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i5.MatCardActions, selector: "mat-card-actions", inputs: ["align"], exportAs: ["matCardActions"] }, { kind: "directive", type: i5.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i8.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i9.MatBadge, selector: "[matBadge]", inputs: ["matBadgeDisabled", "matBadgeColor", "matBadgeOverlap", "matBadgePosition", "matBadge", "matBadgeDescription", "matBadgeSize", "matBadgeHidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
    return ArrayLayoutRenderer;
}(JsonFormsAbstractControl));
export { ArrayLayoutRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ArrayLayoutRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'app-array-layout-renderer', template: "\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\" [fxHide]=\"hidden\">\n      <div [ngClass]=\"'array-layout-toolbar'\">\n        <h2 [ngClass]=\"['mat-h2', 'array-layout-title']\">{{ label }}</h2>\n        <span fxFlex></span>\n        <mat-icon\n          *ngIf=\"this.error?.length\"\n          color=\"warn\"\n          matBadge=\"{{\n            this.error.split(\n              '\n'\n            ).length\n          }}\"\n          matBadgeColor=\"warn\"\n          matTooltip=\"{{ this.error }}\"\n          matTooltipClass=\"error-message-tooltip\"\n        >\n          error_outline\n        </mat-icon>\n        <span fxFlex></span>\n        <button\n          mat-button\n          matTooltip=\"{{ translations.addTooltip }}\"\n          [disabled]=\"!isEnabled()\"\n          (click)=\"add()\"\n          attr.aria-label=\"{{ translations.addAriaLabel }}\"\n        >\n          <mat-icon>add</mat-icon>\n        </button>\n      </div>\n      <p *ngIf=\"noData\">{{ translations.noDataMessage }}</p>\n      <div\n        *ngFor=\"\n          let item of [].constructor(data);\n          let idx = index;\n          trackBy: trackByFn;\n          last as last;\n          first as first\n        \"\n      >\n        <mat-card appearance=\"outlined\">\n          <mat-card-content>\n            <jsonforms-outlet [renderProps]=\"getProps(idx)\"></jsonforms-outlet>\n          </mat-card-content>\n          <mat-card-actions *ngIf=\"isEnabled()\">\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-up\"\n              mat-button\n              [disabled]=\"first\"\n              (click)=\"up(idx)\"\n              attr.aria-label=\"{{ translations.upAriaLabel }}\"\n              matTooltip=\"{{ translations.up }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_upward</mat-icon>\n            </button>\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-down\"\n              mat-button\n              [disabled]=\"last\"\n              (click)=\"down(idx)\"\n              attr.aria-label=\"{{ translations.downAriaLabel }}\"\n              matTooltip=\"{{ translations.down }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_downward</mat-icon>\n            </button>\n            <button\n              mat-button\n              color=\"warn\"\n              (click)=\"remove(idx)\"\n              attr.aria-label=\"{{ translations.removeAriaLabel }}\"\n              matTooltip=\"{{ translations.removeTooltip }}\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </mat-card-actions>\n        </mat-card>\n      </div>\n    </div>\n  ", changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .array-layout-toolbar {\n        display: flex;\n        align-items: center;\n      }\n      .array-layout-title {\n        margin: 0;\n      }\n      ::ng-deep .error-message-tooltip {\n        white-space: pre-line;\n      }\n    "] }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }]; } });
export var ArrayLayoutRendererTester = rankWith(4, isObjectArrayWithNesting);
//# sourceMappingURL=array-layout.renderer.js.map