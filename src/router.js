import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/polls/create",
      name: "create",
      component: () => import("./views/CreatePoll.vue")
    },
    {
      path: "/polls/:id",
      name: "poll-view",
      component: () => import("./views/PollView.vue")
    },
    {
      path: "/polls",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "*",
      redirect: "/polls"
    }
  ]
});
