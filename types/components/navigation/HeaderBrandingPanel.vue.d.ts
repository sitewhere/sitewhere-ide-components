import Vue from "vue";
import { IBrandedEntity } from "sitewhere-rest-api";
export default class HeaderBrandingPanel extends Vue {
    readonly entity: IBrandedEntity;
    /** Accessor for image URL */
    get imageUrl(): string | null;
    /** Accessor for icon */
    get icon(): string | null;
    get imageStyle(): {
        "background-color": string;
        "background-image": string;
        "background-size": string;
        "background-repeat": string;
        "background-position": string;
    };
}
