import Vue from "vue";
import { IScriptMetadata } from "sitewhere-rest-api";
export default class ScriptChooser extends Vue {
    readonly tenantId: string;
    readonly functionalArea: string;
    readonly category: string;
    readonly title: string;
    readonly label: string;
    readonly icon: string;
    readonly value: string;
    items: IScriptMetadata[];
    get wrapped(): string;
    set wrapped(updated: string);
    /** Perform reset on initial create */
    created(): void;
    /** Reload list of scripts for functional area */
    reset(): Promise<void>;
    onSelectionChanged(selection: any): void;
}
