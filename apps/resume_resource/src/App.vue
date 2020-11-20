<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    methods: {
        a (): void {
            console.log('a');
        }
    }
});
</script>

<style lang="scss">
@import '@styles/_global';
</style>
