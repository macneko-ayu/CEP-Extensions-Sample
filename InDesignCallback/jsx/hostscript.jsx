// グローバル変数でjsxディレクトリのパスを保持
var dirPath = "";

// 引数で渡ってきたパスをグローバル変数に代入する
function setDirPath(jsxDirPath) {
    dirPath = jsxDirPath;
}

// コールバックをセットする
function setCallback(str) {
    try {
        var xLib = null;
        // PlugPlugExternalObject.frameworkのパスを生成
        var ppLibFile = File(dirPath + "/PlugPlugExternalObject.framework");
        if (ppLibFile.exists) {
            // ExternalObjectを生成
            xLib = new ExternalObject("lib:"+ ppLibFile.fullName);
        }
        else {
            throw new Error("Can't find 'PlugPlugExternalObject.framework'.");
        }
    }  catch(e) { alert(e); }

    // コールバック処理
    var eventObj = new CSXSEvent();
    eventObj.type = "getCallback";
    eventObj.data = createMessage(str);
    eventObj.dispatch();
    xLib.unload();
    return true;
}

function createMessage(str) {
    return "Hello extension " + str + ".";
}
