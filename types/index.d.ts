import { VueConstructor } from "vue";
import { CreateDialogComponent } from "./components/core/CreateDialogComponent";
import { DetailComponent } from "./components/core/DetailComponent";
import { DeleteDialogComponent } from "./components/core/DeleteDialogComponent";
import { DialogComponent } from "./components/core/DialogComponent";
import { DialogSection } from "./components/core/DialogSection";
import { EditDialogComponent } from "./components/core/EditDialogComponent";
import { HeaderComponent } from "./components/core/HeaderComponent";
import { ListComponent } from "./components/core/ListComponent";
export interface Options {
}
export declare function SiteWhereIdeComponents<Options>(Vue: VueConstructor, options: Options): void;
/** Core components */
export { CreateDialogComponent, DeleteDialogComponent, DetailComponent, DialogComponent, DialogSection, EditDialogComponent, HeaderComponent, ListComponent };
