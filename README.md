## How to Use
1. Twitter(現X)のプロフィールページを開く
2. デベロッパツールを開く
3. `archive.json`をコンソールにコピペして実行
4. 適当にスクロールしてツイートを取得
5. consoleで`console.log(content_dict)`を実行
6. 表示されたものをコピーしてテキストファイルに貼り付ける
7. 取得を止める場合はconsoleで`mutation.disconnect()`を実行する

## 既知の問題
添付ファイルやURLなどがあるツイートは取得できない。  
返信とかも取得できない。  
文字のみの単発ツイートくらいしかまともに取得できない。  