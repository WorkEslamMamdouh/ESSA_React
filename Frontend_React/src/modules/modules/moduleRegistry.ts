export interface ModuleRouteDefinition {
  moduleCode: string;
  route: string;
  title: string;
}

export const moduleRouteRegistry: ModuleRouteDefinition[] = [
  {
    moduleCode: 'TR_Sales',
    route: '/app/tr-sales',
    title: 'Sales Transaction'
  },
  {
    moduleCode: 'ViewSales',
    route: '/app/view-sales',
    title: 'View Sales'
  },
  {
    moduleCode: 'Purchases',
    route: '/app/purchases',
    title: 'Purchases'
  }
];
