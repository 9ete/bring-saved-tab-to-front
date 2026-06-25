# Bring Saved Tab to Front

Bring your most recently saved file to the front of Visual Studio Code automatically. Whenever you save a document the extension reorders the active editor group so the saved tab is promoted to the first slot (left-most position, top of the Open Editors list), keeping focus on the file you just changed.

## Features

- Moves the saved tab to index `0` of its editor group within ~300 ms of the save event.
- Keeps preview tabs pinned before repositioning so the working file stays open.
- Skips work when the tab is already first or when multiple files are saved in a batch (e.g. `Save All` in quick succession).
- Contributes a command (`bring-saved-tab-to-front.activate`) you can assign to a keybinding for manual control.

## Requirements

- Visual Studio Code **1.98.0** or later.

## Installation

### From the Marketplace

Search for **Bring Saved Tab to Front** in the Extensions view (`Ctrl/Cmd+Shift+X`) and click **Install**, or install from the command line:

```bash
code --install-extension 9ete.bring-saved-tab-to-front
```

### From a `.vsix`

1. Download the `.vsix` from the [Releases](https://github.com/9ete/bring-saved-tab-to-front/releases) page.
2. In VS Code open the Extensions view (`Ctrl/Cmd+Shift+X`).
3. Use the `...` menu -> **Install from VSIX...** and select the file.

## Usage

1. Save any text document.
2. The saved tab moves to the first position of its editor group and the top of the Open Editors list.
3. Rapid saves are debounced and multi-file saves are ignored to avoid unintended reordering.

You can also bind the contributed command `bring-saved-tab-to-front.activate` to a keyboard shortcut for manual control.

## Development

```bash
git clone https://github.com/9ete/bring-saved-tab-to-front.git
cd bring-saved-tab-to-front
npm install
npm run compile   # or: npm run watch
```

Open the folder in VS Code and press `F5` to launch an Extension Development Host with the extension loaded.

### npm scripts

| Script | Description |
| --- | --- |
| `npm run compile` | Bundle the extension with Webpack (development mode). |
| `npm run watch` | Continuous build using Webpack in watch mode. |
| `npm run package` | Production bundle with hidden source maps (used by `vscode:prepublish`). |
| `npm run lint` | Lint TypeScript sources with ESLint. |
| `npm test` | Run integration tests via `@vscode/test-cli`. |

## Release

```bash
npm run lint
npm run package
npx @vscode/vsce publish
```

Publishing requires a Marketplace publisher (`9ete`) and an Azure DevOps Personal Access Token with the **Marketplace > Manage** scope.

## License

[MIT](LICENSE) (c) Pete Lower
