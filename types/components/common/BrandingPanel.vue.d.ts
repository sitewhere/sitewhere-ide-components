import { IBrandedEntity } from "sitewhere-rest-api";
import { DialogSection } from "../core/DialogSection";
export default class BrandingPanel extends DialogSection {
    imageUrl: string | null;
    icon: string | null;
    backgroundColor: string | null;
    foregroundColor: string | null;
    borderColor: string | null;
    /** Reset section content */
    reset(): void;
    /** Perform validation */
    validate(): boolean;
    /** Load form data from an object */
    load(input: IBrandedEntity): void;
    /** Save form data to an object */
    save(): {};
}
