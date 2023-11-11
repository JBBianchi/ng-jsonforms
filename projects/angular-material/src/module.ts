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
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { AutocompleteControlRenderer } from './controls/autocomplete.renderer';
import { BooleanControlRenderer } from './controls/boolean.renderer';
import { DateControlRenderer } from './controls/date.renderer';
import { NumberControlRenderer } from './controls/number.renderer';
import { RangeControlRenderer } from './controls/range.renderer';
import { TextAreaRenderer } from './controls/textarea.renderer';
import { TextControlRenderer } from './controls/text.renderer';
import { ToggleControlRenderer } from './controls/toggle.renderer';
import { LabelRenderer } from './other/label.renderer';
import { JsonFormsDetailComponent } from './other/master-detail/detail';
import { MasterListComponent } from './other/master-detail/master';
import { ObjectControlRenderer } from './other/object.renderer';
import { TableRenderer } from './other/table.renderer';
import { CategorizationTabLayoutRenderer } from './layouts/categorization-layout.renderer';
import { GroupLayoutRenderer } from './layouts/group-layout.renderer';
import { HorizontalLayoutRenderer } from './layouts/horizontal-layout.renderer';
import { VerticalLayoutRenderer } from './layouts/vertical-layout.renderer';
import { ArrayLayoutRenderer } from './layouts/array-layout.renderer';
import { LayoutChildrenRenderPropsPipe } from './layouts';

@NgModule({
    imports: [
        CommonModule,
        JsonFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatBadgeModule,
    ],
    declarations: [
        BooleanControlRenderer,
        TextAreaRenderer,
        TextControlRenderer,
        NumberControlRenderer,
        RangeControlRenderer,
        DateControlRenderer,
        ToggleControlRenderer,
        VerticalLayoutRenderer,
        HorizontalLayoutRenderer,
        CategorizationTabLayoutRenderer,
        GroupLayoutRenderer,
        LabelRenderer,
        MasterListComponent,
        JsonFormsDetailComponent,
        ObjectControlRenderer,
        AutocompleteControlRenderer,
        TableRenderer,
        ArrayLayoutRenderer,
        LayoutChildrenRenderPropsPipe,
    ],
    exports: [
        CommonModule,
        JsonFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class JsonFormsAngularMaterialModule {}
