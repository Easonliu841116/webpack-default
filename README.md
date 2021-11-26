## 專案啟動
- `nodemon`
啟動前後端，邏輯寫在 `nodemon.json` 裡面，nodemon 可以自動監測重新啟動，config 裡有寫那些資料夾不監測，讓 webpack-dev-server 監測
- `npm run dev` / `yarn dev` 單啟動 dev-server，有改變需手動重啟
- `npm run build` 產出專案
## json-server
簡單的自建 server，可以做 mock api 不用等後端，參數上網找，目前的`package.json`設定有個`--nc true`是故意打開cors防護
## 補充
`run-p` 是 `npm-run-all` 的選項，可以同時執行多個 npm 指令， -p是同時進行；-s是順序進行

## 接下來的路
寫測試
CI/CD
docker
