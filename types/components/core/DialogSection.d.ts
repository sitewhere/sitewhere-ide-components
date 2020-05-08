import Vue from "vue";
/**
 * Base class for dialog sections.
 */
export declare class DialogSection extends Vue {
    /** Called on component create */
    created(): void;
    /** Reset section content */
    reset(): void;
    /** Validate fields in the dialog section */
    validate(): boolean;
    /** Load form data from an object */
    load(input: {}): void;
    /** Save form data to an object */
    save(): {};
}
