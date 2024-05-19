
# Raika

<img width="100%" alt="servise_logo" src="https://github.com/takuya-38/Raika/assets/128199416/090b0b9a-fb91-4042-a6d8-dee2cced33bf">

<br>
<br>

## サービス概要

Raikaは、個人経営で美容師を営む父親の「予約と売上の管理を改善したい」という想いを聞き、<br>
父親のニーズに特化した統合予約・売上管理システムです。<br>

Raika紹介動画：https://www.youtube.com/watch?v=RBFT8fD7ZXA

<br>

## 現状の課題

### 課題・解決法

- 予約(紙)と売上(Excel)が別管理になっている。<br>
  → **予約と売上を統合管理にし、予約情報に売上情報を紐づける。**

- 美容院を１人で経営しているため労力に限界があり、1日の総売上と来店人数しか記録できておらず、<br>細かな売上分析をすることができていない。<br>
  → **直感的で簡単な操作で売上登録をすることができるようにする。**

- 予約表が手元にないと予約状況が確認できないため、外出先などで予約登録ができない。<br>
  → **GoogleCalendarのデータ連携により、スマホから予約の確認・登録を可能にする。**

### 要望

- お客様によって料金を設定できるようにしてほしい。
- 当日の予約のお客様をわかりやすく表示してほしい。

<br>

## 機能一覧

### ログイン画面

<img width="80%" alt="analysis_page" src="https://github.com/takuya-38/Raika/assets/128199416/89b7d46b-1f0c-4727-99fc-a1ae0004329f">

【機能】

- Googleアカウントでのログイン

<br>

【詳細説明】

- Firebase Authorizationを用いてログイン機能実装
- 指定したアカウントのみログイン可能

<br>

### カレンダー画面

<img width="80%" alt="calendar_page" src="https://github.com/takuya-38/Raika/assets/128199416/49a08ced-1a0f-4ee6-b3d3-26e4587e9f0a">


【機能】

- 予約状況の確認（GoogleCalendar連携）
- 予約、売上の登録・変更・削除

<br>

【詳細説明】

- **カレンダー基本機能**
    - 上部ボタンをクリックすることで、「週の切り替え」「本日の週に戻る」
    - 既存予約をクリックすることで、予約情報・売上情報を右欄に反映。

- **予約機能**
    - 予約情報の登録、更新、削除。
    - カレンダーの時間欄をドラッグ＆ドロップすることで、日時の自動入力可能。
    - GoogleCalendarからも予約登録可能。

- **売上機能**
    - 売上情報の登録、更新、削除。
    - ボタン、ドロップダウンを用いた入力の簡易化。
    - サービスメニュー料金の変更可能。

<br>

### 売上分析画面

| Homeタブ | Yearタブ, Allタブ    |
| ---- | ---- |
| ![ Homeタブ ](https://github.com/takuya-38/Raika/assets/128199416/4605a723-fbfc-4080-bf22-bfae47ec2667) | ![Yearタブ, Allタブ ](https://github.com/takuya-38/Raika/assets/128199416/b42de7e0-5265-4603-875f-b4229b3b5a3a) |

【機能】

- 売上情報による売上分析

<br>

【詳細説明】
- Home(今日・今週・今月)、Year、ALLの3つの期間でまとめている。
- グラフにカーソルを合わせると、具体的な数値を表示。

<br>

## 主な使用技術

| Category | Technology Stack |
| --- | --- |
| Frontend | React / Next.js / Tailwind CSS / eslint&prettier |
| Backend | Rails / minitest / RuboCop |
| Database | MySQL |
| infra | Amazon Web Service  |
| Environment | Docker, Docker compose |
| etc. | Git, GitHub, Firebase Authorization, Google Calendar API |

<br>

## インフラ構成図

<img width="80%" alt="er" src="https://github.com/takuya-38/Raika/assets/128199416/f573fe3f-b188-47ac-885b-10b6005b6459">

<br>

## インフラ構成図

<img width="80%" alt="Infrastructure " src="https://github.com/takuya-38/Raika/assets/128199416/2c2921e3-2499-497f-b1cb-4735b46b467b">
