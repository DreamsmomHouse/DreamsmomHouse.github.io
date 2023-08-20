let interval = null;
let progress = [100, 75, 50, 25, 0], p = 0, nowSelected = 0;
let itemList = ['archer_pottery_sherd', 'miner_pottery_sherd', 'prize_pottery_sherd', 'skull_pottery_sherd', 'gunpowder', 'tnt', 'diamond', 'emerald'];
const pick = array => array[Math.floor(Math.random() * array.length)];

window.addEventListener('load', _ => {
    let sand = document.getElementById('sand');
    let sand_top = document.getElementById('sand_top');
    let sand_bottom = document.getElementById('sand_bottom');
    let sand_sound = document.getElementById('sand_sound');
    let pop_sound = document.getElementById('pop_sound');
    let item = document.getElementById('item');
    sand.onmousedown = sand.ontouchstart = _ => {
        if (p > 0) return;
        item.src = `img/items/${pick(itemList)}.png`;
        interval = setInterval(_ => {
            p++;
            if (p < 4)
                sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/suspicious_sand_${p}.png)`;
            item.style.top = progress[p] + 'px';
            sand_sound.currentTime = 0;
            sand_sound.play();
            if (p == 4) {
                clearInterval(interval);
                interval = null;
                setTimeout(_ => {
                    p = 0;
                    sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/suspicious_sand_${p}.png)`;
                    item.style.top = progress[p] + 'px';
                    pop_sound.currentTime = 0;
                    pop_sound.play();
                }, 1000);
            }
        }, 1.2 * 1000);
    }
    sand.onmouseup = sand.ontouchend = _ => {
        if (p != 4) {
            p = 0;
            sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/suspicious_sand_${p}.png)`;
            item.style.top = progress[p] + 'px';
        }
        if (interval != null)
            clearInterval(interval);
        interval = null;
    }
});

window.addEventListener('keypress', ev => {
    if (Array.from({ length: 9 }).map((_, i) => i + 1 + []).indexOf(ev.key) != -1)
        nowSelected = ev.key - 1;
    document.getElementById('selected').style.left = (nowSelected * 47 - 10) + 'px';
});

window.addEventListener('wheel', ev => {
    if (ev.deltaY > 0) nowSelected++;
    if (ev.deltaY < 0) nowSelected--;
    if (nowSelected < 0) nowSelected += 9;
    nowSelected %= 9;
    document.getElementById('selected').style.left = (nowSelected * 47 - 10) + 'px';
})