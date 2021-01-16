import { ITableHeaders } from "sitewhere-ide-common";
import { DialogSection } from "../core/DialogSection";
export default class MetadataPanel extends DialogSection {
    readonly readOnly: boolean;
    readonly noDataMessage: string;
    readonly pageSizes: number[];
    metadata: {
        name: string;
        value: string;
    }[];
    newItemName: string;
    newItemValue: string;
    error: string | null;
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(input: any): void;
    /** Save form data to an object */
    save(): {};
    /** Delete an item */
    onDeleteItem(deleteName: string): void;
    onAddItem(): void;
    get headers(): ITableHeaders;
}
