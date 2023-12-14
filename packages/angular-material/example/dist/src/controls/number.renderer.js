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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isIntegerControl, isNumberControl, or, rankWith, } from '@jsonforms/core';
import merge from 'lodash/merge';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/input";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/flex-layout/flex";
import * as i7 from "@angular/flex-layout/extended";
var NumberControlRenderer = /** @class */ (function (_super) {
    __extends(NumberControlRenderer, _super);
    function NumberControlRenderer(jsonformsService) {
        var _this = _super.call(this, jsonformsService) || this;
        _this.MAXIMUM_FRACTIONAL_DIGITS = 20;
        _this.focused = false;
        _this.getEventValue = function (event) {
            var cleanPattern = new RegExp("[^-+0-9".concat(_this.decimalSeparator, "]"), 'g');
            var cleaned = event.target.value.replace(cleanPattern, '');
            var normalized = cleaned.replace(_this.decimalSeparator, '.');
            if (normalized === '') {
                return undefined;
            }
            // convert to number
            var number = +normalized;
            // if not a number just return the string
            if (Number.isNaN(number)) {
                return event.target.value;
            }
            return number;
        };
        _this.getValue = function () {
            if (_this.data !== undefined && _this.data !== null) {
                if (typeof _this.data === 'number') {
                    return _this.numberFormat.format(_this.data);
                }
                return _this.data;
            }
            return '';
        };
        return _this;
    }
    NumberControlRenderer.prototype.onChange = function (ev) {
        var data = this.oldValue
            ? ev.target.value.replace(this.oldValue, '')
            : ev.target.value;
        // ignore these
        if (data === '.' ||
            data === ',' ||
            data === ' ' ||
            // if the value is 0 and we already have a value then we ignore
            (data === '0' &&
                this.getValue() !== '' &&
                // a 0 in the first place
                ((ev.target.selectionStart === 1 && ev.target.selectionEnd === 1) ||
                    // or in the last place as this doesn't change the value (when there is a separator)
                    (ev.target.selectionStart === ev.target.value.length &&
                        ev.target.selectionEnd === ev.target.value.length &&
                        ev.target.value.indexOf(this.decimalSeparator) !== -1)))) {
            this.oldValue = ev.target.value;
            return;
        }
        _super.prototype.onChange.call(this, ev);
        this.oldValue = this.getValue();
    };
    NumberControlRenderer.prototype.mapAdditionalProps = function (props) {
        if (this.scopedSchema) {
            var testerContext = {
                rootSchema: this.rootSchema,
                config: props.config,
            };
            var defaultStep = isNumberControl(this.uischema, this.rootSchema, testerContext)
                ? 0.1
                : 1;
            this.min = this.scopedSchema.minimum;
            this.max = this.scopedSchema.maximum;
            this.multipleOf = this.scopedSchema.multipleOf || defaultStep;
            var appliedUiSchemaOptions = merge({}, props.config, this.uischema.options);
            var currentLocale = this.jsonFormsService.getLocale();
            if (this.locale === undefined || this.locale !== currentLocale) {
                this.locale = currentLocale;
                this.numberFormat = new Intl.NumberFormat(this.locale, {
                    useGrouping: appliedUiSchemaOptions.useGrouping,
                    maximumFractionDigits: this.MAXIMUM_FRACTIONAL_DIGITS,
                });
                this.determineDecimalSeparator();
                this.oldValue = this.getValue();
            }
            this.form.setValue(this.getValue());
        }
    };
    NumberControlRenderer.prototype.determineDecimalSeparator = function () {
        var example = this.numberFormat.format(1.1);
        this.decimalSeparator = example.charAt(1);
    };
    NumberControlRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NumberControlRenderer, deps: [{ token: i1.JsonFormsAngularService }], target: i0.ɵɵFactoryTarget.Component });
    NumberControlRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NumberControlRenderer, selector: "NumberControlRenderer", usesInheritance: true, ngImport: i0, template: "\n    <mat-form-field fxFlex [fxHide]=\"hidden\">\n      <mat-label>{{ label }}</mat-label>\n      <input\n        matInput\n        (input)=\"onChange($event)\"\n        [value]=\"getValue()\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"multipleOf\"\n        (focus)=\"focused = true\"\n        (focusout)=\"focused = false\"\n      />\n      <mat-hint *ngIf=\"shouldShowUnfocusedDescription() || focused\">{{\n        description\n      }}</mat-hint>\n      <mat-error>{{ error }}</mat-error>\n    </mat-form-field>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i6.DefaultFlexDirective, selector: "  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],  [fxFlex.gt-md], [fxFlex.gt-lg]", inputs: ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"] }, { kind: "directive", type: i7.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
    return NumberControlRenderer;
}(JsonFormsControl));
export { NumberControlRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NumberControlRenderer, decorators: [{
            type: Component,
            args: [{
                    selector: 'NumberControlRenderer',
                    template: "\n    <mat-form-field fxFlex [fxHide]=\"hidden\">\n      <mat-label>{{ label }}</mat-label>\n      <input\n        matInput\n        (input)=\"onChange($event)\"\n        [value]=\"getValue()\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"multipleOf\"\n        (focus)=\"focused = true\"\n        (focusout)=\"focused = false\"\n      />\n      <mat-hint *ngIf=\"shouldShowUnfocusedDescription() || focused\">{{\n        description\n      }}</mat-hint>\n      <mat-error>{{ error }}</mat-error>\n    </mat-form-field>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }]; } });
export var NumberControlRendererTester = rankWith(2, or(isNumberControl, isIntegerControl));
//# sourceMappingURL=number.renderer.js.map