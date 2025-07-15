# LoCost

Web App for Analzing Lines of Code + Cost

## Local Development

### Setup

This project depends on [NodeJS](https://nodejs.org/en) v22 (or higher).

On macOS, this dependency can be easily installed via [Homebrew](https://brew.sh/):

```
brew install node
```

### Building

When building for production, SvelteKit's [adapter-node](https://svelte.dev/docs/kit/adapter-node) is used to compile the project into a NodeJS-ready directory.

```bash
npm run build
```

Then, to run the built / compiled version of the project locally, run `node` directly:

```
NODE_ENV=development ORIGIN=http://127.0.0.1:3000 node build
```
