import { getStoreAccessors } from 'vuex-typescript';
import { merge } from 'lodash';

import { Dashboard, DashboardItem, DashboardState } from './state';

import { State as RootState } from '../state';

const { commit } = getStoreAccessors<DashboardState, RootState>('dashboards');

function updateDashboard(state: DashboardState, id: string, newData: any) {
  state.dashboards.byId = Object.assign(
    {},
    state.dashboards.byId,
    { [id]: merge(state.dashboards.byId[id], newData) },
  );
}

function updateDashboardItem(state: DashboardState, id: string, newData: any) {
  state.items.byId = Object.assign(
    {},
    state.items.byId,
    { [id]: merge(state.items.byId[id], newData) },
  );
}

const mutations = {
  addDashboard(state: DashboardState, dashboard: Dashboard) {
    state.dashboards.allIds.push(dashboard.id);
    state.dashboards.byId[dashboard.id] = { ...dashboard };
  },
  setDashboardOrder(state: DashboardState, { id, order }: { id: string, order: number }) {
    updateDashboard(state, id, { order });
  },
  addDashboardItem(state: DashboardState, item: DashboardItem) {
    state.items.allIds.push(item.id);
    state.items.byId[item.id] = { ...item };
  },
  mutateFetching(state: DashboardState, fetching: boolean) {
    state.fetching = fetching;
  },
  setDashboardItemOrder(state: DashboardState, { id, order }: { id: string, order: number }) {
    updateDashboardItem(state, id, { order });
  },
  setDashboardItemSize(
    state: DashboardState,
    { id, cols, rows }: { id: string, cols: number, rows: number },
  ) {
    updateDashboardItem(state, id, { cols, rows });
  },
};

// exported commit accessors
export const mutateFetching = commit(mutations.mutateFetching);
export const addDashboard = commit(mutations.addDashboard);
export const setDashboardOrder = commit(mutations.setDashboardOrder);
export const addDashboardItem = commit(mutations.addDashboardItem);
export const setDashboardItemOrder = commit(mutations.setDashboardItemOrder);
export const setDashboardItemSize = commit(mutations.setDashboardItemSize);

export default mutations;
