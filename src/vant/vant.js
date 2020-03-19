import Vue from 'vue';
import { Button } from 'vant';
import { Icon } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Loading } from 'vant';
import { Tab, Tabs } from 'vant';
import { Toast } from 'vant';
import { TreeSelect } from 'vant';
import { AddressList } from 'vant';

Vue.use(AddressList);
Vue.use(TreeSelect);
Vue.use(Toast)
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Button);