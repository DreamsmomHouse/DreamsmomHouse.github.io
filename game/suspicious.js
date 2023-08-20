let interval = null, brushed = false;
let progress = [100, 75, 50, 25, 0], p = 0, d = -1, nowSelected = 0;
let itemList = ['archer_pottery_sherd', 'miner_pottery_sherd', 'prize_pottery_sherd', 'skull_pottery_sherd', 'gunpowder', 'tnt', 'diamond', 'emerald'];
const pick = array => array[Math.floor(Math.random() * array.length)];

window.addEventListener('load', _ => {
    let sand = document.getElementById('sand');
    let destroy = document.getElementById('destroy');
    let sand_top = document.getElementById('sand_top');
    let sand_bottom = document.getElementById('sand_bottom');
    let sand_sound = document.getElementById('sand_sound');
    let pop_sound = document.getElementById('pop_sound');
    let dig_sound = document.getElementById('dig_sound');
    let destroy_sound = document.getElementById('destroy_sound');
    let item = document.getElementById('item');
    sand.onmousedown = sand.ontouchstart = _ => {
        if (p > 0) return;
        if (nowSelected == 0 && !brushed) {
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
                        p = 0; brushed = true;
                        sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/sand.png)`;
                        item.style.top = progress[p] + 'px';
                        pop_sound.currentTime = 0;
                        pop_sound.play();
                    }, 1000);
                }
            }, 1.2 * 1000);
        } else if (nowSelected == 1) {
            interval = setInterval(_ => {
                d++;
                if (d >= 0)
                    destroy.style.backgroundImage = `url(img/destroy/destroy_stage_${d}.png)`;
                destroy.hidden = false;
                if (d == 10) {
                    clearInterval(interval);
                    interval = null; brushed = Math.floor(Math.random() * 2) != 0;
                    d = 0;
                    destroy.style.backgroundImage = null;
                    destroy_sound.currentTime = 0;
                    destroy_sound.play();
                    sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/${brushed ? 'sand' : 'suspicious_sand_' + p}.png)`;
                    destroy.hidden = true;
                } else {
                    dig_sound.currentTime = 0;
                    dig_sound.play();
                }
            }, 0.15 * 1000);
        }
    }
    sand.onmouseup = sand.ontouchend = _ => {
        destroy.hidden = true;
        if (p != 4) {
            p = 0;
            sand_top.style.backgroundImage = sand_bottom.style.backgroundImage = `url(img/${brushed ? 'sand' : 'suspicious_sand_' + p}.png)`;
            item.style.top = progress[p] + 'px';
        }
        if (d >= 0) {
            d = -1;
            destroy.style.backgroundImage = null;
        }
        if (interval != null)
            clearInterval(interval);
        interval = null;
    }
});

window.addEventListener('keypress', ev => {
    if (Array.from({ length: 9 }).map((_, i) => i + 1 + []).indexOf(ev.key) != -1)
        nowSelected = ev.key - 1;
    inventoryClick(nowSelected);
});

window.addEventListener('wheel', ev => {
    if (ev.deltaY > 0) nowSelected++;
    if (ev.deltaY < 0) nowSelected--;
    if (nowSelected < 0) nowSelected += 9;
    nowSelected %= 9;
    inventoryClick(nowSelected);
})

const inventoryClick = (num) => {
    console.log(num)
    nowSelected = num;
    document.getElementById('selected').style.left = (nowSelected * 47 - 10) + 'px';
}