(function () {
    'use strict';
    var csInterface = new CSInterface();
    var message = "";
    function init() {
        themeManager.init();
        // プロジェクト内のjsxディレクトリのパスを取得
        var jsxDirPath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx";
        // jsxにjsxディレクトリのパスを渡す
        csInterface.evalScript('setDirPath("' + jsxDirPath + '")');

        // コールバックを受け取って、テキストエリアに反映する
        csInterface.addEventListener("getCallback", function (evt) {
            message = evt.data;
            $("#textarea").text(message);
        });
        // ボタンをクリックしたらコールバックをセットする
        $("#button").click(function () {
            var str = "sample";
            csInterface.evalScript('setCallback("' + str + '")', function (e) {
            });
        });
    }
    init();
}());

