# Overview

Hi

## DevDependencies

### Prettier & ESLint

```sh
pnpm add -D prettier eslint-config-prettier prettier-plugin-tailwindcss eslint eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @remix-run/eslint-config eslint-plugin-tailwindcss eslint-plugin-drizzle
```

### Tsyringe

```sh
pnpm add tsyringe reflect-metadata
```

### Drizzle

better-sqliteは不要

```sh
pnpm add drizzle-orm
pnpm -D drizzle-kit
```

### Tailwind

guide : [link](https://tailwindcss.com/docs/guides/remix)

```sh
pnpm add -D tailwindcss
npx tailwindcss init --ts
```

### @testing-library

```sh
pnpm add -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

### Vitest

```sh
pnpm add -D vite vitest vite-tsconfig-paths @vitejs/plugin-react happy-dom @testing-library/jest-dom
```

#### setup-test-env.ts

```ts
import '@testing-library/jest-dom'
import { installGlobals } from '@remix-run/node'
import '@testing-library/jest-dom/vitest'
installGlobals()
```

## Class Diagram

```mermaid
---
title: K Modeling
---
classDiagram
    direction LR
    class Tournament{
      - int id
      - string title
      - date eventOn
      - string format
      - string sex
      + saveTournament()
      + removeTournament()
    }
    class Match{
      - int id
      - int winnerId
      - int loserId
      - int atTournamentId
      - int round
      - int winnerScore
      - int loserScore
      + saveMatch()
      + removeMatch()
    }
    class Team{
      - int id
      - string name
      + saveTeam()
    }
    class Player{
      - int id
      - string givenName
      - string familyName
      - string middleName
      - string nickName
      - string sex
      - date birthDate
      + savePlayer()
    }
    class Entry{
      - int id
      - int playerId
      - int teamId
      - int TournamentId
      - int height
      - int weight
    }
    class Raid{
      - int id
      - int cycle
      - int atMatchId
      - int raiderId
      - bool isSuccess
    }
    class RaidPoint{
      - int raidId
      - int scenarioCode
      - int raiderPoint
      - int antiPoint
    }
    class RaidSituation{
      - int raidId
      - int antiNum
      - int emptyCount
      - int timeLeft
      - int raidSecond
    }
    class RaidButtle{
      - int raidId
      - int outPlayerId?
      - int inPlayerId?
    }

    Tournament "1" *-- "1..n" Match
    Tournament "1" *-- "1..n" Entry
    Entry "1" o-- "1" Team
    Team "2" -- "1..n" Match
    Player "1" --o "1" Entry
    Match "1" *-- "1..n" Raid
    RaidButtle "0..7" --* "1" Raid
    Raid "1" *-- "1" RaidSituation
    Raid "1" *-- "1" RaidPoint
    Entry -- RaidButtle
```
