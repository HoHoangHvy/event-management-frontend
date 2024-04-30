export class Module {
  route: string;
  moduleName: string;
  icon: string;

  constructor(route: string, moduleName: string, icon: string) {
    this.route = route;
    this.moduleName = moduleName;
    this.icon = icon;
  }
}
