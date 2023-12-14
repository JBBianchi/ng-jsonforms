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
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControlWithDetail, } from '@jsonforms/angular';
import { findUISchema, Generate, isObjectControl, rankWith, setReadonly, } from '@jsonforms/core';
import { cloneDeep } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
import * as i2 from "@angular/material/card";
var ObjectControlRenderer = /** @class */ (function (_super) {
    __extends(ObjectControlRenderer, _super);
    function ObjectControlRenderer(jsonformsService) {
        return _super.call(this, jsonformsService) || this;
    }
    ObjectControlRenderer.prototype.mapAdditionalProps = function (props) {
        var _this = this;
        this.detailUiSchema = findUISchema(props.uischemas, props.schema, props.uischema.scope, props.path, function () {
            var newSchema = cloneDeep(props.schema);
            // delete unsupported operators
            delete newSchema.oneOf;
            delete newSchema.anyOf;
            delete newSchema.allOf;
            return Generate.uiSchema(newSchema, 'Group', undefined, _this.rootSchema);
        }, props.uischema, props.rootSchema);
        if (isEmpty(props.path)) {
            this.detailUiSchema.type = 'VerticalLayout';
        }
        else {
            this.detailUiSchema.label = startCase(props.path);
        }
        if (!this.isEnabled()) {
            setReadonly(this.detailUiSchema);
        }
    };
    ObjectControlRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ObjectControlRenderer, deps: [{ token: i1.JsonFormsAngularService }], target: i0.ɵɵFactoryTarget.Component });
    ObjectControlRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ObjectControlRenderer, selector: "ObjectRenderer", usesInheritance: true, ngImport: i0, template: "\n    <mat-card appearance=\"outlined\">\n      <jsonforms-outlet\n        [uischema]=\"detailUiSchema\"\n        [schema]=\"scopedSchema\"\n        [path]=\"propsPath\"\n      >\n      </jsonforms-outlet>\n    </mat-card>\n  ", isInline: true, dependencies: [{ kind: "directive", type: i1.JsonFormsOutlet, selector: "jsonforms-outlet", inputs: ["renderProps"] }, { kind: "component", type: i2.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
    return ObjectControlRenderer;
}(JsonFormsControlWithDetail));
export { ObjectControlRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ObjectControlRenderer, decorators: [{
            type: Component,
            args: [{
                    selector: 'ObjectRenderer',
                    template: "\n    <mat-card appearance=\"outlined\">\n      <jsonforms-outlet\n        [uischema]=\"detailUiSchema\"\n        [schema]=\"scopedSchema\"\n        [path]=\"propsPath\"\n      >\n      </jsonforms-outlet>\n    </mat-card>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }]; } });
export var ObjectControlRendererTester = rankWith(2, isObjectControl);
//# sourceMappingURL=object.renderer.js.map