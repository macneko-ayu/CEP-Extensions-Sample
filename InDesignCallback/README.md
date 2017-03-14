# InDesign Callback Sample
InDesign での Callback のサンプルコードです。  
検証環境はCC2015なので、他のバージョンで動作させたい方はmanifest.xmlのバージョン指定を適宜変更してください。

## インストール
1. クローンしたプロジェクトを下記パスに移動して、InDesign を起動する
```
/Applications/Adobe InDesign CC 2015/Resources/CEP/extensions
```
2. メニューから、**ウィンドウ＞エクステンション＞InDesignCallback** を選択。  

メニューにエクステンションが表示されない場合は、com.adobe.CSXS.6.plist などの設定を変更して PlayerDebugMode を 1 にする必要があります。  
ファイルの場所は `/Users/(user_name)/Library/Preferences/` の中。  
変更内容は `<dict></dict>` 内に下記を追加します。  

```
<dict>
	<key>LogLevel</key>
	<string>1</string>
	<key>PlayerDebugMode</key>   <!-- 追加 -->
	<string>1</string>           <!-- 追加 -->
</dict>
```

## 概要
パネル内の **do** ボタンをクリックすると、jsx ディレクトリ内の `hostscript.jsx` からコールバックで文字列を受け取り、テキストエリア内の文字列を書き換えます。  
