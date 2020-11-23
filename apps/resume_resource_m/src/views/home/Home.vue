<template>
    <div class="container">
        <div class="banner">
            <Header :showBg="false" :page="'Home'"></Header>
            <div class="info">
                <div class="avatar"></div>
                <div class="greet">Hello, I' m Thomas Ho</div>
                <div class="job">Front End Engineer</div>
            </div>
        </div>
        <div class="about">
            <div class="brife">
                <div class="brife-title">About Me</div>
                <div class="pic"></div>
                <p>
                    {{ years }}年多以来，前端开发一直是我工作的中心。在这个快速而令人兴奋的旅程中，我已经从一个门外汉变成了一个能够独当一面前端工程师。
                    前端技术的不断更新，促使着我不断地去学习，这是一件不可松懈的事情。
                </p>
                <p>
                    目前，这段旅程让我来到了{{company}}，在那里我是一名 {{job}}。在这个职位上，和许多的前端工程师一样，使用 vue 开发项目。
                </p>
            </div>
        </div>
        <div class="experiences">
            <div class="work">
                <div class="title">Experience</div>
                <Item :company="company" :date="'2020.10 - 至今'" :address="'广州'" :job="job"></Item>
                <Item :company="'深圳大骨科技有限公司'" :date="'2018.03 - 2020.05'" :address="'深圳'" :job="'前端开发组长'"></Item>
                <Item :company="'深圳市通则技术股份有限公司'" :date="'2017.03 - 2018.03'" :address="'深圳'" :job="'Web 前端工程师'"></Item>
            </div>
            <div class="education">
                <div class="title">Education</div>
                <Item :company="'惠州学院'" :date="'2013.09 - 2017.06'" :address="'惠州'" :job="'本科 | 计算机科学与技术专业'"></Item>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@components/header/Header.vue';
import Footer from '@components/footer/Footer.vue';
import Item from '@components/item/Item.vue';

@Component({
    components: {
        Header,
        Footer,
        Item
    }
})

export default class Home extends Vue {
    private company = '网易';
    private job = 'Web 前端工程师';

    get years (): number {
        return new Date().getFullYear() - 2017;
    }
}

</script>

<style lang="scss" scoped>
@import '@styles/_function';

.container {
    .banner {
        position: relative;
        @include wh(p2r(750), 100vh);
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

        .info {
            position: absolute;
            @include center();
            height: p2r(400);
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;

            .avatar {
                border: p2r(4) solid #ffffff;
                border-radius: 50%;
                @include bg('~@images/avatar.jpg');
                @include wh(p2r(200), p2r(200));
                box-sizing: border-box;
            }

            .greet {
                font-size: p2r(56);
                color: #ffffff;
                font-weight: 600;
                padding-top: p2r(20);
                box-sizing: border-box;
            }

            .job {
                font-size: p2r(30);
                color: #ffffff;
            }
        }
    }

    .about {
        margin: p2r(40) auto;
        @include wh(p2r(700), p2r(1000));
        display: flex;
        justify-content: space-between;
        align-items: center;

        .brife {
            @include wh(p2r(700), 100%);
            display: flex;
            flex-direction: column;

            .brife-title {
                font-size: p2r(60);
                line-height: p2r(100);
                color: #03aaaa;
                padding-bottom: p2r(20);
            }

            p {
                font-size: p2r(26);
                font-weight: 300;
                line-height: 1.6;
                color: #666666;
                letter-spacing: p2r(3);
                padding: p2r(20) 0;
            }
        }

        .pic {
            @include wh(p2r(700), p2r(600));
            @include bg('~@images/life.jpg');
        }
    }

    .experiences {
        position: relative;
        @include wh(100%, auto);
        padding: p2r(30) 0;
        box-sizing: border-box;
        background: linear-gradient(90deg, #03a9f4, #03aaaa);

        .work, .education {
            display: flex;
            flex-direction: column;
            @include wh(p2r(700), auto);
            margin: p2r(40) auto;

            .title {
                color: #ffffff;
                font-size: p2r(80);
                padding: 0 0 p2r(30);
            }
        }
    }
}
</style>
