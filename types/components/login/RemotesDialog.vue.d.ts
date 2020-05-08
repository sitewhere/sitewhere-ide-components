import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "../core/DialogComponent";
import { IRemotes, IRemoteConnection } from "sitewhere-ide-common";
export default class RemotesDialog extends DialogComponent<IRemotes> {
    readonly dialog: ITabbedComponent;
    readonly connections: any;
    remotes: IRemotes | null;
    /** Get icon for dialog */
    get icon(): NavigationIcon;
    /** Reset dialog contents */
    reset(): void;
    /** Load dialog from a given payload */
    load(payload: IRemotes): void;
    /** Called when a new connection is added */
    onConnectionAdded(added: IRemoteConnection): void;
    /** Called after create button is clicked */
    onCreateClicked(): void;
}
