# Environment Setup

Salin file `.env.example` menjadi `.env` lalu isi nilainya.

```bash
cp .env.example .env
```

## Penjelasan variable

### App
- `NEXT_PUBLIC_APP_URL`: URL aplikasi frontend (contoh local: `http://localhost:3000`).

### Auth
- `AUTH_SECRET`: secret untuk signing token/session. Wajib panjang dan random.
- `AUTH_TRUST_HOST`: set `true` untuk local/dev.

### Database
- `DATABASE_URL`: koneksi DB SQLite lokal. Default: `file:./data/testy.sqlite`.

### Jira
- `JIRA_BASE_URL`: domain Jira cloud Anda.
- `JIRA_EMAIL`: email akun service/bot Jira.
- `JIRA_API_TOKEN`: API token dari Atlassian account.
- `JIRA_PROJECT_KEY`: key project Jira target (misal `TEST`).

### GitHub
- `GITHUB_TOKEN`: personal access token / fine-grained token.
- `GITHUB_OWNER`: owner organisasi atau username.
- `GITHUB_REPO`: nama repo tujuan.
- `GITHUB_DEFAULT_BRANCH`: branch default untuk referensi sync.

### Upload evidence screenshot (opsional)
- `UPLOAD_PROVIDER`: default `local`.
- `UPLOAD_BASE_URL`: base URL lokasi file upload.

## Setup database (SQLite)

Jalankan dari root project:

```bash
npm install
npm run db:init
```

Atau langkah terpisah:

```bash
npm run db:migrate
npm run db:seed
```

## Catatan keamanan
- Jangan commit `.env` ke git.
- Jangan commit file SQLite lokal (`*.sqlite`, `*.db`).
- Rotasi token jika sempat terekspos.
- Untuk production, gunakan environment variable dari platform deployment (mis. Vercel), bukan file `.env` di repo.
