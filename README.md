# Sito di Scelta Vincente ASD APS

Sito statico costruito con [Astro](https://astro.build). Pubblicato gratuitamente su GitHub Pages, con deploy automatico a ogni `git push`.

## Come scrivere un nuovo post

1. Vai nella cartella `src/content/posts/`
2. Copia un file esistente (es. `nuove-attivita-borsellino.md`) e rinominalo — il nome del file diventa l'indirizzo della pagina (es. `centro-estivo-luglio.md` → `tuosito.it/news/centro-estivo-luglio`)
3. Modifica i campi in cima al file (tra le due righe `---`):
   ```
   title: "Titolo del post"
   date: 2026-08-20
   excerpt: "Una riga di riassunto, mostrata nell'anteprima"
   tag: "Corsi"
   ```
4. Scrivi il testo del post sotto, in Markdown (titoli con `##`, grassetto con `**testo**`, link con `[testo](url)`)
5. Salva, poi da terminale:
   ```
   git add .
   git commit -m "Nuovo post: centro estivo di luglio"
   git push
   ```
6. Dopo circa un minuto il sito è aggiornato online — puoi seguire l'avanzamento nella tab "Actions" del repository su GitHub

## Come funziona in locale (per vedere le modifiche prima di pubblicarle)

```bash
npm install       # solo la prima volta
npm run dev       # avvia un'anteprima su http://localhost:4321
```

## Come pubblicarlo la prima volta

1. Crea un repository su GitHub (es. `sceltavincente-sito`) e carica questi file
2. Vai su **Settings → Pages** del repository, e in "Build and deployment" seleziona come sorgente **GitHub Actions** (il workflow in `.github/workflows/deploy.yml` è già pronto)
3. Vai su **Settings → Pages → Custom domain**, inserisci il tuo dominio (es. `tuodominio.it`) e segui le istruzioni di GitHub per configurare i record DNS presso il tuo registrar (in genere alcuni record `A` verso gli IP di GitHub Pages, più un record `CNAME` per `www`)
4. Aggiorna anche il campo `site` in `astro.config.mjs` con il tuo dominio reale
5. Ad ogni `git push` sul branch `main`, il sito si aggiorna automaticamente

## Struttura del progetto

```
src/
  content/posts/     ← qui scrivi i post in Markdown
  pages/              ← le pagine del sito (home, chi-siamo, contatti, news)
  components/         ← header e footer
  layouts/            ← "cornici" HTML condivise
  styles/global.css   ← tutto lo stile del sito
```
