import Vue from 'vue';
import helpers from "./helper";
import _ from 'lodash';
import constant from "@/shared/config/constant";

const plugin = {
    install() {
        Vue.helpers = helpers
        Vue.prototype.$helpers = helpers;//global helper function utils
        Vue.prototype.$_ = _;//global lodash
        Vue.prototype.$const = constant; //global constant config
    }
}
export default plugin;