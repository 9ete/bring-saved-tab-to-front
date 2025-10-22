# Bring Saved Tab to Front

Bring your most recently saved file to the front of Visual Studio Code automatically. Whenever you save a document the extension reorders the active editor group so the saved tab is promoted to the first slot (left-most group, top of the Open Editors list), keeping focus on the file you just committed changes to.

## Features

- Moves the saved tab to index `0` of its editor group within ~300 ms of the save event.
- Keeps preview tabs pinned before repositioning so the working file stays open.
- Skips work when the tab is already first or when multiple files are saved in a batch (e.g. `Save All` in quick succession).
- Provides a command (`bring-saved-tab-to-front.activate`) that can be assigned to a keybinding if you want to trigger the behavior manually.

## Requirements

- Visual Studio Code **1.98.0** or later (per `engines.vscode`).
- Node.js **18.x LTS** (VS Code tooling baseline) with npm.

## Installation

> Marketplace publication is not yet configured. Until then install from source or from a locally packaged `.vsix`.

### Install from source

```bash
git clone https://github.com/<your-org>/bring-saved-tab-to-front.git
cd bring-saved-tab-to-front
npm install
npm run compile
```

Open the folder in VS Code and press `F5` to launch an Extension Development Host with the extension loaded.

### Install from a `.vsix`

1. Run `npm install && npm run package` to build the bundled extension into `dist/extension.js`, then `npx vsce package` to generate `bring-saved-tab-to-front-<version>.vsix`.
2. In VS Code open the Extensions view (`Ctrl/Cmd+Shift+X`).
3. Use the “⋯” menu → **Install from VSIX…** and select the file.

## Usage

1. Activate the extension by saving any text document.
2. Watch the saved tab move to the first position of its editor group and the top of the Open Editors list.
3. The extension debounces rapid saves and ignores multi-file saves to avoid unintended reordering.

You can also bind the contributed command `bring-saved-tab-to-front.activate` to a keyboard shortcut if you would like manual control.

## Development Setup

```bash
# Install dependencies
npm install

# Build once
npm run compile

# Watch mode
npm run watch
```

Open this project folder in VS Code and press `F5` to start a new Extension Development Host. Changes in `src/` are bundled with Webpack into `dist/extension.js`.

### npm scripts

| Script | Description |
| --- | --- |
| `npm run compile` | Bundle the extension with Webpack (development mode). |
| `npm run watch` | Continuous build using Webpack in watch mode. |
| `npm run package` | Production bundle with hidden source maps (used by `vscode:prepublish`). |
| `npm run lint` | Lint TypeScript sources with ESLint (`eslint.config.mjs`). |
| `npm run test` | Run integration tests via `@vscode/test-cli`. |
| `npm run compile-tests` / `watch-tests` | Compile the Mocha test suite to `out/`. |

### Running tests

```bash
npm test
```

This uses the VS Code Test CLI (`@vscode/test-cli`) with Mocha and Sinon helpers located in `src/test`. Ensure `npm run compile-tests` and `npm run compile` succeed before running tests (handled automatically by `pretest`).

### Debugging tips

- Use `console.log` or VS Code’s Developer Tools (`Developer: Toggle Developer Tools`) to inspect activation logs.
- Set breakpoints in `src/extension.ts` and launch the “Extension” debug configuration.
- To capture tab movement issues, enable the `workbench.action.reloadWindow` command between trials to reset the editor state.

## Packaging & Release

1. `npm install`
2. `npm run lint`
3. `npm test`
4. `npm run package` → production build in `dist/`.
5. `npx vsce package` → bundle into a `.vsix`.

Publish with `npx vsce publish` once a publisher ID and Azure DevOps Personal Access Token are configured.

## Contributing

1. Fork and create a feature branch.
2. Keep changes focused and covered with tests in `src/test`.
3. Run `npm run lint` and `npm test` before submitting a pull request.
4. Document behavior changes in `CHANGELOG.md`.

## Troubleshooting

- **Tab didn’t move:** Ensure only one file saved within 300 ms and the tab is not already first. Check the output channel “Bring Saved Tab to Front” (create one via logs if needed).
- **Extension fails to activate:** Verify VS Code version ≥ 1.98.0 and check the developer console for errors.
- **Build issues:** Delete `node_modules`, reinstall dependencies, and re-run `npm run compile`.

## License

Project licensing has not been declared yet. Please consult the repository owner before redistributing.
