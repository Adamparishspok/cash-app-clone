import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const P =
  "https://cash-f.squarecdn.com/web/marketing/27c510eba85c23255acbcefd76eedf81f91aa4e6/assets/images/home-fall-release-2025";
const F = "https://cash-f.squarecdn.com/static/fonts/cashsans/woff2";
const CTF = "https://images.ctfassets.net/jwea2w833xe7";

const assets = [
  // hero
  [`${P}/videos/fall-release-hero-large-alpha-truncated.webm`, "public/videos/hero-alpha.webm"],
  [`${P}/videos/fall-release-hero-large-alpha-hvic-full-truncated.mov`, "public/videos/hero-alpha.mov"],
  // cash-app-green
  [`${P}/videos/cash-green-3-25-apy-12102025.mp4`, "public/videos/cash-green.mp4"],
  [`${P}/posters/green-poster.webp`, "public/images/posters/green-poster.webp"],
  // card fan
  [`${P}/cards/glitter.webp`, "public/images/cards/glitter.webp"],
  [`${P}/cards/black.webp`, "public/images/cards/black.webp"],
  [`${P}/cards/pink.webp`, "public/images/cards/pink.webp"],
  [`${P}/cards/white.webp`, "public/images/cards/white.webp"],
  [`${P}/cards/glow.webp`, "public/images/cards/glow.webp"],
  [`${P}/cards/mood.webp`, "public/images/cards/mood.webp"],
  // borrow card grid
  [`${P}/card-grid/overdraft-resized-desktop.mp4`, "public/videos/overdraft.mp4"],
  [`${P}/card-grid/borrow-resized-desktop.webp`, "public/images/card-grid/borrow.webp"],
  [`${P}/card-grid/afterpay-resized-desktop.webp`, "public/images/card-grid/afterpay.webp"],
  [`${P}/card-grid/paychecks-resized-desktop.webp`, "public/images/card-grid/paychecks.webp"],
  // tags
  [`${P}/videos/tags-9x16.mp4`, "public/videos/tags-9x16.mp4"],
  [`${P}/videos/tags-4x5.mp4`, "public/videos/tags-4x5.mp4"],
  [`${P}/posters/tags-poster.webp`, "public/images/posters/tags-poster.webp"],
  // savings / p2p / security / reviews
  [`${P}/videos/savings_11182025.mp4`, "public/videos/savings.mp4"],
  [`${P}/posters/savings-poster.webp`, "public/images/posters/savings-poster.webp"],
  [`${P}/videos/p2p_11182025.mp4`, "public/videos/p2p.mp4"],
  [`${P}/posters/p2p-poster.webp`, "public/images/posters/p2p-poster.webp"],
  [`${P}/videos/security_11182025.mp4`, "public/videos/security.mp4"],
  [`${P}/posters/security-poster.webp`, "public/images/posters/security-poster.webp"],
  [`${P}/videos/testimonial_11182025.webm`, "public/videos/testimonial.webm"],
  [`${P}/videos/testimonial_11182025.mp4`, "public/videos/testimonial.mp4"],
  [`${P}/posters/reviews-poster.webp`, "public/images/posters/reviews-poster.webp"],
  // menu overlay tiles (contentful)
  [`${CTF}/61HdH9OmDXpdWiKitaele4/0ee44d93ffbfe7dede41d858e7617edf/Nav_-_Bank.png`, "public/images/nav/nav-bank.png"],
  [`${CTF}/1vqb7HeCap2ve5cWFVQmiR/608e6b917d52793f4faa8d921f45fb0c/Nav_-_Card.png`, "public/images/nav/nav-card.png"],
  [`${CTF}/4ns86I9eyejrupoFLUQx4J/1a922fb05d157a702b2f219fca6b1b93/Nav_-_Send.png`, "public/images/nav/nav-send.png"],
  [`${CTF}/5aKZ6Qz86sNVMooTk5rv0p/92674fe14f97a3bdd269367a93d6cb08/Nav_-_Save.png`, "public/images/nav/nav-save.png"],
  [`${CTF}/29CzDb1aiwmzUtX6IpTYUf/c35506784a7d3ec5f23392f9617487be/Nav_-_Security.png`, "public/images/nav/nav-security.png"],
  [`${CTF}/72F1ElQHk8cAVZ16XzWNTk/ef12117653dc90e10df51884bafbbcee/Nav_-_Paychecks.png`, "public/images/nav/nav-paychecks.png"],
  // menu overlay icons (contentful svg)
  [`${CTF}/7bK49f3WtYGc6icg97EPz4/d4bdb7199023042a465f4fb70ec89595/pay-in-four.svg`, "public/images/nav/icon-afterpay.svg"],
  [`${CTF}/5hjhdRw3psOBLIqeFo8voi/32544031d5b02e8b2aa0ad19440e9ec6/icon-offers.svg`, "public/images/nav/icon-offers.svg"],
  [`${CTF}/ZQ1ysA33bBfbyKq5EEEjn/a9d42a1447bed1db787d81773b0cf935/icon-stocks.svg`, "public/images/nav/icon-stocks.svg"],
  [`${CTF}/7KS05jp10Y4MeMqJIvX4lw/391bebd90bde4040ab3ad9453145cf4e/icon-bitcoin.svg`, "public/images/nav/icon-bitcoin.svg"],
  [`${CTF}/4eHO6UCpu47b9fd37N7gGx/5d04f6b15e2a80103bfbe81c4f64d85f/icon-taxes.svg`, "public/images/nav/icon-taxes.svg"],
  [`${CTF}/5MbBhPnppcXplAsX4EJFnl/b3e6d0907b0c12a99b089af6f4b0352e/icon-family.svg`, "public/images/nav/icon-family.svg"],
  // fonts
  [`${F}/CashSans-Regular.woff2`, "public/fonts/CashSans-Regular.woff2"],
  [`${F}/CashSans-Medium.woff2`, "public/fonts/CashSans-Medium.woff2"],
  [`${F}/CashSans-Semibold.woff2`, "public/fonts/CashSans-Semibold.woff2"],
  [`${F}/CashSans-Bold.woff2`, "public/fonts/CashSans-Bold.woff2"],
  [`${F}/CashSans-Black.woff2`, "public/fonts/CashSans-Black.woff2"],
  // favicon
  ["https://cash.app/favicon.ico", "public/seo/favicon.ico"],
];

const root = new URL("..", import.meta.url).pathname;

async function download([url, dest]) {
  const path = join(root, dest);
  await mkdir(dirname(path), { recursive: true });
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path, buf);
  return `${dest} (${(buf.length / 1024).toFixed(0)}kB)`;
}

const failures = [];
for (let i = 0; i < assets.length; i += 4) {
  const batch = assets.slice(i, i + 4);
  const results = await Promise.allSettled(batch.map(download));
  for (const r of results) {
    if (r.status === "fulfilled") console.log("ok", r.value);
    else { console.error("FAIL", r.reason.message); failures.push(r.reason.message); }
  }
}
if (failures.length) { console.error(`\n${failures.length} failures`); process.exit(1); }
console.log(`\nAll ${assets.length} assets downloaded.`);
