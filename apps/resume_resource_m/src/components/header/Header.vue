<template>
    <div class="container" :class="{ bg: showBg }">
        <div class="content">
            <div class="title">Thomas' Website</div>
            <div class="nav">
                <Dropdown>
                    <span class="el-dropdown-link nav-item">
                        {{ page }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <dropdown-menu>
                        <dropdown-item>
                            <router-link to="/home" class="nav-item">Home</router-link>
                        </dropdown-item>
                        <dropdown-item>
                            <router-link to="/blog" class="nav-item">Blog</router-link>
                        </dropdown-item>
                        <dropdown-item>
                            <div @click="github" class="nav-item">Github</div>
                        </dropdown-item>
                    </dropdown-menu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Dropdown, DropdownMenu, DropdownItem, Button } from 'element-ui';

@Component({
    components: {
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Button
    }
})
export default class Header extends Vue {
    @Prop() private showBg!: boolean;
    @Prop() private page!: string;
    public github (): void {
        window.location.href = 'https://github.com/hewq';
    }
}
</script>

<style lang="scss" scoped>
@import '@styles/_function';

$height: p2r(200);

.container {
    position: relative;
    @include wh(100vw, $height);

    .content {
        width: p2r(700);
        height: $height;
        padding-top: p2r(30);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        box-sizing: border-box;
    }

    .title {
        padding-left: p2r(20);
        color: #fff;
        font-weight: bold;
        font-size: p2r(36);
    }

    .nav {
        padding-right: p2r(10);
        display: flex;

        .nav-item {
            color: #fff;
            font-size: p2r(30);
            margin: 0 p2r(10);
            font-weight: bold;
            cursor: pointer;

            &:hover, &.router-link-exact-active {
                color:#03aaaa;
            }

        }
    }

}

.bg {
    @include bg('~@images/banner_blog.jpg', cover, center top);
    background-image:linear-gradient(to right, rgba(42, 42, 42, 0.71), rgba(38, 40, 40, 0.78)), url('~@images/banner_blog.jpg');
}

</style>