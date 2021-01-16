import Vue from "vue";
import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";
export default class RemotesDropdown extends Vue {
    readonly remotes: IRemoteInstances;
    selected: IRemoteInstance | null;
    get connections(): IRemoteInstance[];
    onConnectionsUpdated(updated: IRemoteInstance[]): void;
    onSelectionChanged(updated: IRemoteInstance): void;
    getNameAndUrl(connection: IRemoteInstance): string;
}
