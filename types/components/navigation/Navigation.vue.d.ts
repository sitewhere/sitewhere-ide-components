import Vue from "vue";
import { INavigationSection } from "sitewhere-ide-common";
export default class Navigation extends Vue {
    readonly sections: INavigationSection[];
    /** Check whether section is the currently selected */
    isSelectedSection(section: INavigationSection): boolean;
    /** Get currently selected section */
    containsSubsection(section: INavigationSection): boolean;
    /** Called when a section is clicked */
    onSectionClicked(section: INavigationSection): void;
}
