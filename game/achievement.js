let config = null;

window.addEventListener('load', _ => {
    config = JSON.parse(window.localStorage.getItem('user_data')) ?? {
        dig_sand: 0, dig_gravel: 0, brush_sand: 0, brush_gravel: 0, achi: []
    };
})

const checkAchievement = _ => {
    for (let { id, name, detail, judge } of achievements) {
        if (config.achi.indexOf(id) != -1) continue;
        if (judge(config)) {
            config.achi.push(id);
            showNotice('达成成就！' + name, detail)
        }
    }
}

const showNotice = (title, content) => {
    let notice = document.getElementById('notice');
    let achievement_sound = document.getElementById('achievement_sound');
    document.getElementById('notice_title').innerHTML = title;
    document.getElementById('notice_content').innerHTML = content;
    notice.style.top = '0px';
    achievement_sound.currentTime = 0;
    achievement_sound.play();
    setTimeout(_ => notice.style.top = '-65px', 6000);
}

const achievements = [
    {
        id: 0,
        name: '开启你的考古之旅',
        detail: '找到一个可疑的方块',
        judge: (config) => config.brush_sand + config.brush_gravel >= 1
    }, {
        id: 1,
        name: '考古之路I',
        detail: '挖掘10个方块',
        judge: (config) => config.dig_gravel + config.dig_sand >= 10
    }, {
        id: 2,
        name: '考古之路II',
        detail: '挖掘50个方块',
        judge: (config) => config.dig_gravel + config.dig_sand >= 50
    }, {
        id: 3,
        name: '考古之路III',
        detail: '挖掘100个方块',
        judge: (config) => config.dig_gravel + config.dig_sand >= 100
    }, {
        id: 4,
        name: '考古之路IV',
        detail: '挖掘300个方块',
        judge: (config) => config.dig_gravel + config.dig_sand >= 300
    }, {
        id: 5,
        name: '收藏之路I',
        detail: '清理10个可疑的方块',
        judge: (config) => config.brush_sand + config.brush_gravel >= 10
    }, {
        id: 6,
        name: '收藏之路II',
        detail: '清理50个可疑的方块',
        judge: (config) => config.brush_sand + config.brush_gravel >= 50
    }, {
        id: 7,
        name: '收藏之路III',
        detail: '清理100个可疑的方块',
        judge: (config) => config.brush_sand + config.brush_gravel >= 100
    }, {
        id: 8,
        name: '收藏之路IV',
        detail: '清理300个可疑的方块',
        judge: (config) => config.brush_sand + config.brush_gravel >= 300
    }
]