<template>
  <div
    :class="{
      fresh: props.state === 'fresh',
      notIncluded: props.state === 'not-included',
      wrongPos: props.state === 'wrong-pos',
      correct: props.state === 'correct',
      wider: !!$slots.viewer,
    }"
    class="text-3xl font-bold text-center landscape:rounded-xl portrait:rounded-md bg-slate-600 shadow-xl">
    <slot name="viewer">
      {{ props.character }}
    </slot>
  </div>
</template>
<script lang="ts" setup>
type Props = {
  character: string;
  state: string;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
div {
  $base: 40px;
  width: $base;
  height: $base;
  line-height: $base * 0.9;
  box-sizing: border-box;
  transition: 0.08s;
  @media screen and (min-width: 768px) {
    width: $base * 1.5;
    height: $base * 1.5;
    line-height: $base * 1.5 * 0.9;
  }
  @media screen and (min-width: 1200px) {
    width: $base * 2;
    height: $base * 2;
    line-height: $base * 2 * 0.9;
  }
}
</style>
