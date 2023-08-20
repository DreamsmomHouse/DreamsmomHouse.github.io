let count = 0;
const srcList = ['img/suspicious_sand_0.png', 'img/suspicious_sand_1.png', 'img/suspicious_sand_2.png', 'img/suspicious_sand_3.png'];
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
