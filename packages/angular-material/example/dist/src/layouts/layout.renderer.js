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
import { ChangeDetectorRef, Component, Pipe, } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer, } from '@jsonforms/angular';
import { mapStateToLayoutProps, } from '@jsonforms/core';
import * as i0 from "@angular/core";
import * as i1 from "@jsonforms/angular";
var LayoutRenderer = /** @class */ (function (_super) {
    __extends(LayoutRenderer, _super);
    function LayoutRenderer(jsonFormsService, changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.jsonFormsService = jsonFormsService;
        _this.changeDetectionRef = changeDetectionRef;
        return _this;
    }
    LayoutRenderer.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.jsonFormsService.$state.subscribe({
            next: function (state) {
                var props = mapStateToLayoutProps(state, _this.getOwnProps());
                _this.label = props.label;
                _this.hidden = !props.visible;
                _this.changeDetectionRef.markForCheck();
            },
        });
    };
    LayoutRenderer.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    LayoutRenderer.prototype.trackElement = function (_index, renderProp) {
        return renderProp
            ? renderProp.path + JSON.stringify(renderProp.uischema)
            : null;
    };
    LayoutRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LayoutRenderer, deps: [{ token: i1.JsonFormsAngularService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    LayoutRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: LayoutRenderer, selector: "ng-component", usesInheritance: true, ngImport: i0, template: '', isInline: true });
    return LayoutRenderer;
}(JsonFormsBaseRenderer));
export { LayoutRenderer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LayoutRenderer, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.JsonFormsAngularService }, { type: i0.ChangeDetectorRef }]; } });
var LayoutChildrenRenderPropsPipe = /** @class */ (function () {
    function LayoutChildrenRenderPropsPipe() {
    }
    LayoutChildrenRenderPropsPipe.prototype.transform = function (uischema, schema, path) {
        var elements = (uischema.elements || []).map(function (el) { return ({
            uischema: el,
            schema: schema,
            path: path,
        }); });
        return elements;
    };
    LayoutChildrenRenderPropsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LayoutChildrenRenderPropsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    LayoutChildrenRenderPropsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: LayoutChildrenRenderPropsPipe, name: "layoutChildrenRenderProps" });
    return LayoutChildrenRenderPropsPipe;
}());
export { LayoutChildrenRenderPropsPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LayoutChildrenRenderPropsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'layoutChildrenRenderProps' }]
        }] });
//# sourceMappingURL=layout.renderer.js.map