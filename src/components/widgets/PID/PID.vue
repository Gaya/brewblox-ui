<template>
  <div>
    <q-toolbar color="dark-bright">
      <q-toolbar-title>
        {{ block.id }}
      </q-toolbar-title>

      <q-btn
        flat
        round
        dense
        icon="settings"
        @click="openModal"
      />
    </q-toolbar>

    <q-card>
      <q-card-actions>
        <q-btn
          flat
          round
          dense
          icon="refresh"
          @click="refreshState"
        />
      </q-card-actions>

      <q-list>
        <q-item class="grid-items-2">
          <q-item-side>
            <q-item-tile sublabel>Input</q-item-tile>
            <q-item-tile
              label
              class="q-headline"
            >
              {{ state.inputValue }}
            </q-item-tile>
          </q-item-side>
          <q-item-side>
            <q-item-tile sublabel>Setpoint</q-item-tile>
            <q-item-tile
              label
              class="q-headline"
            >
              {{ state.inputSetting }}
            </q-item-tile>
          </q-item-side>
        </q-item>
        <q-item-separator />
        <q-item class="grid-items-3">
          <q-item-side>
            <q-item-tile sublabel>P</q-item-tile>
            <q-item-tile label>{{ state.p }}</q-item-tile>
          </q-item-side>
          <q-item-side>
            <q-item-tile sublabel>I</q-item-tile>
            <q-item-tile label>{{ state.i }}</q-item-tile>
          </q-item-side>
          <q-item-side>
            <q-item-tile sublabel>D</q-item-tile>
            <q-item-tile label>{{ state.d }}</q-item-tile>
          </q-item-side>
        </q-item>
        <q-item-separator />
        <q-item>
          <q-item-side>
            <q-item-tile sublabel>Output</q-item-tile>
            <q-item-tile
              label
              class="q-display-2"
            >
              {{ state.outputValue }}
            </q-item-tile>
          </q-item-side>
        </q-item>
      </q-list>
    </q-card>

    <q-modal
      v-model="modalOpen"
      :content-css="{ minWidth: '80vw', minHeight: '80vh' }"
    >
      <q-modal-layout>
        <q-toolbar slot="header" color="dark-bright">
          <q-toolbar-title>
            PID Settings
          </q-toolbar-title>
          <q-btn
            flat
            @click="closeModal"
          >
            Close
          </q-btn>
        </q-toolbar>

        <q-list>
          <q-list-header>Settings</q-list-header>
          <q-item class="grid-items-3">
            <q-item-main>
              <q-input
                v-model="inputs.kp"
                stack-label="KP"
                placeholder="KP of PID"
                type="number"
              />
            </q-item-main>
            <q-item-main>
              <q-input
                v-model="inputs.ti"
                stack-label="TI"
                placeholder="TI of PID"
                type="number"
              />
            </q-item-main>
            <q-item-main>
              <q-input
                v-model="inputs.td"
                stack-label="TD"
                placeholder="TD of PID"
                type="number"
              />
            </q-item-main>
          </q-item>
          <q-item-separator />
          <q-list-header>Links</q-list-header>
          <q-item class="grid-items-2">
            <q-item-main>
              <q-select
                v-model="inputs.linkInput"
                stack-label="Input"
                placeholder="Input of PID"
                clearable
                :options="allSensorSetPointPairs"
              />
            </q-item-main>
            <q-item-main>
              <q-select
                v-model="inputs.linkOutput"
                stack-label="Output"
                placeholder="Output of PID"
                clearable
                :options="allSensorSetPointPairs"
              />
            </q-item-main>
          </q-item>
          <q-item-separator />
          <q-list-header>Filtering</q-list-header>
          <q-item class="grid-items-2">
            <q-item-main>
              <q-input
                v-model="inputs.filteringInput"
                stack-label="Input"
                placeholder="Filtering input"
                type="number"
              />
            </q-item-main>
            <q-item-main>
              <q-input
                v-model="inputs.filteringDerivative"
                stack-label="Derivative"
                placeholder="Filtering derivative"
                type="number"
              />
            </q-item-main>
          </q-item>
        </q-list>
        <q-card-actions>
          <q-card-actions>
            <q-btn
              icon="check"
              :color="changed ? 'primary' : 'light'"
              :disable="!changed"
              @click="save"
            >
              Save
            </q-btn>

            <q-btn
              icon="check"
              :color="kpChanged ? 'primary' : 'light'"
              :disable="!kpChanged"
              @click="updateKP"
            >
              Update KP
            </q-btn>
            <q-btn
              icon="check"
              @click="randomKP"
            >
              Random KP from store
            </q-btn>
          </q-card-actions>
        </q-card-actions>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script lang="ts" src="./PID.ts" />

<style scoped>
.dashboard-item .q-card {
  box-shadow: none;
}

.q-item {
  display: grid;
  grid-gap: 10px;
}

.grid-items-2 {
  grid-template-columns: 1fr 1fr;
}

.grid-items-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.q-item-side {
  text-align: center;
  margin-left: 0;
}

.q-item-section {
  margin-left: 0;
}

.modal .q-list {
  border: 0;
}
</style>
