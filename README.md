# Chestionare Emmanuel CliniX

Pachetul independent pentru zona **Chestionare**: nouă chestionare, ecranul de alegere, paginile de campanie asociate, formularele de lead și endpoint-ul GoHighLevel.

Designul și textele au fost păstrate din proiectul sursă. Acest proiect este o aplicație Next.js care se conectează la un site WordPress; nu este o temă sau un plugin WordPress.

Înainte de publicare, începe cu **GHID-SCURT-INTEGRARE-CHestionare.docx** (ghidul Word de două pagini), apoi citește [INTEGRATION.md](INTEGRATION.md) și [ROUTES.md](ROUTES.md) pentru detalii tehnice.

Pentru a vedea traseele fără a porni proiectul, deschide `PREVIZUALIZARE_HTML/index.html` într-un browser. Cele 33 de pagini HTML sunt legate între ele: selector → test → rezultat → landing page.

## Pornire locală

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Deschide `http://localhost:3000/chestionare`.

## Ce trebuie configurat

- `GHL_WEBHOOK_URL` în `.env.local` sau în platforma de hosting, pentru ca lead-urile să ajungă în GoHighLevel;
- `NEXT_PUBLIC_SITE_URL`, cu adresa publică a aplicației;
- textele juridice reale din paginile de confidențialitate și termeni, înainte de lansare.

## Validarea datelor din chestionare

Înainte de rezultate, chestionarele acceptă numai:

- un număr mobil românesc plauzibil: `07xxxxxxxx` (sunt acceptate și formele `+407…`/`00407…`);
- o adresă Gmail sau Yahoo plauzibilă (`gmail.com`, `yahoo.com`, `yahoo.ro`), care nu este un placeholder de tip test/demo/asdf.

Verificarea se face atât în formular, cât și pe endpoint-ul serverului. Ea filtrează datele evident inventate; nu demonstrează proprietatea asupra numărului sau inboxului. Aceasta ar necesita verificare prin SMS sau email, care nu face parte din acest pachet.
