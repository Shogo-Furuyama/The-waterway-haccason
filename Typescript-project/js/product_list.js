/* 
    jsonOutPut
    jsonファイル内の情報を出力して商品リストを生成する。
    対象となるファイルは「productlist.json」
*/
function jsonOutput() {
    // XMLHttpRequestインスタンスを作成
    let request = new XMLHttpRequest();
  
    // JSONファイルが置いてあるパスを記述
    request.open('GET', 'json/product_list.json');
    request.send();
  
    // JSON読み込み時の処理
    request.onreadystatechange = () => {
      // 全てのデータを受信・正常に処理された場合
      if (request.readyState == 4 && request.status == 200) {
        // JSONデータを変換
        let json = JSON.parse(request.responseText);
  
        // 生成したHTMLを入れておく変数
        let html = '';
  
        // JSONにあるオブジェクト数の分だけfor文で処理
        for (let i = 0; i < json.length; i++) {
          // displayの値によってid:containerタグ内に生成するタグを変更する
          // link ：　商品リストページの商品リスト
          if (json[i].display === 'link') {
            let htmlParts =
              '<div class="p-parts">' +
              '<div class="p-parts-image">' +
              '<a taget="_self" href="' +
              json[i].url +
              '" target="_self"' +
              ' onclick="setcookie_productid(' +
              json[i].product_id +
              ');">' + 
              '<figure><img src="' +
              json[i].image +
              '" alt=""></figure>' +
              '<p class="p-parts_title">' +
              json[i].title +
              '</p>' +
              '</a>' +
              '</div>' +
              '<div class="p-parts-info">' +
              '<p class="p-parts-info-contents_title"> 説明 </p>' +
              '<p class="p-parts-info-contents_text">' + 
              json[i].text + 
              '</p>' +
              '</div>' +
              '</div>';
  
            // 先述の変数の中に、出来上がったHTMLを格納
            html += htmlParts;
          }
        }
  
        // 変数に格納したHTMLを出力
        document.getElementById('container').innerHTML = html;
      }
    };
  }


/* 
    関数　setcookie_productid(product_id)
    product_id ：　product_idとしてcookie内に登録する値
    商品詳細ページに移動時に選択した商品idをcookie内に登録する
*/
function setcookie_productid(product_id) {
  document.cookie = 'product_id=' + product_id + ';';
}

// -----------------ファイル読込時に実行-----------------
jsonOutput();

