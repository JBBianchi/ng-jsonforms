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
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@jsonforms/angular";
var JsonFormsDetailComponent = /** @class */ (function () {
    function JsonFormsDetailComponent() {
        this.initialized = false;
    }
    Object.defineProperty(JsonFormsDetailComponent.prototype, "item", {
        set: function (item) {
            if (item) {
                this._item = item;
                this.initialized = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    JsonFormsDetailComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: JsonFormsDetailComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    JsonFormsDetailComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: JsonFormsDetailComponent, selector: "jsonforms-detail", inputs: { item: "item" }, ngImport: i0, template: "\n    <div *ngIf=\"initialized\">\n      <jsonforms-outlet [renderProps]=\"_item\"></jsonforms-outlet>\n    </div>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.JsonFormsOutlet, selector: "jsonforms-outlet", inputs: ["renderProps"] }] });
    return JsonFormsDetailComponent;
}());
export { JsonFormsDetailComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: JsonFormsDetailComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'jsonforms-detail',
                    template: "\n    <div *ngIf=\"initialized\">\n      <jsonforms-outlet [renderProps]=\"_item\"></jsonforms-outlet>\n    </div>\n  ",
                }]
        }], propDecorators: { item: [{
                type: Input
            }] } });
//# sourceMappingURL=detail.js.map