export const list = {
    phaser: [{
        fileName: 'irresponsibleNinja',
        img: require('@images/ninja.jpg'),
        title: 'Phaser 小游戏 —— 不靠谱的忍者',
        tag: 'phaser',
        date: '2020-11-19'
    }, {
        fileName: 'dragAndMatch',
        img: require('@images/match.jpg'),
        title: 'Phaser 小游戏——消消乐',
        tag: 'phaser',
        date: '2020-05-08'
    }, {
        fileName: 'growingCircle',
        img: require('@images/circle.jpg'),
        title: '[Phaser] 小游戏——小球成长',
        tag: 'phaser',
        date: '2020-04-27'
    }, {
        fileName: 'snapshotArea',
        img: require('@images/snapshot.jpg'),
        title: 'Phaser 画布截图',
        tag: 'phaser',
        date: '2020-04-27'
    }, {
        fileName: 'helloworld',
        img: require('@images/helloworld.jpg'),
        title: 'Phaser 的基本使用',
        tag: 'phaser',
        date: '2020-04-26'
    }],
    chrome: [{
        fileName: 'performance_reference',
        img: require('@images/performance_reference.jpg'),
        title: 'Chrome 开发者工具 —— Performance 使用参考',
        tag: 'chrome',
        date: '2020-10-02'
    }, {
        fileName: 'performance_start',
        img: require('@images/chrome.jpg'),
        title: 'Chrome 开发者工具 —— Performance 快速入门',
        tag: 'chrome',
        date: '2020-10-28'
    }, {
        fileName: 'command_menu',
        img: require('@images/command_menu.jpg'),
        title: 'Chrome 开发者工具 —— 命令行菜单（Command Menu）的使用',
        tag: 'chrome',
        date: '2020-11-12'
    }],
    interview: [{
        fileName: 'interview2020',
        img: require('@images/interview.jpg'),
        title: '2020前端面试题汇总（2020.05-2020.10）',
        tag: '面试题',
        date: '2020-10-28'
    }],
    lottie: [{
        fileName: 'lottie',
        img: require('@images/lottie.jpg'),
        title: '初探 lottie',
        tag: 'lottie',
        date: '2020-03-22'
    }]
};

declare interface Category {
    catagory: string;
    name: string;
}

const _category: Category[] = [];

for (const [key, value] of Object.entries(list)) {
    _category.push({
        catagory: key,
        name: `${value[0].tag}(${value.length})`
    });
}

export const category = _category;