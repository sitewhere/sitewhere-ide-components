import Vue from "vue";
export default class DateTimePicker extends Vue {
    readonly value: Date;
    readonly label: string;
    date: string | null;
    time: string;
    datemenu: boolean;
    timemenu: boolean;
    onValueUpdated(updated: string): void;
    onDateUpdated(updated: string): void;
    onTimeUpdated(): void;
    /** Parse date in ISO8601 format */
    parseIso8601(value: string): Date | null;
}
