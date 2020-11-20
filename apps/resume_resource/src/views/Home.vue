<template>
    <div class="container">
        <div class="banner">
            <Header :showBg="true"></Header>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@components/Header.vue';

@Component({
    components: {
        Header
    }
})

export default class Home extends Vue {}

</script>

<style lang="scss" scoped>
@import '@styles/_function';

.container {
    .banner {
        position: relative;
        @include wh(100vw, 100vh);
        @include bg('~@images/banner.jpg', cover);
        &::before {
            content: '';
            background: rgba(0, 0, 0, 0.57);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
}
</style>
