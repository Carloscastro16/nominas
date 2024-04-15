import { ref } from 'vue';

export default function useDrawer() {
  const drawer = ref(true);
  const rail = ref(true);

  const toggleRail = () => {
    rail.value = !rail.value;
  };

  return {
    drawer,
    rail,
    toggleRail
  };
}