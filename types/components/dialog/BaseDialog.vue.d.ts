import Vue from "vue";
import { ITabbedComponent } from "sitewhere-ide-common";
export default class BaseDialog extends Vue implements ITabbedComponent {
    readonly title: string;
    readonly width: number;
    readonly icon: string;
    readonly visible: boolean;
    readonly tabbed: boolean;
    readonly createLabel: string;
    readonly cancelLabel: string;
    readonly error: string;
    readonly hideButtons: boolean;
    readonly hideCreate: boolean;
    readonly invalid: boolean;
    readonly loaded: boolean;
    readonly loadingMessage: string;
    active: number | null;
    onTabSelected(updated: string): void;
    /** Set the active tab */
    setActiveTab(tab: number): void;
    /** Handle cancel clicked */
    onCancelClicked(e: any): void;
    /** Handle create clicked */
    onCreateClicked(e: any): void;
}
