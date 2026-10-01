# 0003 — Socket.io kimlik doğrulama ve oda yapısı

**Durum:** Kabul edildi

## Bağlam

Socket bağlantıları kimliksizdi, gönderen kimliği istemciden geliyordu ve `io.emit` ile her mesaj **tüm** bağlı kullanıcılara yayınlanıyordu.

## Karar

- Handshake'te `auth.token` (access token) zorunlu; `io.use` middleware'i doğrular, başarısızsa `connect_error: UNAUTHORIZED` döner. Client token süresi dolduğunda refresh yapıp yeniden bağlanır.
- Her socket bağlanınca `user:<id>` odasına katılır. Sunucu yalnızca bu odalara yayın yapar.
- `message:send` olayı `{ recipientId, text }` alır (strict zod şeması; `senderId` gönderilirse reddedilir). Gönderen her zaman `socket.data.userId`'dir. Mesaj kaydedilir, `message:new` gönderen ve alıcının odalarına gider; istemciye ack döner.
- Socket başına saniyede 5 mesaj sınırı.
- Sipariş durum değişiklikleri servis katmanından `order:updated` olarak iki tarafın odasına bildirilir.

## Sonuçlar

- Üçüncü bir kullanıcı başkasının mesajını göremez (testle doğrulandı).
- Tek sunucu varsayımı var; yatay ölçeklemede `@socket.io/redis-adapter` eklenmelidir.
