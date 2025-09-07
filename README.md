# LoCost

Web App for Analyzing Lines of Code + Cost

## Local Development

### Setup

This project depends on [NodeJS](https://nodejs.org/en) v22 (or higher) and [scc](https://github.com/boyter/scc).

On macOS, these dependencies can be easily installed via [Homebrew](https://brew.sh/):

```
brew install node scc
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
