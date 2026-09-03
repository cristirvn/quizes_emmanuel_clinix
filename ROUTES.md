# Harta paginilor și a rutelor

Toate rutele de mai jos sunt incluse ca pagini individuale în folderul `app/`. În Next.js, fiecare `page.tsx` reprezintă o pagină/rută.

## Hub și alegerea testului

| URL | Fișier | Rol |
| --- | --- | --- |
| `/chestionare` | `app/chestionare/page.tsx` | Hubul cu toate cele nouă teste. Este linkul care trebuie pus în WordPress. |
| `/evaluare` | `app/evaluare/page.tsx` | Ajută vizitatorul să aleagă testul potrivit. |

## Chestionare

Toate cele nouă rute sunt generate de `app/chestionare/[slug]/page.tsx`; textele, întrebările, scorurile și riscurile sunt păstrate separat în `content/quizzes/`.

| URL | Conținut |
| --- | --- |
| `/chestionare/anxietate` | Anxietate |
| `/chestionare/panica` | Atacuri de panică |
| `/chestionare/somn` | Somn |
| `/chestionare/burnout` | Burnout |
| `/chestionare/focus` | Focus/concentrare |
| `/chestionare/dispozitie` | Dispoziție |
| `/chestionare/migrene` | Migrene |
| `/chestionare/stres` | Stres |
| `/chestionare/adictii` | Adicții |

Rezultatul fiecărui test este calculat în browser de `lib/scored-quiz.ts`; datele de contact sunt trimise prin `app/api/lead/route.ts`. Nu muta logica numai în WordPress fără a păstra endpoint-ul, altfel formularul și filtrul de date nu vor funcționa.

## Landing pages conectate la rezultate

| URL | Fișier | Legătură |
| --- | --- | --- |
| `/lp/anxietate` | `app/lp/anxietate/page.tsx` | Rezultat Anxietate |
| `/lp/panica` | `app/lp/panica/page.tsx` | Rezultat Panică |
| `/lp/somn` | `app/lp/somn/page.tsx` | Rezultat Somn |
| `/lp/burnout` | `app/lp/burnout/page.tsx` | Rezultat Burnout |
| `/lp/focus` | `app/lp/focus/page.tsx` | Rezultat Focus |
| `/lp/dispozitie` | `app/lp/dispozitie/page.tsx` | Rezultat Dispoziție |
| `/lp/migrene` | `app/lp/migrene/page.tsx` | Rezultat Migrene |
| `/lp/stres` | `app/lp/stres/page.tsx` | Rezultat Stres |
| `/lp/adictii` | `app/lp/adictii/page.tsx` | Rezultat Adicții |
| `/lp/somn-b` | `app/lp/somn-b/page.tsx` | Variantă separată de campanie Somn |
| `/lp/somn-b/aplicatie` | `app/lp/somn-b/aplicatie/page.tsx` | Formularul variantei Somn B |
| `/lp/somn-b/multumim` | `app/lp/somn-b/multumim/page.tsx` | Confirmare după Somn B |
| `/lp/somn/multumim` | `app/lp/somn/multumim/page.tsx` | Confirmare pentru Somn |
| `/lp/emsella` | `app/lp/emsella/page.tsx` | Landing page separată EmSella; nu este legată de un chestionar. |

`content/campaign-lps/` conține textele pentru landing page-urile BrainMap. `components/lp/` conține designul, formularele și comportamentele lor. CSS-ul specific se află lângă paginile Somn sau în `components/lp/lp-brainmap.css`.

## Pagini de consimțământ

| URL | Fișier | Rol |
| --- | --- | --- |
| `/politica-de-confidentialitate` | `app/politica-de-confidentialitate/page.tsx` | Link din formular; trebuie completată cu politica juridică reală. |
| `/termeni-si-conditii` | `app/termeni-si-conditii/page.tsx` | Link din formular; trebuie completată cu termenii juridici reali. |
