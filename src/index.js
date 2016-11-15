const Vue = require("vue");
const App = Vue.extend(require("./App.vue"));

Vue.component("draggable", require("./components/Draggable.vue"));
Vue.component("modal", require("./components/Modal.vue"));
Vue.component("noteam", require("./components/NoTeam.vue"));
Vue.component("ui-panel", require("./components/UiPanel.vue"));
Vue.component("teamview", require("./components/Teamview.vue"));
Vue.component("team-panel", require("./components/TeamPanel.vue"));
Vue.component("navigation", require("./components/Navigation.vue"));

new Vue({
  el: "#app",
  render: h => h(App)
});
