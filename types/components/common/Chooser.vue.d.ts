import Vue from "vue";
import { IBrandedEntity } from "sitewhere-rest-api";
export default class Chooser extends Vue {
    readonly value: string;
    readonly chosenText: string;
    readonly notChosenText: string;
    readonly all: IBrandedEntity[];
    selected: IBrandedEntity | null;
    onValueChanged(updated: string): void;
    /** Called to update choice based on token */
    onValueUpdated(token: string): void;
    /** Called to select an item */
    onSelected(entity: IBrandedEntity, emit: boolean): void;
    /** Called to remove selection */
    onRemoved(emit: boolean): void;
}
