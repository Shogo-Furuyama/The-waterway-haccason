function jsonOutput() {
    // XMLHttpRequestインスタンスを作成
    let request = new XMLHttpRequest();
  
    // JSONファイルが置いてあるパスを記述
    request.open('GET', 'json/product_info.json');
    request.send();

    // cookieから商品番号product_idを取り出す
    let product_id = -1;
    var cookies = document.cookie; 
    var cookiesArray = cookies.split(';');
    for(var c of cookiesArray){ 
        var cArray = c.split('='); 
        console.log(cArray);
        console.log(cArray[0]);
        cArray[0] = cArray[0].replace(" ","");
        if( cArray[0] === 'product_id'){ // 取り出したいkeyと合致したら
            product_id = Number(cArray[1]); 
            console.log('key一致' + product_id);
        }
    }
    // JSON読み込み時の処理
    request.onreadystatechange = () => {
      // 全てのデータを受信・正常に処理された場合
      if (request.readyState == 4 && request.status == 200) {
        // JSONデータを変換
        let json = JSON.parse(request.responseText);
  
        // 生成したHTMLを入れておく変数
        let html = '';
  
        // JSONにあるオブジェクト数の分だけfor文で処理
        for (let i = 0; i < json[product_id].length; i++) {
          // displayの値によってid:containerタグ内に生成するタグを変更する
          // link ：　商品リストページの商品リスト
          if (json[product_id][i].display === 'link') {
            let htmlParts =
              '<div class="p-shousai-outline">' +
              '<h2>' + 
              json[product_id][i].bigtitle +
              '</h2>' +
              '<div class="p-parts">' +
              '<div class="p-parts-imagediv">' +
              '<a href="' +
              json[product_id][i].url +
              '" target="_self">' +
              '<figure><img src="' +
              json[product_id][i].image +
              '" alt="" class="p-parts-image"></figure>' +
              '<p class="p-parts_title">' +
              json[product_id][i].title +
              '</p>' +
              '</a>' +
              '</div>' +
              '<div class="p-parts-info">' +
              '<p class="p-parts-info-contents_title"> 説明 </p>' +
              '<p class="p-parts-info-contents_text">' + 
              json[product_id][i].text + 
              '</p>' +
              '<a target="_blank" href="' +
              json[product_id][i].url + 
              '"> 外部詳細ページはこちら' + '</a>' +
              '</div>' +
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

// -----------------ファイル読込時に実行-----------------
jsonOutput();
