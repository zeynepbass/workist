# 0005 — TypeScript yerine zod + test

**Durum:** Kabul edildi

## Bağlam

Proje JavaScript (ES Modules) ile yazılmıştır ve bu kısıt korunacaktır. Tip güvenliğinin en çok gerektiği yer, sistemin sınırlarıdır: HTTP istekleri, socket mesajları ve ortam değişkenleri.

## Karar

- Tüm dış girdiler çalışma zamanında **zod** ile doğrulanır: body/params/query (`middleware/validate.js`), socket payload'ları, `process.env` (`config/env.js`). Şemalar `.strictObject` olduğu için bilinmeyen alanlar reddedilir; bu aynı zamanda mass assignment'ı engeller.
- OpenAPI dokümanı aynı zod şemalarından üretilir (`/api/docs`), yani doküman ile doğrulama ayrışmaz.
- Client formları react-hook-form + zod kullanır; kurallar sunucudakilerle aynı sınırları uygular.
- Davranış testlerle sabitlenir: server'da Vitest + Supertest + mongodb-memory-server (servis katmanı kapsaması %90+), client'ta RTL + MSW, uçtan uca Playwright.

## Sonuçlar

- Derleme adımı yok; hatalar derleme anında değil test/çalışma anında yakalanır.
- Client ve server şemaları iki ayrı pakette olduğu için kopyadır; sınır değerleri değişirse ikisi birlikte güncellenmelidir.
