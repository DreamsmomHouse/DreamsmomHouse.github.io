window.onload = async () => {
  let searchStr = location.search;
  searchStr = searchStr.substring(1);
  let searchs = searchStr.split("&");
  let category = searchs[0];
  let id = searchs[1];
  let url = id == undefined ? `DataBase/${category}.txt` : `DataBase/${category}/${id}.txt`;
  const a = await fetch(url).then(response => {
    if (response.status == 200)
      document.getElementById("data").innerHTML = new marked.Parser().parse(new marked.Lexer().lex(response.text()));
    else
      alert("这里还没有写完哦~");
  })
}