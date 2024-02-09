**Note**: I wouldn't normally leave environment variables checked into a repository, but this time I decided to commit my `.env.local` for easier testing, if it helps whoever checks this. (They are free API keys anyway).

**Note #2**: Unfortunately, the historical data API (AlphaVantage) is capped at 25 requests a day.

## Building & installation

`yarn && yarn dev`

Voilà! The app is running at `http://localhost:3000/`.

To build a production version:

`yarn && yarn build && yarn start`

### Main dependencies

#### Next.js 14 w/ TypeScript

For easier client-server separation and ease of development.

#### Radix UI

For its excellent library of minimalistic React components.

#### CSS Modules

For quickly writing custom styles without the overhead of CSS-in-JS.

#### Nivo Chart

A simple solution for drawing the price diagram.

### Thank you!

Don't hesitate to reach out with any questions.

-- Ábel

abel.erdesz@gmail.com
