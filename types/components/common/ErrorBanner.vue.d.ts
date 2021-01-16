import Vue from "vue";
export default class ErrorBanner extends Vue {
    readonly error: any;
    errorDisplayed: boolean;
    onErrorUpdated(updated: any): void;
    /** Get error message text */
    get errorMessage(): any;
}
