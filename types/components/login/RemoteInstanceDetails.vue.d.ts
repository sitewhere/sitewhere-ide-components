import { DialogSection } from "../core/DialogSection";
import { IRemoteInstance } from "sitewhere-ide-common";
export default class RemoteInstanceDetails extends DialogSection {
    name: string | null;
    baseUrl: string | null;
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(input: {
        name: string;
        baseUrl: string;
    }): void;
    /** Save form data to an object */
    save(): IRemoteInstance;
    /** Called when create button is clicked */
    onCreateClicked(): void;
}
