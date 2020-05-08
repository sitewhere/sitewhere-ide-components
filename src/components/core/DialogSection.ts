import Vue from "vue";
import { Component } from "vue-property-decorator";

/**
 * Base class for dialog sections.
 */
@Component({})
export class DialogSection extends Vue {
    /** Called on component create */
    created(): void {
        this.reset();
    }

    /** Reset section content */
    reset(): void {
        throw new Error("Reset not implemented in dialog section.");
    }

    /** Validate fields in the dialog section */
    validate(): boolean {
        return true;
    }

    /** Load form data from an object */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    load(input: {}): void { }

    /** Save form data to an object */
    save(): {} {
        return {};
    }
}