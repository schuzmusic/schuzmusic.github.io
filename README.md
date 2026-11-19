# schuzmusic.com

Static website and EPK for **Schuz**, hosted free on GitHub Pages.

| Path | What it is |
|---|---|
| `index.html` | Main site: Music, About, Media, Press, Booking |
| `epk/index.html` | Electronic press kit (schuzmusic.com/epk) |
| `assets/style.css` | All colors, fonts and layout. Change `--accent` at the top to restyle the site |
| `images/` | Photos and logos |
| `schuzmusic-*/` | Redirects so old Squarespace links still work |
| `.github/workflows/save-photos.yml` | One-click photo download (Actions tab → Save my photos → Run workflow) |

## Common edits

- **New release:** in `index.html`, find the `<!-- MUSIC -->` section and swap a SoundCloud or Spotify embed URL. On the EPK, update the "Selected releases" list and the "Latest release" fact.
- **New press link:** copy a `<li>` line in the Press section and change the link and title.
- **New photo:** upload it to `images/`, then copy a `<div class="photo">` line and change the file name.

Edits go live about a minute after you commit.

## Chat bot

The Ruby/ArtiBot chat code is at the bottom of each page, just above `</body>`. Paste a new snippet there if Ruby ever gives you one.
