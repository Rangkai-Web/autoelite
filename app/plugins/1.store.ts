import type { Pinia } from "pinia";
// import { useAuthCommonStore } from "~/store/authStore";

export default defineNuxtPlugin(({ $pinia }) => {
  // const common = useAuthCommonStore($pinia as Pinia);

  return {
    provide: {
      store: {
        // common,
      },
    },
  };
});
