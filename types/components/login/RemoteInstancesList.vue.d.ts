import Vue from "vue";
import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";
export default class RemoteInstancesList extends Vue {
    readonly remoteInstances: IRemoteInstances;
    selected: IRemoteInstance[];
    selection: IRemoteInstance | null;
    /** Single select item */
    onSelect(selected: IRemoteInstance): void;
    textStyle(conn: IRemoteInstance): {};
    get isUpDisabled(): boolean;
    get isDownDisabled(): boolean;
    get isDefaultDisabled(): boolean;
    get isDeleteDisabled(): boolean;
    get instances(): IRemoteInstance[];
    getNameAndUrl(instance: IRemoteInstance): string;
    /** Handle click on instance in list */
    onConnectionClicked(instance: IRemoteInstance): void;
    /** Get index for an instance */
    getInstanceIndex(instance: IRemoteInstance): number;
    /** Move instance up in the list */
    onConnectionMoveUp(): void;
    /** Move instance down in the list */
    onConnectionMoveDown(): void;
    /** Delete an instance */
    onConnectionDelete(): void;
    /** Set current selection as the default */
    onConnectionDefault(): void;
}
