---
name: HP Dynamic Overhaul
overview: VOYAGE HPを「見たことないLP」レベルにリビルド。スクロール連動アニメーション、マウスインタラクション、生成イメージの追加で、どんどんスワイプしたくなる没入型デザインに仕上げる。
todos:
  - id: global-cursor
    content: カスタムカーソル + マウス追従グロー実装
    status: pending
  - id: todo-1770708811221-i54yqb1cu
    content: ""
    status: pending
  - id: scroll-progress
    content: スクロールプログレスバー（Header内）
    status: pending
  - id: hero-parallax
    content: "Hero: マウスパララックス + 生成背景画像"
    status: pending
  - id: flow-animated-timeline
    content: "Flow: スクロール連動タイムラインアニメーション"
    status: pending
  - id: gen-images-market
    content: MarketData用イラスト3枚生成 + 配置
    status: pending
  - id: gen-images-service
    content: Service用ダッシュボード画像生成 + 配置
    status: pending
  - id: client-3d-tilt
    content: "ClientShowcase: 3Dチルトカード"
    status: pending
  - id: leadership-hover
    content: "Leadership: パララックスホバー"
    status: pending
  - id: strength-parallax
    content: "Strength: スクロール連動パララックス + クリップマスク"
    status: pending
  - id: contact-particles
    content: "Contact: パーティクル背景 + CTAグロー"
    status: pending
  - id: todo-1770708781764-dw33jzs8c
    content: ""
    status: pending
isProject: false
---

# HP 動的リビルド計画

## 方針

- **スクロールが楽しい** = セクション間のトランジション、パララックス、スクロール連動アニメーション
- **インタラクティブ** = マウス追従、ホバーエフェクト、3Dチルト
- **ビジュアルリッチ** = 生成画像・イラストの追加で「テキスト＋箱」感を脱却

---

## A. グローバル演出（全体に効く改修）

### A1. カスタムカーソル＋マウス追従グロー

- マウス位置に追従する薄い緑のグロー（`pointer-events:none`の`div`）
- CTAボタン上ではカーソルが拡大＋「Click」テキスト表示
- `App` レベルに `onMouseMove` で state 管理

### A2. スクロールプログレスバー

- 画面上部に細い緑のプログレスバー（ページ全体のスクロール進行度）
- Header内に `position:fixed` で配置

### A3. セクション間のスムーズトランジション

- 各セクションの入り口に `WaveSvg` だけでなく、斜めクリップや円形マスクの切り替えを追加
- 背景色の変化を `scroll-triggered` でグラデーション遷移

---

## B. セクション別の動的改修

### B1. Hero — 動画的パララックス

- 背景画像をマウス位置で微妙に動かす（パララックス）
- 数字カウントアップにパーティクルエフェクト（完了時に緑の粒子が弾ける）
- **生成画像**: ヒーロー用のアブストラクトな緑系グラデーション背景

### B2. ClientShowcase — 3Dチルトカード

- 各クライアントカードにマウス追従の3Dチルト効果（`transform: perspective(800px) rotateX/Y`）
- 自動スクロール＋ホバーで一時停止
- カードにグロー効果追加

### B3. PainPoints — 既にスクロールスナップ済み

- 切り替え時のトランジションを強化（フェード＋スケール）
- イラスト画像のパララックス（マウス追従で少し動く）

### B4. MarketData — カウントアップ強化

- 数字が画面に入った時にタイプライター風カウントアップ
- バーチャートをもっとアニメーションリッチに（wave的に伸びる）
- **生成画像**: 各統計に合うイメージイラスト（LINE利用者、開封率、学生）

### B5. BackstageGroup — 現状維持（既にstickyスクロール済み）

- 微調整のみ

### B6. Leadership — カード3Dホバー

- 画像にマウス追従のパララックス＋チルト
- ホバー時にオーバーレイ情報がスライドイン

### B7. Service — インタラクティブカード

- ロゴホバーで光が走るシャイン効果
- 機能リストにスクロールトリガーのスタガードアニメーション
- **生成画像**: リクエル/L-ACADEMIAの利用イメージ図（PC画面にダッシュボードが映っている的な）

### B8. Achievements — ビフォーアフター演出

- 成果数字にカウントアップ＋強調パルス
- **生成画像**: 各事例のイメージ画像（クリニック、スクール、マーケティング企業）

### B9. Strength — スクロール連動パララックス

- 画像とテキストが別速度でスクロール（パララックス）
- 画像のクリップマスクがスクロールで開いていく演出

### B10. Flow — アニメーテッドタイムライン

- スクロールに連動してタイムラインのラインが伸びていく
- 各ステップがラインに到達した瞬間にポップインする演出

### B11. Contact — パーティクル背景

- 緑の小さなパーティクルが浮遊する背景
- CTAボタンに脈動するグロー効果

---

## C. 生成画像の追加（計5-6枚）


| 用途            | 内容                     |
| ------------- | ---------------------- |
| Hero背景        | 抽象的な緑系グラデーション+幾何学模様    |
| MarketData用x3 | LINE利用者・開封率・学生利用率のイラスト |
| Service用      | ダッシュボード画面のモックアップ       |
| Achievements用 | ビジネス成果のイメージ            |


---

## 実装優先度

**Phase 1（インパクト大）**: A1カーソル, A2プログレスバー, B1 Heroパララックス, B10 Flowアニメーション
**Phase 2（ビジュアル強化）**: 生成画像5-6枚追加, B4 MarketData, B7 Service
**Phase 3（細部の磨き）**: B2 3Dチルト, B6 Leadership, B9 Strength, B11 Contact