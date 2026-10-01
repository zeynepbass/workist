# 0001 — Kısa ömürlü access token + httpOnly refresh cookie

**Durum:** Kabul edildi

## Bağlam

İlk sürümde 1 günlük (kayıtta 30 günlük) JWT ve kullanıcı objesi `localStorage`'da tutuluyordu. XSS ile token çalınabiliyor, oturum sunucu tarafında iptal edilemiyor ve `PrivateRoute` yalnızca `localStorage`'a bakıyordu.

## Karar

- **Access token:** 15 dakikalık HS256 JWT, yalnızca bellekte (Zustand store) tutulur, `Authorization: Bearer` başlığıyla gönderilir.
- **Refresh token:** 32 byte rastgele opak değer; `httpOnly`, `SameSite=Lax`, prod'da `Secure`, `Path=/api/auth` cookie'sinde. Veritabanında yalnızca SHA-256 hash'i saklanır (`RefreshToken` koleksiyonu, TTL index).
- **Rotation:** her `/api/auth/refresh` çağrısı eski token'ı iptal eder, aynı `familyId` ile yenisini üretir. İptal işlemi koşullu `updateOne` ile atomik yapılır.
- **Reuse detection:** iptal edilmiş bir token tekrar gelirse tüm aile iptal edilir ve olay loglanır.
- **Parola değişimi / hesap silme / çıkış:** kullanıcının tüm aileleri iptal edilir.
- **Client:** açılışta `/api/auth/refresh` ile oturumu geri yükler; 401 alan istekler tek uçuşluk (single-flight) refresh sonrası bir kez tekrar denenir.

## Sonuçlar

- Token'lar JavaScript'ten okunamaz; çalınan access token en fazla 15 dakika geçerlidir.
- `SameSite=Lax` CSRF'e karşı yeterlidir çünkü client ve API **aynı site** altında yayınlanır (`app.example.com` / `api.example.com`). Farklı sitelere taşınırsa `SameSite=None` + CSRF token gerekir.
- Sayfa yenilemede bir ek istek (`/refresh`) yapılır.
