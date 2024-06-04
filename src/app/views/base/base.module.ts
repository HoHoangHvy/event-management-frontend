import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import {IconComponent, IconDirective, IconModule, IconSetService} from '@coreui/icons-angular';

// Material UI Components
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from "@angular/material/datepicker";

// Utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// Components
import { AccordionsComponent } from './accordion/accordions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { CollapsesComponent } from './collapses/collapses.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NavsComponent } from './navs/navs.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { BaseRoutingModule } from './base-routing.module';
import { CalendarModule } from 'primeng/calendar';

// Icons
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {UpdateViewComponent} from "../../components/update-view/update-view.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {CreateViewComponent} from "../../components/create-view/create-view.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {AdminManagerComponent} from "../../components/admin-manager/admin-manager.component";
import {RecordListComponent} from "../../components/record-list/record-list.component";
import {PermissionComponent} from "../../components/permission/permission.component";
import {NewFeedComponent} from "../../components/new-feed/new-feed.component";
import {NewFeedContainerComponent} from "../../components/new-feed-container/new-feed-container.component";
import {AvatarModule} from "../../components/avatar/avatar.module";
import {NotificationComponent} from "../../components/notification/notification.component";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {DialogModule} from "primeng/dialog";
import {RecordViewComponent} from "../../components/record-view/record-view.component";
import {
  AgendaService,
  DayService, MonthAgendaService,
  MonthService,
  ScheduleModule, TimelineMonthService, TimelineViewsService,
  WeekService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import {BookingScheduleComponent} from "../../components/booking-schedule/booking-schedule.component";
import {DateTimePickerModule} from "@syncfusion/ej2-angular-calendars";
import {DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {NumericTextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {EventBookingComponent} from "../../components/event-booking/event-booking.component";
import {CheckBoxModule} from "@syncfusion/ej2-angular-buttons";

@NgModule({
    imports: [
        ScheduleModule,
        // CoreUI Modules
        AccordionModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonGroupModule,
        ButtonModule,
        CardModule,
        CollapseModule,
        DropdownModule,
        FormModule,
        GridModule,
        ListGroupModule,
        NavModule,
        PaginationModule,
        PlaceholderModule,
        PopoverModule,
        ProgressModule,
        SharedModule,
        SpinnerModule,
        TableModule,
        TabsModule,
        TooltipModule,
        UtilitiesModule,
        CarouselModule,
        DocsComponentsModule,

        // Material Modules
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,

        // Angular Modules
        CommonModule,
        ReactiveFormsModule,

        // Custom Module
        BaseRoutingModule,
        IconComponent,
        MatSortHeader,
        MatSort,
        FormsModule,
        ConfirmDialogModule,
        ToastModule,
        CalendarModule,
        IconDirective,
        AvatarModule,
        ConfirmPopupModule,
        DialogModule,
        DateTimePickerModule,
        DropDownListModule,
        NumericTextBoxModule,
        ButtonModule,
        CheckBoxModule
    ],
  declarations: [
    AccordionsComponent,
    BreadcrumbsComponent,
    CardsComponent,
    CarouselsComponent,
    CollapsesComponent,
    ListGroupsComponent,
    NavsComponent,
    PaginationsComponent,
    PlaceholdersComponent,
    PopoversComponent,
    ProgressComponent,
    SpinnersComponent,
    TablesComponent,
    TooltipsComponent,
    TabsComponent,
    ListViewComponent,
    UpdateViewComponent,
    CreateViewComponent,
    AdminManagerComponent,
    RecordListComponent,
    PermissionComponent,
    NewFeedComponent,
    NewFeedContainerComponent,
    NotificationComponent,
    RecordViewComponent,
    BookingScheduleComponent,
    EventBookingComponent
  ],
  providers: [IconSetService, MessageService, ConfirmationService, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  exports: [
    NotificationComponent
  ]
})
export class BaseModule {
  public icons!: [string, string[]][];
  constructor(public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }
}
