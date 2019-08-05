<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-menu
        v-model="datemenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            :label="label"
            placeholder=" "
            prepend-icon="event"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker v-model="date" @input="datemenu = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs4 v-if="date">
      <v-menu
        ref="menu"
        v-model="timemenu"
        :close-on-content-click="false"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time"
            label=" "
            placeholder=" "
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timemenu"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import moment from "moment";

@Component({})
export default class DateTimePicker extends Vue {
  @Prop() readonly value!: Date;
  @Prop() readonly label!: string;

  date: string | null = null;
  time: string = "12:00";
  datemenu: boolean = false;
  timemenu: boolean = false;

  @Watch("value")
  onValueUpdated(updated: string) {
    if (updated) {
      let datetime: Date | null = this.parseIso8601(updated);
      if (datetime) {
        this.time =
          datetime
            .getHours()
            .toString()
            .padStart(2, "0") +
          ":" +
          datetime
            .getMinutes()
            .toString()
            .padStart(2, "0");
        this.date = moment(updated).format("YYYY-MM-DD");
      }
    } else {
      this.date = null;
      this.time = "12:00";
    }
  }

  @Watch("date")
  onDateUpdated(updated: string) {
    if (updated) {
      let value: Date = moment(updated).toDate();
      let parts: string[] = this.time.split(":");
      let hour = parseInt(parts[0]);
      let minute = parseInt(parts[1]);
      value.setHours(hour, minute);
      this.$emit("input", value);
    }
  }

  @Watch("time")
  onTimeUpdated(updated: string) {
    if (this.date) {
      this.onDateUpdated(this.date);
    }
  }

  /** Parse date in ISO8601 format */
  parseIso8601(value: string) {
    if (!value) {
      return null;
    }
    return moment(value).toDate();
  }
}
</script>
