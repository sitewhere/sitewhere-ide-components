import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "../core/DialogComponent";
import { DialogSection } from "../core/DialogSection";
import { IRemotes, IRemoteConnection } from "sitewhere-ide-common";
export default class RemotesDialog extends DialogComponent<IRemotes> {
    readonly dialog: ITabbedComponent;
    readonly connections: DialogSection;
    remotes: IRemotes | null;
    /** Get icon for dialog */
    get icon(): NavigationIcon;
    reset(): void;
    load(payload: IRemotes): void;
    onConnectionAdded(added: IRemoteConnection): void;
    onCreateClicked(): void;
}
