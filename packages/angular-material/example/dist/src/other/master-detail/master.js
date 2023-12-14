import { __assign, __extends } from "tslib";
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
import some from 'lodash/some';
import get from 'lodash/get';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { JsonFormsAngularService, JsonFormsArrayControl, } from '@jsonforms/angular';
import { createDefaultValue, decode, findUISchema, getFirstPrimitiveProp, mapDispatchToArrayControlProps, mapStateToArrayControlProps, rankWith, setReadonly, uiTypeIs, } from '@jsonforms/core';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/sidenav";
import * as i4 from "@angular/material/list";
import * as i5 from "@angular/flex-layout/extended";
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/icon";
import * as i8 from "./detail";
var keywords = ['#', 'properties', 'items'];
export var removeSchemaKeywords = function (path) {
    return decode(path
        .split('/')
        .filter(function (s) { return !some(keywords, function (key) { return key === s; }); })
        .join('.'));
};
var MasterListComponent = /** @class */ (function (_super) {
    __extends(MasterListComponent, _super);
    function MasterListComponent(jsonformsService, changeDetectorRef) {
        var _this = _super.call(this, jsonformsService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    MasterListComponent.prototype.onListItemHover = function (idx) {
        this.highlightedIdx = idx;
    };
    MasterListComponent.prototype.trackElement = function (_index, element) {
        return element ? element.label : null;
    };
    MasterListComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var dispatch = this.jsonFormsService.updateCore.bind(this.jsonFormsService);
        var _a = mapDispatchToArrayControlProps(dispatch), addItem = _a.addItem, removeItems = _a.removeItems;
        this.addItem = addItem;
        this.removeItems = removeItems;
    };
    MasterListComponent.prototype.mapAdditionalProps = function (props) {
        var data = props.data, path = props.path, schema = props.schema, uischema = props.uischema;
        var controlElement = uischema;
        this.propsPath = props.path;
        var detailUISchema = findUISchema(props.uischemas, schema, "".concat(controlElement.scope, "/items"), props.path, 'VerticalLayout', controlElement, props.rootSchema);
        if (!this.isEnabled()) {
            setReadonly(detailUISchema);
        }
        this.translations = props.translations;
        var masterItems = (data || []).map(function (d, index) {
            var _a;
            var labelRefInstancePath = ((_a = controlElement.options) === null || _a === void 0 ? void 0 : _a.labelRef) &&
                removeSchemaKeywords(controlElement.options.labelRef);
            var isPrimitive = d !== undefined && typeof d !== 'object';
            var masterItem = {
                label: isPrimitive
                    ? d.toString()
                    : get(d, labelRefInstancePath !== null && labelRefInstancePath !== void 0 ? labelRefInstancePath : getFirstPrimitiveProp(schema)),
                data: d,
                path: "".concat(path, ".").concat(index),
                schema: schema,
                uischema: detailUISchema,
            };
            return masterItem;
        });
        this.masterItems = masterItems;
        var newSelectedIdx = -1;
        var newSelectedItem;
        if (this.masterItems.length === 0) {
            // unset select if no elements anymore
            this.selectedItem = undefined;
            this.selectedItemIdx = -1;
        }
        else if (this.selectedItemIdx >= this.masterItems.length) {
            // the previous index is to high, reduce it to the maximal possible
            newSelectedIdx = this.masterItems.length - 1;
            newSelectedItem = this.masterItems[newSelectedIdx];
        }
        else if (this.selectedItemIdx !== -1 &&
            this.selectedItemIdx < this.masterItems.length) {
            newSelectedIdx = this.selectedItemIdx;
            newSelectedItem = this.masterItems[this.selectedItemIdx];
        }
        if (newSelectedItem !== undefined &&
            this.selectedItem !== undefined &&
            (newSelectedItem.label === this.selectedItem.label ||
                newSelectedItem.path === this.selectedItem.path)) {
            // after checking that we are on the same path, set selection
            this.selectedItem = newSelectedItem;
            this.selectedItemIdx = newSelectedIdx;
        }
        else if (this.masterItems.length > 0) {
            // pre-select 1st entry if the previous selected element as fallback
            this.selectedItem = this.masterItems[0];
            this.selectedItemIdx = 0;
        }
        this.changeDetectorRef.markForCheck();
    };
    MasterListComponent.prototype.onSelect = function (item, idx) {
        this.selectedItem = item;
        this.selectedItemIdx = idx;
    };
    MasterListComponent.prototype.onAddClick = function () {
        this.addItem(this.propsPath, createDefaultValue(this.scopedSchema, this.rootSchema))();
    };
    MasterListComponent.prototype.onDeleteClick = function (item) {
        this.removeItems(this.propsPath, [item])();
    };
    MasterListComponent.prototype.mapToProps = function (state) {
        var props = mapStateToArrayControlProps(state, this.getOwnProps());
        return __assign({}, props);
    };
    MasterListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MasterListComponent, deps: [{ token: i1.JsonFormsAngularService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    MasterListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MasterListComponent, selector: "jsonforms-list-with-detail-master", usesInheritance: true, ngImport: i0, template: "\n    <mat-sidenav-container class=\"container\" [fxHide]=\"hidden\">\n      <mat-sidenav mode=\"side\" opened>\n        <mat-nav-list>\n          <mat-list-item *ngIf=\"masterItems.length === 0\">{{\n            translations.noDataMessage\n          }}</mat-list-item>\n          <mat-list-item\n            *ngFor=\"\n              let item of masterItems;\n              let i = index;\n              trackBy: trackElement\n            \"\n            [class.selected]=\"item === selectedItem\"\n            (click)=\"onSelect(item, i)\"\n            (mouseover)=\"onListItemHover(i)\"\n            (mouseout)=\"onListItemHover(undefined)\"\n          >\n            <a matLine>{{ item.label || 'No label set' }}</a>\n            <button\n              mat-icon-button\n              class=\"button item-button hide\"\n              (click)=\"onDeleteClick(i)\"\n              [ngClass]=\"{ show: highlightedIdx == i }\"\n              *ngIf=\"isEnabled()\"\n            >\n              <mat-icon mat-list-icon>delete</mat-icon>\n            </button>\n          </mat-list-item>\n        </mat-nav-list>\n        <button\n          mat-fab\n          color=\"primary\"\n          class=\"add-button\"\n          (click)=\"onAddClick()\"\n          *ngIf=\"isEnabled()\"\n        >\n          <mat-icon [attr.aria-label]=\"translations.addAriaLabel\">add</mat-icon>\n        </button>\n      </mat-sidenav>\n      <mat-sidenav-content class=\"content\">\n        <jsonforms-detail\n          *ngIf=\"selectedItem\"\n          [item]=\"selectedItem\"\n        ></jsonforms-detail>\n      </mat-sidenav-content>\n    </mat-sidenav-container>\n  ", isInline: true, styles: ["\n      /* TODO(mdc-migration): The following rule targets internal classes of list that may no longer apply for the MDC version. */\n      mat-list-item.selected {\n        background: rgba(0, 0, 0, 0.04);\n      }\n      .container {\n        height: 100vh;\n      }\n      .content {\n        padding: 15px;\n        background-color: #fff;\n      }\n      .add-button {\n        float: right;\n        margin-top: 0.5em;\n        margin-right: 0.25em;\n      }\n      .button {\n        float: right;\n        margin-right: 0.25em;\n      }\n      .item-button {\n        position: absolute;\n        top: 0;\n        right: 0;\n      }\n      .hide {\n        display: none;\n      }\n      .show {\n        display: inline-block;\n      }\n      mat-sidenav {\n        width: 20%;\n      }\n    "], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatSidenav, selector: "mat-sidenav", inputs: ["fixedInViewport", "fixedTopGap", "fixedBottomGap"], exportAs: ["matSidenav"] }, { kind: "component", type: i3.MatSidenavContainer, selector: "mat-sidenav-container", exportAs: ["matSidenavContainer"] }, { kind: "component", type: i3.MatSidenavContent, selector: "mat-sidenav-content" }, { kind: "component", type: i4.MatNavList, selector: "mat-nav-list", exportAs: ["matNavList"] }, { kind: "component", type: i4.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "directive", type: i5.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }, { kind: "directive", type: i5.DefaultClassDirective, selector: "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", inputs: ["ngClass", "ngClass.xs", "ngClass.sm", "ngClass.md", "ngClass.lg", "ngClass.xl", "ngClass.lt-sm", "ngClass.lt-md", "ngClass.lt-lg", "ngClass.lt-xl", "ngClass.gt-xs", "ngClass.gt-sm", "ngClass.gt-md", "ngClass.gt-lg"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatFabButton, selector: "button[mat-fab]", inputs: ["disabled", "disableRipple", "color", "tabIndex", "extended"], exportAs: ["matButton"] }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8.JsonFormsDetailComponent, selector: "jsonforms-detail", inputs: ["item"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
    return MasterListComponent;
}(JsonFormsArrayControl));
export { MasterListComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MasterListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'jsonforms-list-with-detail-master', template: "\n    <mat-sidenav-container class=\"container\" [fxHide]=\"hidden\">\n      <mat-sidenav mode=\"side\" opened>\n        <mat-nav-list>\n          <mat-list-item *ngIf=\"masterItems.length === 0\">{{\n            translations.noDataMessage\n          }}</mat-list-item>\n          <mat-list-item\n            *ngFor=\"\n              let item of masterItems;\n              let i = index;\n              trackBy: trackElement\n            \"\n            [class.selected]=\"item === selectedItem\"\n            (click)=\"onSelect(item, i)\"\n            (mouseover)=\"onListItemHover(i)\"\n            (mouseout)=\"onListItemHover(undefined)\"\n          >\n            <a matLine>{{ item.label || 'No label set' }}</a>\n            <button\n              mat-icon-button\n              class=\"button item-button hide\"\n              (click)=\"onDeleteClick(i)\"\n              [ngClass]=\"{ show: highlightedIdx == i }\"\n              *ngIf=\"isEnabled()\"\n            >\n              <mat-icon mat-list-icon>delete</mat-icon>\n            </button>\n          </mat-list-item>\n        </mat-nav-list>\n        <button\n          mat-fab\n          color=\"primary\"\n          class=\"add-button\"\n          (click)=\"onAddClick()\"\n          *ngIf=\"isEnabled()\"\n        >\n          <mat-icon [attr.aria-label]=\"translations.addAriaLabel\">add</mat-icon>\n        </button>\n      </mat-sidenav>\n      <mat-sidenav-content class=\"content\">\n        <jsonforms-detail\n          *ngIf=\"selectedItem\"\n          [item]=\"selectedItem\"\n        ></jsonforms-detail>\n      </mat-sidenav-content>\n    </mat-sidenav-container>\n  ", changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      /* TODO(mdc-migration): The following rule targets internal classes of list that may no longer apply for the MDC version. */\n      mat-list-item.selected {\n        background: rgba(0, 0, 0, 0.04);\n      }\n      .container {\n        height: 100vh;\n      }\n      .content {\n        padding: 15px;\n        background-color: #fff;\n      }\n      .add-button {\n        float: right;\n        margin-top: 0.5em;\n        margin-right: 0.25em;\n      }\n      .button {\n        float: right;\n        margin-right: 0.25em;\n      }\n      .item-button {\n        position: absolute;\n        top: 0;\n        right: 0;\n      }\n      .hide {\n        display: none;\n      }\n      .show {\n        display: inline-block;\n      }\n      mat-sidenav {\n        width: 20%;\n      }\n    "] }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }, { type: i0.ChangeDetectorRef }]; } });
export var masterDetailTester = rankWith(4, uiTypeIs('ListWithDetail'));
//# sourceMappingURL=master.js.map