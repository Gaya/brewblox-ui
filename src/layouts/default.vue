<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        glossy
        color="dark-bright"
      >
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <portal-target name="toolbar-title">BrewBlox</portal-target>
        </q-toolbar-title>

        <portal-target name="toolbar-buttons" />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Main menu</q-list-header>
        <q-item
          link
          to="/settings"
        >
          <q-item-side icon="settings" />
          Settings
        </q-item>
        <q-item
          link
          to="/blocks"
        >
          <q-item-side icon="device hub" />
          Blocks
        </q-item>
        <q-item
          link
          to="/metrics"
        >
          <q-item-side icon="show chart" />
          Metrics
        </q-item>

        <q-item-separator />

        <q-list-header v-if="!isFetching">
          Dashboards

          <q-btn
            round
            flat
            icon="mode edit"
            size="sm"
            v-if="!dashboardEditing"
            @click="toggleDashboardEditing"
          />

          <q-btn
            round
            color="primary"
            icon="check"
            size="sm"
            v-if="dashboardEditing"
            @click="toggleDashboardEditing"
          />
        </q-list-header>

        <q-item v-if="!isFetching && dashboards.length === 0">
          No dashboards yet
        </q-item>

        <draggable
          :class="{ editing: dashboardEditing }"
          :options="{ disabled: !dashboardEditing }"
          v-model="dashboards"
        >
          <q-item
            v-for="dashboard in dashboards"
            :link="!dashboardEditing"
            :to="dashboardEditing ? undefined : `/dashboard/${ dashboard.id }`"
            :key="dashboard.id"
          >
            <q-item-main :label="dashboard.title" />

            <q-item-side
              right
              v-if="dashboardEditing"
            >
              <q-icon name="menu" />
            </q-item-side>
          </q-item>
        </draggable>

        <div class="q-list-container">
          <q-btn
            icon="add"
            color="dark-bright"
            v-if="dashboardEditing"
            @click="createDashboard"
          >
            add dashboard
          </q-btn>
        </div>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./default.ts" />

<style scoped>
.q-toolbar .vue-portal-target .q-btn {
  margin-left: 10px;
}

.q-list-container {
  padding: 16px;
}

.q-list-header {
  display: flex;
  align-items: center;
}

.q-list-header .q-btn {
  margin-left: auto;
  margin-right: 16px;
}

.q-list .editing .q-item {
  cursor: move;
}
</style>
