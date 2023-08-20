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
    }
]