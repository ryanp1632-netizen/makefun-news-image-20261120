# Friday 20 November 2026 in one picture

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/ryanp1632-netizen/makefun-news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/ryanp1632-netizen/makefun-news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

An entry for make.fun's bounty [Sum up 20 November's world news in one image](https://make.fun/bounty/news-image-20261120).

It is a one-page "front page" of Friday 20 November 2026: a dated masthead, the day in figures, a region tally,
three drawn lead stories, ten illustrated cards, a world map with a numbered pin for every story, a numbered list
of the rest, and a date check that names the stories left out because they broke on another day.
Every story is checked against a report dated 20 November 2026; disputed claims are attributed.

All pictures are drawn in code (hand-written SVG: flags, symbols, a hand-traced world map). No image model and no paid API.

## How it works

- `src/stories.mjs` holds the day's stories with their sources.
- `src/*.mjs` draw the page as HTML + SVG; `build.mjs` screenshots it at 1024 x 1024 with headless Chrome into `entry.png`.
- `main.ts` (Node 22, standard library only, no network) checks `entry.png` and copies it to the output folder, so both runs write the same bytes.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Rebuild the picture (needs Chrome): `node build.mjs`

## License

MIT, see [LICENSE](LICENSE).
