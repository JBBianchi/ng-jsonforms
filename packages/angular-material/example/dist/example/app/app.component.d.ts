import { ExampleDescription } from '@jsonforms/examples';
import { JsonFormsI18nState, UISchemaElement, UISchemaTester } from '@jsonforms/core';
import { DateAdapter } from '@angular/material/core';
import * as i0 from "@angular/core";
export declare class AppComponent {
    readonly renderers: {
        tester: import("@jsonforms/core").RankedTester;
        renderer: any;
    }[];
    readonly examples: ExampleDescription[];
    selectedExample: ExampleDescription | undefined;
    i18n: JsonFormsI18nState;
    private dateAdapter;
    readonly: boolean;
    data: any;
    uischemas: {
        tester: UISchemaTester;
        uischema: UISchemaElement;
    }[];
    constructor(dateAdapter: DateAdapter<Date>);
    onChange(ev: any): void;
    changeLocale(locale: string): void;
    toggleReadonly(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AppComponent, "app-root", never, {}, {}, never, never, false, never>;
}
