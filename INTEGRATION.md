# Integrare cu site-ul WordPress Emmanuel CliniX

## Ce este acest pachet

Pachetul conține exclusiv funcționalitatea de chestionare și paginile de campanie conectate la ele. Este o aplicație Next.js separată, păstrată intenționat astfel pentru ca logica de scor, rezultatele, validarea datelor și integrarea GoHighLevel să rămână funcționale.

WordPress nu poate executa direct codul Next.js din acest repository. Integrarea corectă este să ruleze aplicația ca un mic serviciu separat și WordPress să trimită vizitatorii către ea.

## Varianta recomandată: subdomeniu dedicat

1. Clonează repository-ul și instalează Node.js 20 sau mai nou.
2. Rulează `npm ci`.
3. Copiază `.env.example` în `.env.local` și setează variabilele de mai jos.
4. Rulează `npm run build`; publică aplicația pe Vercel sau pe un server Node.js.
5. Leagă un subdomeniu, de exemplu `chestionare.emmanuel-clinix.ro`, la aplicația publicată.
6. În WordPress, schimbă meniul/butonul **Chestionare** astfel încât să deschidă `https://chestionare.emmanuel-clinix.ro/chestionare`.

Această variantă este cea mai sigură: nu modifică tema WordPress și toate rutele din pachet rămân funcționale, deoarece folosesc legături relative.

## Varianta cu aceleași adrese pe domeniul principal

Dacă este obligatoriu ca paginile să rămână sub `emmanuel-clinix.ro`, administratorul de hosting trebuie să configureze un reverse proxy către aplicația publicată pentru aceste prefixe:

- `/chestionare` și `/chestionare/*`
- `/evaluare`
- `/lp/*`
- `/api/lead`
- `/politica-de-confidentialitate`
- `/termeni-si-conditii`

Nu folosi iframe: afectează analiza, partajarea linkurilor, accesibilitatea și poate bloca submiterea formularului. Nu redirecționa doar `/chestionare/*`; rezultatul testului trimite vizitatorul și către `/lp/*`.

## Variabile de mediu

| Variabilă | Obligatorie | Rol |
| --- | --- | --- |
| `GHL_WEBHOOK_URL` | Da, în producție | Webhook-ul GoHighLevel care primește lead-urile. Rămâne secret pe server. |
| `NEXT_PUBLIC_SITE_URL` | Da | URL-ul public al aplicației; este folosit pentru canonical/SEO. |
| `NEXT_PUBLIC_MAIN_SITE_URL` | Da, pentru subdomeniu | URL-ul site-ului WordPress. Păstrează funcționale linkurile de navigare către paginile care nu fac parte din acest pachet. |
| `NEXT_PUBLIC_GA_ID` | Opțional | ID GA4. |
| `NEXT_PUBLIC_GADS_ID` + `NEXT_PUBLIC_GADS_CONVERSION_LABEL` | Opțional | Conversii Google Ads. |
| `NEXT_PUBLIC_CLARITY_ID` | Opțional | Microsoft Clarity. |
| `NEXT_PUBLIC_GHL_BOOKING_URL` | Opțional | Calendarul folosit unde este cazul. |

În GoHighLevel trebuie create câmpurile personalizate trimise de aplicație: `sursa`, `test`, `scor`, `nivel`, `i5_urgenta`, `urgenta`, `riscuri`, `consimtamant`, `consimtamant_la` și câmpurile formularelor de landing page. Verifică un lead de test înainte de a porni reclamele.

## Date de contact și protecția rezultatului

La finalul fiecărui chestionar, rezultatul se deblochează numai după un număr mobil românesc plauzibil și o adresă Gmail/Yahoo plauzibilă. Validarea este aplicată în browser pentru feedback imediat și pe server înainte ca răspunsul de succes să deblocheze rezultatul.

Aceasta reduce numerele și adresele de test, dar nu poate confirma că persoana deține numărul sau inboxul. Pentru confirmare reală trebuie implementat separat un cod SMS sau un link de confirmare email.

## Obligatoriu înainte de lansare

1. Înlocuiește conținutul placeholder din `app/politica-de-confidentialitate/page.tsx` și `app/termeni-si-conditii/page.tsx` cu texte aprobate juridic. Chestionarele pot colecta date de sănătate.
2. Configurează și testează `GHL_WEBHOOK_URL` în mediul de producție.
3. Rulează `npm run lint` și `npm run build`.
4. Parcurge fiecare traseu din [ROUTES.md](ROUTES.md), inclusiv formularul și pagina de mulțumire pentru Somn B.
