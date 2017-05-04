var CR = String.fromCharCode(13);

function makeThumbnailList(paramsStr) {
    var params = paramsStr.split("\t");
    var selectedPageSize = params[0];
    var horizontalDivision = params[1];
    var verticalDivision = params[2];

    // ページサイズを選択していない場合は処理を停止
    if (selectedPageSize.length === 0) {
        alert("ドキュメントサイズを選択してください");
        return;
    }

    // 分割数が未入力の場合は初期値を入れる
    if (horizontalDivision.length === 0) {
        horizontalDivision = 3;
    }
    if (verticalDivision.length === 0) {
        verticalDivision = 3;
    }

    var marginValue = 10; // マージン
    var myLabelWidth = 100; // ラベルの横幅
    var myControlWidth = 60; // コントロールの横幅

    //ページサイズ
    var pageA4 = ["210","297"];
    var pageB4 = ["257","364"];
    var pageA3 = ["297","420"];

    //配列を作成
    var pictureList = new Array();
    var fileListEPS = new Array();
    var fileListAI = new Array();
    var fileListPSD = new Array();
    var fileListJPEG = new Array();
    var fileListTIFF = new Array();

    var folderObj = Folder.selectDialog("一覧にしたい画像のあるフォルダを選択してください");
    var fileListEPS = folderObj.getFiles("*.eps");//EPSファイルを配列化（小文字・大文字無視）
    var fileListAI = folderObj.getFiles("*.ai");//AIファイルを配列化（小文字・大文字無視）
    var fileListPSD = folderObj.getFiles("*.psd");//PSDファイルを配列化（小文字・大文字無視）
    var fileListJPEG = folderObj.getFiles("*.jpg");//JPEGファイルを配列化（小文字・大文字無視）
    if (folderObj.getFiles("*.jpeg").length != 0) {
        fileListJPEG = fileListJPEG.concat(folderObj.getFiles("*.jpeg"));//拡張子がjpegの場合を考慮。concatは配列の結合
    }
    var fileListTIFF = folderObj.getFiles("*.tiff");//tiffファイルを配列化（小文字・大文字無視）
    if (folderObj.getFiles("*.tif").length != 0) {
        fileListTIFF = fileListTIFF.concat(folderObj.getFiles("*.tif"));//拡張子がtifの場合を考慮。concatは配列の結合
    }

    var pipictureList = [];
    //配置画像の配列をひとつに
    if (fileListEPS.length != 0) {
        pictureList = pictureList.concat(fileListEPS);
    }
    if (fileListAI.length != 0) {
        pictureList = pictureList.concat(fileListAI);
    }
    if (fileListPSD.length != 0) {
        pictureList = pictureList.concat(fileListPSD);
    }
    if (fileListJPEG.length != 0) {
        pictureList = pictureList.concat(fileListJPEG);
    }
    if (fileListTIFF.length != 0) {
        pictureList = pictureList.concat(fileListTIFF);
    }

    //配置画像の数
    var pictureListLength = pictureList.length;

    //台紙を作成
    var docObj = app.documents.add();
    docObj.documentPreferences.facingPages = false;

    //サイズを変更
    if (selectedPageSize === "A4Portrait") {
        docObj.documentPreferences.pageWidth = pageA4[0];
        docObj.documentPreferences.pageHeight = pageA4[1];
    } else if (selectedPageSize === "A4Landscape") {
        docObj.documentPreferences.pageWidth = pageA4[1];
        docObj.documentPreferences.pageHeight = pageA4[0];
    } else if (selectedPageSize === "B4Portrait") {
        docObj.documentPreferences.pageWidth = pageB4[0];
        docObj.documentPreferences.pageHeight = pageB4[1];
    } else if (selectedPageSize === "B4Landscape") {
        docObj.documentPreferences.pageWidth = pageB4[1];
        docObj.documentPreferences.pageHeight = pageB4[0];
    } else if (selectedPageSize === "A3Portrait") {
        docObj.documentPreferences.pageWidth = pageA3[0];
        docObj.documentPreferences.pageHeight = pageA3[1];
    } else {
        docObj.documentPreferences.pageWidth = pageA3[1];
        docObj.documentPreferences.pageHeight = pageA3[0];
    }

    //マスターのマージンを決めてページに適用
    var myMaster = docObj.masterSpreads[0]; //適用するマスターを変数に
    for (var i = 0, pagesLength = myMaster.pages.length; i < pagesLength; i++) {
        myMaster.pages[i].marginPreferences.top = marginValue;//天
        myMaster.pages[i].marginPreferences.left = marginValue;//左
        myMaster.pages[i].marginPreferences.right = marginValue;//右
        myMaster.pages[i].marginPreferences.bottom = marginValue;//地
    }

    docObj.pages[0].appliedMaster = myMaster;//適用

    //ドキュメントの幅・高さ
    var pageWidth = docObj.documentPreferences.pageWidth;
    var pageHeight = docObj.documentPreferences.pageHeight;

    //1ページ当たりの配置数
    var maxHorizontalDivision = horizontalDivision * verticalDivision;

    //総ページ数
    var allPage = Math.ceil(pictureListLength / maxHorizontalDivision); // 小数点以下切り上げ

    //キャプの高さ
    var capHeight = 3;

    //1フレームの幅・高さ
    var frameWidth = (pageWidth - (marginValue * (horizontalDivision - 1)) - (marginValue * 2)) / horizontalDivision;
    var frameHeight = (pageHeight - (marginValue * (verticalDivision - 1)) - (verticalDivision * capHeight) - (marginValue * 2)) / verticalDivision;

    //フレームカウント用
    var lineCount = 0;

    //ページ数を増やす
    for (i = 0; i < (allPage - 1); i++) {
        docObj.pages.add();
    }

    //配置するフレーム作成
    for (var i = 0, pagesLength = docObj.pages.length; i < pagesLength; i++) {
        var pageObj = docObj.pages[i];
        for (var y = 0; y < verticalDivision; y++){
            for (var x = 0; x < horizontalDivision; x ++) {
                //画像フレーム作成
                var pictFrame = pageObj.textFrames.add();
                pictFrame.visibleBounds = [marginValue + (y * marginValue) + (frameHeight * y) + (capHeight * y),
                                           marginValue + (x * marginValue) + (frameWidth * x),
                                           marginValue + (y * marginValue) + (frameHeight * (y + 1)) + (capHeight * y),
                                           marginValue + (x * marginValue) + (frameWidth * (x + 1))];
                pictFrame.contentType = ContentType.graphicType;
                pictFrame.name = "pict" + lineCount.toString();

                //キャプションフレーム作成
                var capFrame = pageObj.textFrames.add();
                capFrame.visibleBounds = [marginValue + (y * marginValue) + (frameHeight * (y + 1)) + (capHeight * y),
                                          marginValue + (x * marginValue) + (frameWidth * x),
                                          marginValue + (y * marginValue) + (frameHeight * (y + 1)) + (capHeight * (y + 1)),
                                          marginValue + (x * marginValue) + (frameWidth * (x + 1))];
                capFrame.contentType = ContentType.textType;
                capFrame.name = "cap" + lineCount.toString();
                capFrame.textFramePreferences.verticalJustification = VerticalJustification.bottomAlign

                lineCount ++;
            }
        }
    }

    for (var p = 0; p < pictureListLength; p++){
        //画像配置
        docObj.pageItems.itemByName("pict" + p).select();
        var pictFrameSel = app.selection[0];

        var selFile = new File(pictureList[p]);
        pictFrameSel.place(selFile);
        pictFrameSel.fit(FitOptions.proportionally);

        //キャプ流し込み
        docObj.pageItems.itemByName("cap" + p).select();
        var capFrameSel = app.selection[0];

        var capKakou = pictureList[p].name;
        capContents = File.decode(capKakou) + CR;

        capFrameSel.contents = capContents;
        capFrameSel.paragraphs[0].pointSize = "10Q";

        if (capFrameSel.overflows) {
            var w = 100;
            while ((capFrameSel.overflows) && (w > 10)) {
                w--;
                capFrameSel.paragraphs[0].horizontalScale = w;
            }
        }
    }
    alert("処理が完了しました");
}

