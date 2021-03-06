import { get, put, post } from '@/core/fetch';
import { spreadData, unspreadData } from '@/core/api-spread';

import { Dashboard, DashboardItem, DashboardAPI } from './state';

export function fetchDashboards(): Promise<Dashboard[]> {
  return get('/dashboards')
    .then(dashboards => dashboards.map((dashboard: DashboardAPI) => spreadData(dashboard)));
}

export function createDashboard(dashboard: Dashboard): Promise<boolean> {
  return post('/dashboards', unspreadData(dashboard));
}

export function persistDashboard(id: string, newData: any): Promise<Dashboard> {
  return put(`/dashboards/${encodeURIComponent(id)}`, unspreadData(newData));
}

export function fetchDashboardItems(): Promise<DashboardItem[]> {
  return get('/dashboard-items')
    .then(dashboardItems => dashboardItems.map((item: any) => spreadData(item)));
}

export function persistDashboardItem(id: string, newData: any): Promise<DashboardItem> {
  return put(`/dashboard-items/${encodeURIComponent(id)}`, unspreadData(newData));
}
