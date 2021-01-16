import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "../core/DialogComponent";
import { DialogSection } from "../core/DialogSection";
import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";
export default class RemotesDialog extends DialogComponent<IRemoteInstances> {
    readonly dialog: ITabbedComponent;
    readonly connections: DialogSection;
    remotes: IRemoteInstances | null;
    /** Get icon for dialog */
    get icon(): NavigationIcon;
    reset(): void;
    load(payload: IRemoteInstances): void;
    onConnectionAdded(added: IRemoteInstance): void;
    onCreateClicked(): void;
}
