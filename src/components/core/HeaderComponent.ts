import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { formatDate } from "sitewhere-ide-common";

/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
@Component
export class HeaderComponent<T> extends Vue {
    @Prop() readonly record!: T;

    // Handle date formatting in a standard way.
    formatDate(date: Date) {
        return formatDate(date);
    }
}
