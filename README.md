# Digital Treasure Baghdad | الكنز الرقمي

Digital Treasure Baghdad is a three-stop Arabic puzzle hunt inspired by Baghdad’s Tigris, Al-Mutanabbi Street and Al-Mustansiriya. Solving the hunt unlocks a 21-sat Cashu token issued by the Testnut mint. These test sats have no monetary value.

## Run locally

Use Node.js 22+ to rebuild. The checked-in build can also be served directly over localhost or HTTPS.

```sh
npm ci
npm run build
npm test
python3 -m http.server 8080 --directory .
```

Open http://localhost:8080.

## Test mint integration

```sh
npm run test:mint
```

This network test requests a BOLT11 quote, checks for a simulated payment, mints and encodes a 21-sat token, and redeems it into a separate Cashu wallet instance at the same mint. The redeeming wallet can receive a smaller amount after mint fees. A connection to https://testnut.cashu.space is required. Never pay Testnut invoices with real money.

## Architecture

- `puzzles.js` defines the three riddles and normalizes Arabic spelling variations and English transliteration.
- `app.js` runs the right-to-left game and saves progress and the test token in browser storage.
- `cashu.js` requests a mint quote and issues the test reward using cashu-ts.
- `bundle.js` is the ready-to-serve build. `baghdad.webp` is the original AI-generated Baghdad illustration.

The demo is single-player. Answers are bundled with the front end and there is no shared winner registry or real-money payout. Live competitions would need server-side answer validation, atomic winner selection and operator-controlled funding.

## Cultural references

- [UNESCO Baghdad Creative City of Literature monitoring report](https://www.unesco.org/sites/default/files/medias/fichiers/2025/02/Baghdad_Monitoring_Report_2019.pdf)
- [UNESCO World Heritage Centre tentative listing for the Tigris in Baghdad](https://whc.unesco.org/en/tentativelists/5880/)

Source licensed under MIT. See LICENSE and THIRD_PARTY.md.
