import Vue from "vue";
import { INavigationSection } from "sitewhere-ide-common";
export default class Navigation extends Vue {
    readonly sections: INavigationSection[];
    /** Called when a section is clicked */
    onSectionClicked(section: INavigationSection): void;
}
