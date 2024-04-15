import { ref } from 'vue';

export default function useDrawer() {
  const drawer = ref(false);
  const rail = ref(false);

  const toggleRail = (state: boolean) => {
    rail.value = state;
    console.log('Side Status',rail.value)
  };

  return {
    drawer,
    rail,
    toggleRail
  };
}