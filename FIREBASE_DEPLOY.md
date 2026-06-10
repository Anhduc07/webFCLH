# Deploy Firebase App Hosting

Du an nay la Next.js co server/API, nen deploy bang Firebase App Hosting.

## 1. Dang nhap Firebase

```bash
npx firebase-tools login
```

Neu trinh duyet khong tu mo, dung:

```bash
npx firebase-tools login --no-localhost
```

## 2. Tao/chon Firebase project

Vao Firebase Console, tao project moi neu chua co:

https://console.firebase.google.com

App Hosting thuong can project o goi Blaze.

## 3. Khoi tao App Hosting cho project nay

Chay trong thu muc `d:\Code\FCLH`:

```bash
npx firebase-tools init apphosting
```

Chon:

- Use an existing project
- Chon project Firebase cua ban
- Create a new backend
- Backend ID: `fclh`
- Region: `asia-east1` hoac `us-central1`
- Root directory: `.`
- Runtime: `nodejs22`

Sau buoc nay Firebase se tao/cap nhat `firebase.json`.

## 4. Deploy

```bash
npx firebase-tools deploy
```

Sau khi deploy xong, terminal se hien link dang:

```txt
https://fclh--PROJECT_ID.REGION.hosted.app
```

Gui link do cho nguoi khac la ho xem duoc website.

## Luu y quan trong

Neu chi sua `data/database.json`, `backend/content.js`, anh trong `public/images`, can deploy lai thi nguoi khac moi thay ban moi.

API dang ghi vao file JSON trong source code. Tren hosting that, cach nay phu hop de xem noi dung da deploy, khong phu hop lam database ghi/sua lau dai tren cloud. Neu muon sua data online va luu ben vung, nen chuyen database sang Firestore.
