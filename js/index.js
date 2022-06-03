window.onload = () => {
  loadTable();
  loadMeme();
  clock();
  loadConsoleMessage();
}

const loadTable = async () => {
  result = await downloadAssets('data.json');
  table = document.getElementById('table');

  for (i = 0; i < 8; i++) {
    let counter = 0;
    for (let { } in result[i]['data']) {
      buttonNode = document.createElement('button');
      buttonNode.className = result[i]['data'][counter]['allow'];
      buttonNode.style.position = 'absolute';
      buttonNode.style.marginLeft = `${300 + 300 * counter}px`;
      buttonNode.style.marginTop = `${50 * i + 55}px`;
      buttonNode.style.width = '300px';
      buttonNode.style.height = '50px';
      buttonNode.name = result[i]['data'][counter]['location'];

      const id = result[i]['data'][counter]['location'];
      buttonNode.onclick = () => {
        window.open(`info.html?info&${id}`, '_blank');
      }

      roomNode = document.createElement('span');
      roomNode.className = 'normalClass';
      roomNode.style.width = '300px';
      roomNode.innerHTML = `${result[i]['data'][counter]['location']} ${result[i]['data'][counter]['name']}<br>
      ${result[i]['data'][counter]['stats']} 热度：${result[i]['data'][counter]['temp']}`;
      buttonNode.appendChild(roomNode);
      table.appendChild(buttonNode);
      counter++;
    }
  }
}

const loadMeme = async () => {
  memeResult = await downloadAssets('DataBase/meme.json');
  memeCnt = 0;
  for (let { } in memeResult) memeCnt++;
  memeNo = Math.floor(Math.random() * memeCnt);
  document.getElementById('meme').innerText = '今日笑话：' + memeResult[memeNo]['data'];
  document.getElementById('memeAuthor').innerText = memeResult[memeNo]['author'] != '' ? '---' + memeResult[memeNo]['author'] : '';
}

const seeMemeDetail = () => {
  if (memeResult[memeNo]['url'] != '')
    window.open(memeResult[memeNo]['url'], '_blank');
}

const clock = () => {
  //yyyy/mm/dd hh:mm:ss
  let timerNode = document.getElementById('timer');
  let date = new Date();
  let string = '当前时间：' + betterShow(date.getFullYear(), 4) + '/' + betterShow(date.getMonth() + 1, 2) + '/' + betterShow(date.getDate(), 2) + ' ';
  string += betterShow(date.getHours(), 2) + ':' + betterShow(date.getMinutes(), 2) + ':' + betterShow(date.getSeconds(), 2);
  timerNode.innerText = string;
}

const betterShow = (num, digit) => {
  let string = '';
  let num_string = num.toString();
  for (let i = 0; i < digit - num_string.length; i++)
    string += '0';
  string += num_string;
  return string;
}
setInterval(clock, 1000);

const dxzp = () => {
  window.open('https://www.bilibili.com/video/BV1GJ411x7h7', '_blank');
}

const downloadAssets = async (url) => {
  try {
    console.log(url);
    return await fetch(url).then(res => res.json());
  } catch (error) {
    return {};
  }
}

const openFanPage = () => {
  let url = document.baseURI.replace('index.html', '').replace('index', '') + 'info.html?fan';
  window.open(url, '_blank');
}

const openUpdateLog = () => {
  let url = document.baseURI.replace('index.html', '').replace('index', '') + 'info.html?UpdateLog';
  window.open(url, '_blank');
}

const loadConsoleMessage = () => {
  console.log("                            _ooOoo_ ");
  console.log("                           o8888888o ");
  console.log("                           88\". \"88 ");
  console.log("                           (| -_- |) ");
  console.log("                            O\\ = /O ");
  console.log("                        ____/`---'\\____ ");
  console.log("                      .   ' \\\\| |// `. ");
  console.log("                       / \\\\||| 1 |||// \\ ");
  console.log("                     / _||||| -9- |||||- \\ ");
  console.log("                       | | \\\\\\ 9 /// | | ");
  console.log("                     | \\_| ''\\-8-/'' | | ");
  console.log("                      \\ .-\\__ `0` ___/-. / ");
  console.log("                   ___`. .' /--2--\\ `. . __ ");
  console.log("                .'' '< `.___\\_<0>_/___.' >'''. ");
  console.log("               | | : `- \\`.;`\\ 2 /`;.`/ - ` : | | ");
  console.log("                 \\ \\ `-. \\_ __\\ /__ _/ .-` / / ");
  console.log("         ======`-.____`-.___\\_____/___.-`____.-'====== ");
  console.log("                            `=---=' ");
  console.log("         ............................................. ");
  console.log("                  佛祖保佑                  永无BUG ");
  console.log("          佛曰: ");
  console.log("                  写字楼里写字间，写字间里程序员； ");
  console.log("                  程序人员写程序，又拿程序换酒钱。 ");
  console.log("                  酒醒只在网上坐，酒醉还来网下眠； ");
  console.log("                  酒醉酒醒日复日，网上网下年复年。 ");
  console.log("                  但愿老死电脑间，不愿鞠躬老板前； ");
  console.log("                  奔驰宝马贵者趣，公交自行程序员。 ");
  console.log("                  别人笑我忒疯癫，我笑自己命太贱； ");
  console.log("                  不见满街漂亮妹，哪个归得程序员？ ");
}