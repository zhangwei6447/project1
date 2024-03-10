
import MyTabs from "./MyTabs.vue";
import BlankLayout from "./BlankLayout.vue";
import MainLayout from "./MainLayout.vue";

export default function myTabs(app) {
    app.component('MyTabs', MyTabs)
    app.component('BlankLayout', BlankLayout)
    app.component('MainLayout', MainLayout)
}