import { ref, Ref } from '@vue/composition-api';

export interface UserToggleIF {
  show: Ref<boolean>;
  toggle(): void;
}

export const useToggle = (): UserToggleIF => {
  const show = ref<boolean>(true);
  const toggle = (): void => {
    show.value = !show.value;
  };
  return { show, toggle };
};
