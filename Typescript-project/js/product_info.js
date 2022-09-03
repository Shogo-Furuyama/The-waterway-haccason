function jsonOutput() {
    // XMLHttpRequestインスタンスを作成
    let request = new XMLHttpRequest();
  
    // JSONファイルが置いてあるパスを記述
    request.open('GET', '../json/output_info.json');
    request.send();
    let product_id = -1;
    var cookies = document.cookie; //全てのcookieを取り出して
    var cookiesArray = cookies.split(';'); // ;で分割し配列に
    console.log(cookiesArray);
    for(var c of cookiesArray){ //一つ一つ取り出して
        var cArray = c.split('='); //さらに=で分割して配列に
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
        // 生成したモーダル用のHTMLを入れておく変数
        let modal = '';
  
        // JSONにあるオブジェクト数の分だけfor文で処理
        for (let i = 0; i < json[product_id].length; i++) {
          // ポップアップ表示の場合
          if (json[product_id][i].display === 'popup') {
            let htmlParts =
              '<div class="p-parts js-modalOpen" aria-expanded="false" aria-controls="modal_' +
              // 配列のインデックスは0から始まるため、分かりやすく+1して正の整数にしている
              (i + 1) +
              '">' +
              '<figure><img src="' +
              json[product_id][i].image +
              '" alt=""></figure>' +
              '<p class="p-parts__title">' +
              json[product_id][i].title +
              '</p>' +
              '<div>';
  
            // 先述の変数の中に、出来上がったHTMLを格納
            html += htmlParts;
  
            // モーダル生成
            let modalParts =
              '<div class="p-modal" id="modal_' +
              (i + 1) +
              '" aria-hidden="true">' +
              '<div class="p-modal__wrap">' +
              '<button class="js-modalClose" aria-controls="modal_' +
              (i + 1) +
              '"></button>' +
              '<h3 class="p-modal__title">' +
              json[product_id][i].title +
              '</h3>' +
              '<figure class="p-modal__image"><img src="' +
              json[product_id][i].image +
              '" alt="' +
              json[product_id][i].title +
              '"></figure>' +
              '<div class="p-modal__text">' +
              '<p>' +
              json[product_id][i].text +
              '</p>' +
              '<a class="link" href="' +
              json[product_id][i].url +
              '" target="_blank">リンク先へ飛ぶ' +
              '</a>' +
              '</div>' +
              '</div>' +
              '</div>';
  
            // 先述の変数の中に、出来上がったモーダル用HTMLを格納
            modal += modalParts;
          } else {
            // アンカーリンクの場合
            let htmlParts =
              '<div class="p-shousai-outline">' +
              '<h2>' + 
              json[product_id][i].bigtitle +
              '</h2>' +
              '<div class="p-parts">' +
              '<div class="p-parts-image">' +
              '<a href="' +
              json[product_id][i].url +
              '" target="_blank">' +
              '<figure><img src="' +
              json[product_id][i].image +
              '" alt=""></figure>' +
              '<p class="p-parts__title">' +
              json[product_id][i].title +
              '</p>' +
              '</a>' +
              '</div>' +
              '<div class="p-parts-info">' +
              '<p class="p-parts-info-setsumei"> 説明 </p>' +
              '<p class="p-parts-info-syousai">' + 
              json[product_id][i].text + 
              '</p>' +
              '</div>' +
              '</div>' + 
              '</div>';
  
            // 先述の変数の中に、出来上がったHTMLを格納
            html += htmlParts;
          }
        }
  
        // 変数に格納したHTMLを出力
        document.getElementById('container').innerHTML = html;
        document.getElementById('modal').innerHTML = modal;
      }
    };
  }

  jsonOutput();
