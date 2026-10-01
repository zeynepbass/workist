# 0002 — Dosyalar S3 uyumlu depolamada, MongoDB'de değil

**Durum:** Kabul edildi

## Bağlam

Görseller base64 data URI olarak MongoDB belgelerine yazılıyordu. Bu yüzden JSON body limiti 200 MB'tı, liste uç noktaları megabaytlarca veri dönüyordu ve MIME/boyut kontrolü yoktu.

## Karar

- Yüklemeler `multipart/form-data` ile gelir; `multer` bellekte tutar (görsel 5 MB, teslimat dosyası 20 MB / en fazla 5 dosya).
- Tür, istemcinin bildirdiği MIME'a değil **dosyanın ilk byte'larına** (`file-type`) bakılarak doğrulanır. İzinli türler: JPEG/PNG/WEBP; teslimatlarda ayrıca PDF/ZIP.
- Anahtar sunucuda üretilir: `{public|private}/{klasör}/{sahipId}/{uuid}.{uzantı}`. Kullanıcının dosya adı yalnızca temizlenip metadata olarak saklanır.
- İki sürücü var:
  - `s3` — Cloudflare R2, AWS S3 veya MinIO. Prod ve docker-compose bunu kullanır.
  - `local` — testler, E2E ve Docker'sız yerel geliştirme için diske yazar.
- `public/` önekli dosyalar doğrudan URL ile servis edilir. Sipariş teslimatları `private/` önekindedir; sadece siparişin tarafları `/api/orders/:id/files/:fileId` üzerinden indirebilir (S3'te 5 dakikalık imzalı URL'ye yönlendirme).
- Var olan base64 veriler `20261001090100-move-base64-files-to-storage` migration'ı ile taşınır; doğrulamadan geçemeyen kayıtlar atlanıp loglanır.

## Sonuçlar

- JSON body limiti 100 KB'a indi.
- Container hosting'lerde disk kalıcı olmadığı için prod'da `s3` sürücüsü zorunludur.
- S3 kullanılırken teslimat dosyası indirmesi için bucket CORS ayarında client origin'ine `GET` izni verilmelidir.
