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
import startCase from 'lodash/startCase';
import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsArrayControl, } from '@jsonforms/angular';
import { createDefaultValue, deriveTypes, encode, isObjectArrayControl, isPrimitiveArrayControl, mapDispatchToArrayControlProps, or, Paths, rankWith, setReadonly, } from '@jsonforms/core';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/table";
import * as i6 from "@angular/material/tooltip";
var TableRenderer = /** @class */ (function (_super) {
    __extends(TableRenderer, _super);
    function TableRenderer(jsonformsService) {
        var _this = _super.call(this, jsonformsService) || this;
        _this.columnsToIgnore = ['array', 'object'];
        _this.generateCells = function (schema, rowPath) {
            if (schema.type === 'object') {
                return _this.getValidColumnProps(schema).map(function (prop) {
                    var encProp = encode(prop);
                    var uischema = controlWithoutLabel("#/properties/".concat(encProp));
                    if (!_this.isEnabled()) {
                        setReadonly(uischema);
                    }
                    return {
                        property: prop,
                        header: startCase(prop),
                        props: {
                            schema: schema,
                            uischema: uischema,
                            path: rowPath,
                        },
                    };
                });
            }
            // needed to correctly render input control for multi attributes
            return [
                {
                    property: 'DUMMY',
                    header: _this.label,
                    props: {
                        schema: schema,
                        uischema: controlWithoutLabel("#"),
                        path: rowPath,
                    },
                },
            ];
        };
        _this.getValidColumnProps = function (scopedSchema) {
            if (scopedSchema.type === 'object') {
                return Object.keys(scopedSchema.properties).filter(function (prop) {
                    var types = deriveTypes(scopedSchema.properties[prop]);
                    if (types.length > 1) {
                        return false;
                    }
                    return _this.columnsToIgnore.indexOf(types[0]) === -1;
                });
            }
            // primitives
            return [''];
        };
        return _this;
    }
    TableRenderer.prototype.trackElement = function (index, _element) {
        return index ? index : null;
    };
    TableRenderer.prototype.mapAdditionalProps = function (props) {
        this.items = this.generateCells(props.schema, props.path);
        this.displayedColumns = this.items.map(function (item) { return item.property; });
        if (this.isEnabled()) {
            this.displayedColumns.push('action');
        }
        this.translations = props.translations;
    };
    TableRenderer.prototype.getProps = function (index, props) {
        var rowPath = Paths.compose(props.path, "".concat(index));
        return {
            schema: props.schema,
            uischema: props.uischema,
            path: rowPath,
        };
    };
    TableRenderer.prototype.remove = function (index) {
        this.removeItems(this.propsPath, [index])();
    };
    TableRenderer.prototype.add = function () {
        this.addItem(this.propsPath, createDefaultValue(this.scopedSchema, this.rootSchema))();
    };
    TableRenderer.prototype.up = function (index) {
        this.moveItemUp(this.propsPath, index)();
    };
    TableRenderer.prototype.down = function (index) {
        this.moveItemDown(this.propsPath, index)();
    };
    TableRenderer.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var _a = mapDispatchToArrayControlProps(this.jsonFormsService.updateCore.bind(this.jsonFormsService)), addItem = _a.addItem, removeItems = _a.removeItems, moveUp = _a.moveUp, moveDown = _a.moveDown;
        this.addItem = addItem;
        this.moveItemUp = moveUp;
        this.moveItemDown = moveDown;
        this.removeItems = removeItems;
    };
    TableRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableRenderer, deps: [{ token: i1.JsonFormsAngularService }], target: i0.ɵɵFactoryTarget.Component });
    TableRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TableRenderer, selector: "TableRenderer", usesInheritance: true, ngImport: i0, template: "\n    <table\n      mat-table\n      [dataSource]=\"data\"\n      class=\"mat-elevation-z8\"\n      [trackBy]=\"trackElement\"\n    >\n      <ng-container matColumnDef=\"action\">\n        <tr>\n          <th mat-header-cell *matHeaderCellDef>\n            <button\n              mat-button\n              color=\"primary\"\n              (click)=\"add()\"\n              [disabled]=\"!isEnabled()\"\n              [matTooltip]=\"translations.addTooltip\"\n            >\n              <mat-icon>add</mat-icon>\n            </button>\n          </th>\n        </tr>\n        <tr>\n          <td\n            mat-cell\n            *matCellDef=\"\n              let row;\n              let i = index;\n              let first = first;\n              let last = last\n            \"\n          >\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-up\"\n              mat-button\n              [disabled]=\"first\"\n              (click)=\"up(i)\"\n              [matTooltip]=\"translations.upAriaLabel\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_upward</mat-icon>\n            </button>\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-down\"\n              mat-button\n              [disabled]=\"last\"\n              (click)=\"down(i)\"\n              [matTooltip]=\"translations.downAriaLabel\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_downward</mat-icon>\n            </button>\n            <button\n              mat-button\n              color=\"warn\"\n              (click)=\"remove(i)\"\n              [disabled]=\"!isEnabled()\"\n              matTooltipPosition=\"right\"\n              [matTooltip]=\"translations.removeTooltip\"\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </td>\n        </tr>\n\n        <tr></tr\n      ></ng-container>\n\n      <ng-container\n        *ngFor=\"let item of items\"\n        matColumnDef=\"{{ item.property }}\"\n      >\n        <th mat-header-cell *matHeaderCellDef>{{ item.header }}</th>\n        <td mat-cell *matCellDef=\"let index = index\">\n          <jsonforms-outlet\n            [renderProps]=\"getProps(index, item.props)\"\n          ></jsonforms-outlet>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  ", isInline: true, styles: ["table {width: 100%;}", ".cdk-column-action { width: 15%}"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.JsonFormsOutlet, selector: "jsonforms-outlet", inputs: ["renderProps"] }, { kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i5.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i5.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i5.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i5.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i5.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i5.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i5.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i5.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i5.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i5.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "directive", type: i6.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }] });
    return TableRenderer;
}(JsonFormsArrayControl));
export { TableRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'TableRenderer', template: "\n    <table\n      mat-table\n      [dataSource]=\"data\"\n      class=\"mat-elevation-z8\"\n      [trackBy]=\"trackElement\"\n    >\n      <ng-container matColumnDef=\"action\">\n        <tr>\n          <th mat-header-cell *matHeaderCellDef>\n            <button\n              mat-button\n              color=\"primary\"\n              (click)=\"add()\"\n              [disabled]=\"!isEnabled()\"\n              [matTooltip]=\"translations.addTooltip\"\n            >\n              <mat-icon>add</mat-icon>\n            </button>\n          </th>\n        </tr>\n        <tr>\n          <td\n            mat-cell\n            *matCellDef=\"\n              let row;\n              let i = index;\n              let first = first;\n              let last = last\n            \"\n          >\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-up\"\n              mat-button\n              [disabled]=\"first\"\n              (click)=\"up(i)\"\n              [matTooltip]=\"translations.upAriaLabel\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_upward</mat-icon>\n            </button>\n            <button\n              *ngIf=\"uischema?.options?.showSortButtons\"\n              class=\"item-down\"\n              mat-button\n              [disabled]=\"last\"\n              (click)=\"down(i)\"\n              [matTooltip]=\"translations.downAriaLabel\"\n              matTooltipPosition=\"right\"\n            >\n              <mat-icon>arrow_downward</mat-icon>\n            </button>\n            <button\n              mat-button\n              color=\"warn\"\n              (click)=\"remove(i)\"\n              [disabled]=\"!isEnabled()\"\n              matTooltipPosition=\"right\"\n              [matTooltip]=\"translations.removeTooltip\"\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </td>\n        </tr>\n\n        <tr></tr\n      ></ng-container>\n\n      <ng-container\n        *ngFor=\"let item of items\"\n        matColumnDef=\"{{ item.property }}\"\n      >\n        <th mat-header-cell *matHeaderCellDef>{{ item.header }}</th>\n        <td mat-cell *matCellDef=\"let index = index\">\n          <jsonforms-outlet\n            [renderProps]=\"getProps(index, item.props)\"\n          ></jsonforms-outlet>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  ", styles: ["table {width: 100%;}", ".cdk-column-action { width: 15%}"] }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }]; } });
export var TableRendererTester = rankWith(3, or(isObjectArrayControl, isPrimitiveArrayControl));
export var controlWithoutLabel = function (scope) { return ({
    type: 'Control',
    scope: scope,
    label: false,
}); };
//# sourceMappingURL=table.renderer.js.map