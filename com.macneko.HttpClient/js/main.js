/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function() {
    'use strict';

    var outputArea = $('#output_area');

    var isNodeJSEnabled = function () {
        if (typeof(require) !== 'undefined') {
            outputArea.val("Node.js is enabled");
        } else {
            outputArea.val("Node.js is disabled");
        }
    };

    var sendRequest = function () {
        // Node.jsが有効になっていないとエラーになるので、require()がエラーになるため、try〜catchする
        try {
            var https = require('https');
        } catch(err) {
            outputArea.val(err);
            return;
        }

        // QiitaのAPI
        var url = 'https://qiita.com/api/v2/items';

        // APIにリクエスト開始
        https.get(url, function(res) {
            var body = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                body += chunk;
            });

            // リクエスト処理完了
            res.on('end', function (res) {
                // レスポンスのJSONをStringにして、テキストエリアに出力
                var result = JSON.parse(body);
                outputArea.val(JSON.stringify(result));
            });

        }).on('error', function (e) {
            outputArea.val(e.message); //エラー時
        });

    };

    // ボタンクリック
    $(function() {
        $('#btn_send_request').click(sendRequest);
    });
})();
