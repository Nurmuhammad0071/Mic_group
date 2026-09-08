# MIC Agency — Landing Page

Next.js 14 (App Router) + TypeScript + Tailwind. 3 tilli (UZ / RU / EN), lead-generation'ga qaratilgan.

## Ishga tushirish (Cursor / mahalliy)

```bash
npm install
npm run dev
```

`http://localhost:3000` ochiladi — brauzer tilingizga qarab avtomatik `/uz`, `/ru` yoki `/en`ga yo'naltiradi.

## Loyiha strukturasi

```
app/
  [locale]/
    layout.tsx      → <html lang>, font'lar, metadata
    page.tsx         → barcha sectionlarni yig'adi
  api/lead/route.ts   → forma yuborilganda ishga tushadigan endpoint
  layout.tsx          → root shell (i18n uchun minimal)
  globals.css

components/            → har bir section alohida komponent
dictionaries/           → uz.json, ru.json, en.json — barcha matn shu yerda
lib/
  i18n-config.ts        → tillar ro'yxati
  dictionaries.ts        → lug'atni yuklovchi funksiya

middleware.ts            → brauzer tiliga qarab /uz, /ru, /en'ga yo'naltiradi
```

## Matnni tahrirlash

Sahifadagi **hech qanday matn komponent ichida hardcode qilinmagan** — barchasi
`dictionaries/uz.json`, `ru.json`, `en.json` fayllarida. Matnni o'zgartirish uchun
faqat shu JSON fayllarni tahrirlang, komponentga tegmang.

## Lead forma — CRM/Telegram/Email ulash

`.env.example`ni `.env.local`ga nusxalang va to'ldiring:

```bash
cp .env.example .env.local
```

- **Telegram bot**: `TELEGRAM_BOT_TOKEN` (BotFather'dan) va `TELEGRAM_CHAT_ID`
  (bot yuboradigan chat/kanal ID) — to'ldirilsa, har bir ariza avtomatik
  Telegram'ga keladi. `app/api/lead/route.ts` ichidagi `notifyTelegram()`
  funksiyasida.
- **CRM webhook**: `CRM_WEBHOOK_URL` — Bitrix24, AmoCRM yoki boshqa CRM'ning
  webhook manzilini qo'ysangiz, har bir ariza shu URL'ga POST qilinadi.
- **Email**: hozircha stub — `LEAD_NOTIFY_EMAIL` o'zgaruvchisi bor, lekin
  yuborish logikasi yozilmagan (Resend yoki SendGrid tavsiya etiladi).
  `app/api/lead/route.ts` ichiga `notifyEmail()` funksiyasini qo'shib,
  `Promise.allSettled([...])` qatoriga qo'shing.
- **Ma'lumotlar bazasi**: agar arizalarni doimiy saqlamoqchi bo'lsangiz
  (masalan Postgres/Supabase), `route.ts` ichidagi `TODO` izohiga qarang.

Forma hozir ham to'liq ishlaydi (validatsiya, loading, success/error holatlari) —
yuqoridagilarni to'ldirmasangiz ham frontend ishlayveradi, faqat bildirishnomalar
yubormaydi.

## Aloqa ma'lumotlari

Telefon va Telegram bot username `components/Footer.tsx` fayli tepasida
o'zgaruvchi sifatida — kerak bo'lsa shu yerdan almashtiring.

## Haqiqiy logo qo'shish

Hozircha header/footer'da matn asosidagi "MIC." belgisi bor. Haqiqiy logo
faylini (SVG tavsiya etiladi) `public/logo.svg` sifatida qo'shib,
`components/Header.tsx` va `components/Footer.tsx` ichidagi matnni
`<Image src="/logo.svg" ... />` bilan almashtiring.

## Keyingi bosqichlar (haqiqiy ma'lumot kelganda)

- **Results/Cases va Testimonials** sectionlari hozircha yo'q — haqiqiy
  statistika yoki mijoz fikri paydo bo'lsa, `components/` ichiga yangi
  komponent qo'shib, `app/[locale]/page.tsx`ga ulash kifoya.
- Google Fonts (Manrope, Inter) `next/font/google` orqali avtomatik
  optimallashtirilgan holda yuklanadi — qo'shimcha sozlash kerak emas.
