import Vue from 'vue';
import * as utils from '../tools/utils';

Vue.filter('toDec', utils.toDec);
Vue.filter('urlExplorer', utils.urlExplorer);
Vue.filter('urlIpfs', utils.urlIpfs);
