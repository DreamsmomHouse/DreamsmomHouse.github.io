let count = 0;
const srcList = [
    'img/suspicious_sand_0.png',
    'img/suspicious_sand_1.png',
    'img/suspicious_sand_2.png',
    'img/suspicious_sand_3.png',
    'img/sand.png',
    'img/suspicious_gravel_0.png',
    'img/suspicious_gravel_1.png',
    'img/suspicious_gravel_2.png',
    'img/suspicious_gravel_3.png',
    'img/gravel.png',
    'img/destroy/destroy_stage_0.png',
    'img/destroy/destroy_stage_1.png',
    'img/destroy/destroy_stage_2.png',
    'img/destroy/destroy_stage_3.png',
    'img/destroy/destroy_stage_4.png',
    'img/destroy/destroy_stage_5.png',
    'img/destroy/destroy_stage_6.png',
    'img/destroy/destroy_stage_7.png',
    'img/destroy/destroy_stage_8.png',
    'img/destroy/destroy_stage_9.png',
    'img/toasts.png'
];
const preLoad = () => {
    var img = new Image();
    img.src = srcList[count];
    count++;
    // 加载成功和失败都会执行
    img.onload = img.onerror = _ => {
        if (count == srcList.length)
            return;
        preLoad();
    }
}
preLoad();
