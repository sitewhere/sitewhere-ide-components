// List of auto-registered components.
import Pager from "./common/Pager.vue";
import LoadingOverlay from "./common/LoadingOverlay.vue";

// Process as Vue plugin.
export function install(Vue, options) {
  Vue.component("sw-pager", Pager);
  Vue.component("sw-loading-overlay", LoadingOverlay);
}
