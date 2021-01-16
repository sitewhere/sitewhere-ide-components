import Vue from "vue";
/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
export declare class HeaderComponent<T> extends Vue {
    readonly record: T;
    formatDate(date: Date): string;
}
