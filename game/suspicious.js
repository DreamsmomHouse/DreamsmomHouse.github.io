let interval = null;
let progress = [100, 50, 6, -38, -50], p = 0;
let itemList = ['archer_pottery_sherd', 'miner_pottery_sherd', 'prize_pottery_sherd', 'skull_pottery_sherd', 'gunpowder', 'tnt', 'diamond', 'emerald'];
const pick = array => array[Math.floor(Math.random() * array.length)];

window.addEventListener('load', _ => {
    let sand = document.getElementById('sand');
    let sand_sound = document.getElementById('sand_sound');
    let pop_sound = document.getElementById('pop_sound');
    let item = document.getElementById('item');
    sand.onmousedown = _ => {
        if (p > 0) return;
        item.src = `img/items/${pick(itemList)}.png`;
        interval = setInterval(_ => {
            p++;
            item.style.top = progress[p] + 'px';
            sand_sound.currentTime = 0;
            sand_sound.play();
            if (p == 4) {
                clearInterval(interval);
                interval = null;
                setTimeout(_ => {
                    p = 0;
                    item.style.top = progress[p] + 'px';
                    pop_sound.currentTime = 0;
                    pop_sound.play();
                }, 1000);
            }
        }, 1.2 * 1000);
    }
    sand.onmouseup = _ => {
        p = 0;
        item.style.top = progress[p] + 'px';
        if (interval != null)
            clearInterval(interval);
        interval = null;
    }
});

window.addEventListener('keypress', ev => {
    if (Array.from({ length: 9 }).map((_, i) => i + 1 + []).indexOf(ev.key) != -1)
        document.getElementById('selected').style.left = ((ev.key - 1) * 47 - 10) + 'px';
});