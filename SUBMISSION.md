# Nut November 2026 | Submission draft

## Project name

Digital Treasure Baghdad — The Secret of the Tigris

## Contact

skksk245@gmail.com

## Short pitch

An Arabic-first puzzle hunt through Baghdad that teaches Cashu by letting players earn and redeem their first test ecash token.

## Project description

Digital Treasure Baghdad turns Cashu onboarding into a short story. Players follow a bookseller’s clues across three Baghdad landmarks, with optional hints and progress saved in the browser. After solving the third clue, they can claim and copy a 21-test-sat Cashu token. The demo requests a BOLT11 quote from Testnut, waits for the mint’s simulated payment and returns an interoperable Cashu token. The included integration script verifies that a separate wallet instance can redeem it.

The game is designed for Arabic-speaking newcomers and works without asking players to create an account, paste a wallet seed or spend money. The submission includes the mobile-friendly right-to-left interface, original artwork, the Cashu integration, and test scripts. The game uses Testnut and all rewards have no monetary value.

## What we built in November

The three-stop Baghdad story, Arabic interface, spelling normalization, browser progress, Cashu reward issuance, mobile styling, integration tests and documentation were created for the November 2026 event. The project uses cashu-ts and Testnut.

## Public demo

https://digital-treasure-baghdad.jokeywood32.chatgpt.site/

The site includes a 27-second captioned overview and the playable game.

## Demo walkthrough for judges

1. Open the shared demo and start the hunt.
2. Enter an incorrect answer and open the hint to see both feedback states.
3. Solve the three clues. The answers are **دجلة**, **شارع المتنبي**, and **المدرسة المستنصرية**.
4. Claim the 21-test-sat token, then copy it into a Cashu wallet configured with https://testnut.cashu.space. The mint can deduct a test fee when receiving the token.

## Before sending

- Add the entrant or team name and contact details requested by the organizers.
- Use this public GitHub repository URL for the source field.
- If adding a demo link, verify that the judges can open it without signing into the entrant’s account. The demo link must open for the judges.
- Submit at https://nutnovember.org/form by November 27 at 23:59 UTC (November 28 at 02:59 in Baghdad). Rules: https://nutnovember.org/#rules.
