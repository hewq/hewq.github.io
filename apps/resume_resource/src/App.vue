<template>
  <div id="app">
    <router-view></router-view>
    <Backtop>
        <i class="el-icon-caret-top"></i>
    </Backtop>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Backtop } from 'element-ui';

@Component({
    components: {
        Backtop
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@styles/_global';
</style>
