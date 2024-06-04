import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionsComponent } from './accordion/accordions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { CollapsesComponent } from './collapses/collapses.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NavsComponent } from './navs/navs.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import {AccountInfoComponent} from "../../components/account-info/account-info.component";
import {ListViewComponent} from "../../components/list-view/list-view.component";
import {UpdateViewComponent} from "../../components/update-view/update-view.component";
import {CreateViewComponent} from "../../components/create-view/create-view.component";
import {AdminManagerComponent} from "../../components/admin-manager/admin-manager.component";
import {NewFeedComponent} from "../../components/new-feed/new-feed.component";
import {NewFeedContainerComponent} from "../../components/new-feed-container/new-feed-container.component";
import {BookingScheduleComponent} from "../../components/booking-schedule/booking-schedule.component";
import {EventBookingComponent} from "../../components/event-booking/event-booking.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'accordion',
        component: AccordionsComponent,
        data: {
          title: 'Accordion',
        },
      },
      {
        path: 'breadcrumbs',
        component: BreadcrumbsComponent,
        data: {
          title: 'Breadcrumbs',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards',
        },
      },
      {
        path: 'carousel',
        component: CarouselsComponent,
        data: {
          title: 'Carousel',
        },
      },
      {
        path: 'collapse',
        component: CollapsesComponent,
        data: {
          title: 'Collapse',
        },
      },
      {
        path: 'list-group',
        component: ListGroupsComponent,
        data: {
          title: 'List Group',
        },
      },
      {
        path: 'navs',
        component: NavsComponent,
        data: {
          title: 'Navs & Tabs',
        },
      },
      {
        path: 'pagination',
        component: PaginationsComponent,
        data: {
          title: 'Pagination',
        },
      },
      {
        path: 'placeholder',
        component: PlaceholdersComponent,
        data: {
          title: 'Placeholder',
        },
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popovers',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress',
        },
      },
      {
        path: 'spinners',
        component: SpinnersComponent,
        data: {
          title: 'Spinners',
        },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables',
        },
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs',
        },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips',
        },
      },
      {
        path: 'account-info',
        component: AccountInfoComponent,
        data: {
          title: 'Account Info',
        },
      },
      {
        path: 'list/:moduleName',
        component: ListViewComponent,
        data: {
          title: 'List View', // Static title or another suitable static value
        },
      },
      {
        path: 'detail/:moduleName/:id',
        component: UpdateViewComponent,
        data: {
          title: 'Detail View', // Static title or another suitable static value
        },
      },
      {
        path: 'create/:moduleName',
        component: CreateViewComponent,
        data: {
          title: 'Create View', // Static title or another suitable static value
        },
      },
      {
        path: 'admin-manager',
        component: AdminManagerComponent,
        data: {
          title: 'Admin View', // Static title or another suitable static value
        },
      },
      {
        path: 'new-feed',
        component: NewFeedContainerComponent,
      },
      {
        path: 'booking-schedule',
        component: BookingScheduleComponent,
      },
      {
        path: 'booking-event',
        component: EventBookingComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

