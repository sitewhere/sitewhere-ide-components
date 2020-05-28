import Vue from "vue";
import { IBrandedEntity } from "sitewhere-rest-api";
export default class Multichooser extends Vue {
    readonly value: string[];
    readonly all: IBrandedEntity[];
    readonly idMode: boolean;
    selected: IBrandedEntity[];
    onValueUpdated(updated: string[]): void;
    onSelectionUpdated(): void;
}
