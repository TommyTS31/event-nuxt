export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        console.log("clicked");
        // here I check that click was outside the el and his childrens
        if (!(el == event.target || el.contains(event.target))) {
          console.log("clicked");
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind: function (el) {
      console.log("clicked");
      document.body.removeEventListener("click", el.clickOutsideEvent);
    },
  });
});
