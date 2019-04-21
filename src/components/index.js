// Common components.
import LoadingOverlay from "./common/LoadingOverlay.vue";

// List components.
import ListEntry from "./list/ListEntry.vue";
import ListLayout from "./list/ListLayout.vue";
import ListPage from "./list/ListPage.vue";
import ListTab from "./list/ListTab.vue";
import Pager from "./list/Pager.vue";

// Process as Vue plugin.
const SiteWhere = {
  install(Vue, options) {
    // Register common components.
    Vue.component("sw-loading-overlay", LoadingOverlay);

    // Register list components.
    Vue.component("sw-list-entry", ListEntry);
    Vue.component("sw-list-layout", ListLayout);
    Vue.component("sw-list-page", ListPage);
    Vue.component("sw-list-tab", ListTab);
    Vue.component("sw-pager", Pager);
  }
};

// Export common components.
export { LoadingOverlay };

// Export list components.
export { ListEntry, ListLayout, ListPage, ListTab, Pager };

export default SiteWhere;
