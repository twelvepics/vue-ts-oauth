import { shallowMount } from '@vue/test-utils';
import HomeComp from '@/components/HomeComp.vue';

describe('HomeComp.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HomeComp, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
