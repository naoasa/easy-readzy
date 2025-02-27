## 一言サービスコンセプト

**技術書を気軽に読んでアウトプット**

## アプリ名

![Easy-Readzy](/images/logo.png)

## 誰のどんな課題を解決するのか？

技術書を積みがちなITエンジニアの, 買ったけど読まない問題 / 読んだのに知識が定着しない問題

## なぜそれを解決したいのか？

自分自身の悩みでもあるから

## どうやって解決するのか？

### 何の本を持っているのか問題

=> 所有している技術書の一覧化で解決

### なぜ持っているのか忘れた問題

=> 本を入手した目的を登録することで解決

### 読んだのに知識が定着しない問題

=> 目的に対するアウトプットを作成することで解決

## 機能要件:

    - ユーザー管理: must
        - ユーザー登録ができる: want
        - ログインができる: want
        - ログアウトができる: must
        - ゲストログインができる: must
        - ユーザー編集ができる: want
        - ユーザー削除ができる: want

    - 本の管理: must
        - 本を検索できる: must
        - 本を登録できる: must
        - 本に対して目標・目的を登録できる: must

    - 自分の状況に合った本を提案: want
        - 今の自分の状況を入力できる: want
        - 状況にピッタリの本が数冊提案される: want

    - マイ本棚の管理: must
        - マイ本棚を作れる: must
        - マイ本棚が閲覧できる: must
        - 本の要約が書影の近くに表示される: want
        - マイ本棚に本を追加できる: must
        - マイ本棚から本を削除できる: must

    - アウトプット機能: must
        - 本に対してアウトプットが作成できる: must
            - 文章形式のアウトプット: must
        - アウトプットを編集できる: must
        - アウトプットを削除できる: must

## 非機能要件:

    - 有名な攻撃に対するセキュリティ対策を行う: must
    - 画面は1秒以内に表示される: want
    - mainブランチにマージしたら自動デプロイ: want
    - プッシュ時に静的解析ツールで自動チェックする: want
    - プッシュ時に自動でテストを実行する: want

## 業務フロー

![業務フロー](/images/business_flow.png)

## ワイヤーフレーム兼画面遷移図

[Figmaで閲覧する](https://www.figma.com/board/GnZ5sNqBKx8A5pyNtDLui7/Easy-Readzy%E3%81%AE%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3)

![ワイヤーフレーム兼画面遷移図](/images/wireframe-min.png)

## ER図

![ER図](/images/erd.png)

## システム構成図
