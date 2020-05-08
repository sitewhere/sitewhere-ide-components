import { IRemotes, IRemoteConnection } from "sitewhere-ide-common";
import Vue from "vue";
export default class RemoteConnectionsList extends Vue {
    readonly remotes: IRemotes;
    selected: IRemoteConnection[];
    selection: IRemoteConnection | null;
    /** Single select item */
    onSelect(selected: IRemoteConnection): void;
    textStyle(conn: IRemoteConnection): {};
    get isUpDisabled(): boolean;
    get isDownDisabled(): boolean;
    get isDefaultDisabled(): boolean;
    get isDeleteDisabled(): boolean;
    get connections(): IRemoteConnection[];
    getNameAndUrl(connection: IRemoteConnection): string;
    /** Handle click on connection in list */
    onConnectionClicked(connection: IRemoteConnection): void;
    /** Get index for a connection */
    getConnectionIndex(connection: IRemoteConnection): number;
    /** Move connection up in the list */
    onConnectionMoveUp(): void;
    /** Move connection down in the list */
    onConnectionMoveDown(): void;
    /** Delete a connection */
    onConnectionDelete(): void;
    /** Set current selection as the default */
    onConnectionDefault(): void;
}
