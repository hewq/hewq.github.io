<template>
    <div class="container">
        <div class="banner"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
@import '@styles/_function';

.container {
    .banner {
        @include wh(100%, 100vh);
        @include bg('~@images/banner.jpg', cover);
    }
}
</style>
