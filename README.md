## 動かし方

```bash
$ docker-compose up --build
```
上のコマンドは初回は失敗するが、これは`init.sql`の実行に時間がかかり、先にバックエンドが立ち上がってしまうからである。初回の失敗のあと再び、同じコマンドを実行すると成功する。

```
$ cd frontend && npm install && npm start
```
そして、`http://localhost:3000`にアクセス！！
