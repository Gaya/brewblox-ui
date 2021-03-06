import { DashboardState } from './state';
import mutations from './mutations';

const {
  mutateFetching,
  addDashboard,
  addDashboardItem,
  setDashboardItemSize,
  setDashboardItemOrder,
} = mutations;

const defaultStore: DashboardState = {
  dashboards: {
    allIds: [],
    byId: {},
  },
  items: {
    allIds: [],
    byId: {},
  },
  fetching: false,
};

describe('mutateFetching', () => {
  const fetchingStore = { ...defaultStore };

  it('Should correctly update fetching to true', () => {
    mutateFetching(fetchingStore, true);

    expect(fetchingStore.fetching).toBe(true);
  });

  it('Should correctly update fetching back to false', () => {
    mutateFetching(fetchingStore, false);

    expect(fetchingStore.fetching).toBe(false);
  });
});

describe('addDashboard', () => {
  const dashboardStore = { ...defaultStore };

  it('Should add a dashboard to the store', () => {
    const dashboard = {
      id: 'test',
      title: 'Test Dashboard',
      order: 1,
      items: [],
    };

    addDashboard(dashboardStore, dashboard);

    // test if dashboard is added to list
    expect(dashboardStore.dashboards.allIds).toEqual(['test']);
    // test if dashboard item is correct
    expect(dashboardStore.dashboards.byId['test']).toEqual(dashboard);
  });

  it('Should add another dashboard to the store', () => {
    const dashboard = {
      id: 'testing',
      title: 'Test Dashboard 2',
      order: 2,
      items: [],
    };

    addDashboard(dashboardStore, dashboard);

    // test if dashboard is added to list
    expect(dashboardStore.dashboards.allIds).toEqual(['test', 'testing']);
    // test if dashboard item is correct
    expect(dashboardStore.dashboards.byId['testing']).toEqual(dashboard);
  });
});

describe('addDashboardItem', () => {
  const dashboardItemStore = { ...defaultStore };

  it('Should add a new dashboard item', () => {
    const dashboardItem = {
      id: 'test-item',
      order: 1,
      cols: 2,
      rows: 3,
      widget: <WidgetType>'Empty',
      options: {},
    };

    addDashboardItem(dashboardItemStore, dashboardItem);

    // test if dashboard is added to list
    expect(dashboardItemStore.items.allIds).toEqual(['test-item']);
    // test if dashboard item is correct
    expect(dashboardItemStore.items.byId['test-item']).toEqual(dashboardItem);
  });

  it('Should add another dashboard item', () => {
    const dashboardItem = {
      id: 'test-item-2',
      order: 2,
      cols: 2,
      rows: 3,
      widget: <WidgetType>'Empty',
      options: {},
    };

    addDashboardItem(dashboardItemStore, dashboardItem);

    // test if dashboard is added to list
    expect(dashboardItemStore.items.allIds).toEqual(['test-item', 'test-item-2']);
    // test if dashboard item is correct
    expect(dashboardItemStore.items.byId['test-item-2']).toEqual(dashboardItem);
  });
});

describe('setDashboardItemSize', () => {
  const dashboardItemSizeStore = { ...defaultStore };

  const dashboardItem = {
    id: 'test-item',
    order: 1,
    cols: 2,
    rows: 3,
    widget: <WidgetType>'Empty',
    options: {},
  };

  it('Should update an item\'s size', () => {
    addDashboardItem(dashboardItemSizeStore, dashboardItem);

    setDashboardItemSize(dashboardItemSizeStore, { id: 'test-item', cols: 5, rows: 5 });

    expect(dashboardItemSizeStore.items.byId['test-item'].cols).toBe(5);
    expect(dashboardItemSizeStore.items.byId['test-item'].rows).toBe(5);
  });
});

describe('setDashboardItemOrder', () => {
  const dashboardItemOrderStore = { ...defaultStore };

  const dashboardItem = {
    id: 'test-item',
    order: 1,
    cols: 2,
    rows: 3,
    widget: <WidgetType>'Empty',
    options: {},
  };

  it('Should update an item\'s order', () => {
    addDashboardItem(dashboardItemOrderStore, dashboardItem);

    setDashboardItemOrder(dashboardItemOrderStore, { id: 'test-item', order: 2 });

    expect(dashboardItemOrderStore.items.byId['test-item'].order).toBe(2);
  });
});
