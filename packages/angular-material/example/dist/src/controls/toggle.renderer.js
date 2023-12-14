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
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { and, isBooleanControl, optionIs, rankWith, } from '@jsonforms/core';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/slide-toggle";
import * as i5 from "@angular/flex-layout/extended";
var ToggleControlRenderer = /** @class */ (function (_super) {
    __extends(ToggleControlRenderer, _super);
    function ToggleControlRenderer(jsonformsService, changeDetectorRef) {
        var _this = _super.call(this, jsonformsService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.isChecked = function () { return _this.data || false; };
        _this.getEventValue = function (event) { return event.checked; };
        return _this;
    }
    ToggleControlRenderer.prototype.mapAdditionalProps = function () {
        this.changeDetectorRef.markForCheck();
    };
    ToggleControlRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToggleControlRenderer, deps: [{ token: i1.JsonFormsAngularService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    ToggleControlRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ToggleControlRenderer, selector: "ToggleControlRenderer", usesInheritance: true, ngImport: i0, template: "\n    <div [fxHide]=\"hidden\">\n      <mat-slide-toggle\n        (change)=\"onChange($event)\"\n        [checked]=\"isChecked()\"\n        [disabled]=\"!isEnabled()\"\n        [id]=\"id\"\n      >\n        {{ label }}\n      </mat-slide-toggle>\n      <mat-hint class=\"mat-caption\" *ngIf=\"shouldShowUnfocusedDescription()\">{{\n        description\n      }}</mat-hint>\n      <mat-error class=\"mat-caption\">{{ error }}</mat-error>\n    </div>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "component", type: i4.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "directive", type: i5.DefaultShowHideDirective, selector: "  [fxShow], [fxShow.print],  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],  [fxHide], [fxHide.print],  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]", inputs: ["fxShow", "fxShow.print", "fxShow.xs", "fxShow.sm", "fxShow.md", "fxShow.lg", "fxShow.xl", "fxShow.lt-sm", "fxShow.lt-md", "fxShow.lt-lg", "fxShow.lt-xl", "fxShow.gt-xs", "fxShow.gt-sm", "fxShow.gt-md", "fxShow.gt-lg", "fxHide", "fxHide.print", "fxHide.xs", "fxHide.sm", "fxHide.md", "fxHide.lg", "fxHide.xl", "fxHide.lt-sm", "fxHide.lt-md", "fxHide.lt-lg", "fxHide.lt-xl", "fxHide.gt-xs", "fxHide.gt-sm", "fxHide.gt-md", "fxHide.gt-lg"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
    return ToggleControlRenderer;
}(JsonFormsControl));
export { ToggleControlRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ToggleControlRenderer, decorators: [{
            type: Component,
            args: [{
                    selector: 'ToggleControlRenderer',
                    template: "\n    <div [fxHide]=\"hidden\">\n      <mat-slide-toggle\n        (change)=\"onChange($event)\"\n        [checked]=\"isChecked()\"\n        [disabled]=\"!isEnabled()\"\n        [id]=\"id\"\n      >\n        {{ label }}\n      </mat-slide-toggle>\n      <mat-hint class=\"mat-caption\" *ngIf=\"shouldShowUnfocusedDescription()\">{{\n        description\n      }}</mat-hint>\n      <mat-error class=\"mat-caption\">{{ error }}</mat-error>\n    </div>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }, { type: i0.ChangeDetectorRef }]; } });
export var ToggleControlRendererTester = rankWith(3, and(isBooleanControl, optionIs('toggle', true)));
//# sourceMappingURL=toggle.renderer.js.map