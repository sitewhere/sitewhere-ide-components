import Vue from "vue";
import { IRemotes, IRemoteConnection } from "sitewhere-ide-common";
export default class RemotesDropdown extends Vue {
    readonly remotes: IRemotes;
    selected: IRemoteConnection | null;
    get connections(): IRemoteConnection[];
    onConnectionsUpdated(updated: IRemoteConnection[]): void;
    onSelectionChanged(updated: IRemoteConnection): void;
    getNameAndUrl(connection: IRemoteConnection): string;
}
