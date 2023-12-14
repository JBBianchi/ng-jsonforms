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
import { Component } from '@angular/core';
import { getExamples } from '@jsonforms/examples';
import { angularMaterialRenderers } from '../../src/index';
import { DateAdapter } from '@angular/material/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/core";
import * as i2 from "@angular/common";
import * as i3 from "@jsonforms/angular";
import * as i4 from "@angular/forms";
var uiSchema = {
    type: 'HorizontalLayout',
    elements: [
        {
            type: 'Control',
            scope: '#/properties/buyer/properties/email',
        },
        {
            type: 'Control',
            scope: '#/properties/status',
        },
    ],
};
var defaultI18n = {
    locale: 'en-US',
};
var itemTester = function (_schema, schemaPath, _path) {
    if (schemaPath === '#/properties/warehouseitems/items') {
        return 10;
    }
    return -1;
};
var AppComponent = /** @class */ (function () {
    function AppComponent(dateAdapter) {
        var _a;
        this.renderers = angularMaterialRenderers;
        this.examples = getExamples();
        this.readonly = false;
        this.uischemas = [
            { tester: itemTester, uischema: uiSchema },
        ];
        this.selectedExample = this.examples[19];
        this.dateAdapter = dateAdapter;
        this.i18n = (_a = this.selectedExample.i18n) !== null && _a !== void 0 ? _a : defaultI18n;
        dateAdapter.setLocale(this.i18n.locale);
    }
    AppComponent.prototype.onChange = function (ev) {
        var _a, _b;
        this.selectedExample = this.examples.find(function (e) { return e.name === ev.target.value; });
        this.i18n = (_b = (_a = this.selectedExample) === null || _a === void 0 ? void 0 : _a.i18n) !== null && _b !== void 0 ? _b : defaultI18n;
    };
    AppComponent.prototype.changeLocale = function (locale) {
        this.i18n.locale = locale;
        this.dateAdapter.setLocale(locale);
    };
    AppComponent.prototype.toggleReadonly = function () {
        this.readonly = !this.readonly;
    };
    AppComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AppComponent, deps: [{ token: i1.DateAdapter }], target: i0.ɵɵFactoryTarget.Component });
    AppComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AppComponent, selector: "app-root", ngImport: i0, template: "\n    <h1>Angular Material Examples</h1>\n    Data: {{ selectedExample.data | json }}\n    <div>\n      Example:\n      <select (change)=\"onChange($event)\">\n        <option\n          *ngFor=\"let example of examples\"\n          value=\"{{ example.name }}\"\n          label=\"{{ example.label }}\"\n        >\n          {{ example.label }}\n        </option>\n      </select>\n    </div>\n    <div>\n      <button (click)=\"changeLocale('de-DE')\">Change locale to de-DE</button>\n      <button (click)=\"changeLocale('en-US')\">Change locale to en-US</button>\n      Current locale: {{ i18n.locale }}\n      <button (click)=\"toggleReadonly()\">\n        {{ readonly ? 'Unset' : 'Set' }} Readonly\n      </button>\n    </div>\n    <jsonforms\n      [(data)]=\"selectedExample.data\"\n      [schema]=\"selectedExample.schema\"\n      [uischema]=\"selectedExample.uischema\"\n      [renderers]=\"renderers\"\n      [i18n]=\"i18n\"\n      [readonly]=\"readonly\"\n    ></jsonforms>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i3.JsonForms, selector: "jsonforms", inputs: ["uischema", "schema", "data", "renderers", "uischemas", "readonly", "validationMode", "ajv", "config", "i18n", "additionalErrors"], outputs: ["dataChange", "errors"] }, { kind: "directive", type: i4.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i4.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "pipe", type: i2.JsonPipe, name: "json" }] });
    return AppComponent;
}());
export { AppComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AppComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-root',
                    template: "\n    <h1>Angular Material Examples</h1>\n    Data: {{ selectedExample.data | json }}\n    <div>\n      Example:\n      <select (change)=\"onChange($event)\">\n        <option\n          *ngFor=\"let example of examples\"\n          value=\"{{ example.name }}\"\n          label=\"{{ example.label }}\"\n        >\n          {{ example.label }}\n        </option>\n      </select>\n    </div>\n    <div>\n      <button (click)=\"changeLocale('de-DE')\">Change locale to de-DE</button>\n      <button (click)=\"changeLocale('en-US')\">Change locale to en-US</button>\n      Current locale: {{ i18n.locale }}\n      <button (click)=\"toggleReadonly()\">\n        {{ readonly ? 'Unset' : 'Set' }} Readonly\n      </button>\n    </div>\n    <jsonforms\n      [(data)]=\"selectedExample.data\"\n      [schema]=\"selectedExample.schema\"\n      [uischema]=\"selectedExample.uischema\"\n      [renderers]=\"renderers\"\n      [i18n]=\"i18n\"\n      [readonly]=\"readonly\"\n    ></jsonforms>\n  ",
                }]
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }]; } });
//# sourceMappingURL=app.component.js.map