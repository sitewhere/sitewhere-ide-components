import { DialogSection } from "../core/DialogSection";
export default class RemoteConnectionDetails extends DialogSection {
    name: string | null;
    protocol: string | null;
    host: string | null;
    port: number | null;
    protocols: {
        text: string;
        value: string;
    }[];
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(input: {
        name: string;
        protocol: string;
        host: string;
        port: number;
    }): void;
    /** Save form data to an object */
    save(): {};
    /** Called when create button is clicked */
    onCreateClicked(): void;
}
