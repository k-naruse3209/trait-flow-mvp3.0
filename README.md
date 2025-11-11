<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Studio アプリの実行とデプロイ

このリポジトリには、AI Studio で作成したアプリをローカルで動かしたり、本番環境にデプロイしたりするためのファイルが一式そろっています。

AI Studio 上でアプリを確認する: https://ai.studio/apps/drive/1HDEDL9GTki0WyE3JGkHue6dTsWu7HsDI

## ローカルでの実行方法

**前提条件:** Node.js がインストールされていること

1. 依存関係をインストール  
   `npm install`
2. Gemini の API キーを `.env.local` の `GEMINI_API_KEY` に設定
3. 開発サーバーを起動  
   `npm run dev`

## Google Cloud Run へのデプロイ

このリポジトリには、本番運用を想定した Dockerfile が含まれており、Vite でビルドした成果物を Nginx で配信する構成になっています。以下の手順で Cloud Run へデプロイできます。

1. **認証とプロジェクトの指定**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **必要なサービスの有効化（初回のみ）**
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
   ```

3. **コンテナイメージのビルドとプッシュ**  
   Cloud Run では `PORT` 環境変数で渡されるポートで待ち受ける必要があります。`start.sh` と `nginx.conf.template` が自動で対応します。
   ```bash
   gcloud builds submit --tag REGION-docker.pkg.dev/YOUR_PROJECT_ID/trait-flow/trait-flow-ui
   ```
   - `REGION` は利用可能な Artifact Registry のリージョン（例: `asia-northeast1`）に置き換えてください。
   - 初回実行時は `trait-flow` というリポジトリが自動作成されます。

4. **Cloud Run へデプロイ**
   ```bash
   gcloud run deploy trait-flow-ui \
     --image REGION-docker.pkg.dev/YOUR_PROJECT_ID/trait-flow/trait-flow-ui \
     --platform managed \
     --region REGION \
     --allow-unauthenticated
   ```
   数十秒待つと Cloud Run からサービス URL が表示されます。アプリは静的サイトなので、実行時に追加の環境変数を設定する必要はありません。

5. **（任意）Docker でローカル確認**
   ```bash
   docker build -t trait-flow-ui .
   docker run -p 8080:8080 trait-flow-ui
   ```
   http://localhost:8080 にアクセスして、デプロイ前に挙動を確認できます。
