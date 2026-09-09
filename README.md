# Brand Themes for pi

An extension package that provides paired light and dark themes for [pi](https://github.com/earendil-works/pi), inspired by DeepSeek and WeChat brand colors.

The package is unofficial and is not affiliated with or endorsed by DeepSeek or WeChat.

## Themes

- `deepseek-light`: cool white surfaces with readable, restrained DeepSeek-blue accents.
- `deepseek-dark`: dark navy surfaces with DeepSeek-blue accents and low-contrast tool backgrounds.
- `wechat-light`: airy green-tinted surfaces with readable WeChat-green accents.
- `wechat-dark`: deep green-black surfaces with WeChat-green accents and low-contrast tool backgrounds.

## Install

Install a local checkout:

```bash
pi install /absolute/path/to/deepseek-theme
```

After publishing the repository to GitHub:

```bash
pi install git:github.com/OWNER/deepseek-theme
```

To try it for one run without installing it:

```bash
pi -e /absolute/path/to/deepseek-theme
```

## Select

Select either theme through `/settings`, or let pi follow the terminal appearance:

```bash
pi --use-theme deepseek-light/deepseek-dark
pi --use-theme wechat-light/wechat-dark
```

The value before `/` is used for light terminal backgrounds; the value after `/` is used for dark backgrounds.

## Commands

- `/name [new name]`: Set or show the session name. Provided for RPC mode, which has no built-in TUI commands. The interactive TUI already ships a built-in `/name` that shadows this one, so both modes behave consistently.

## How It Works

On a cold start, pi first reads the package manifest and loads the files declared by `pi.themes`. This makes both themes available to the startup UI before pi resolves and applies the saved theme or the value passed to `--use-theme`.

Pi loads `deepseek-theme.ts` later, while creating the normal extension runtime. After the extension is loaded and bound to the session, its `resources_discover` handler runs with a reason of `startup` (or `reload` after `/reload`). By then, cold-start theme selection has already happened, so themes registered only by this hook cannot provide the initial startup theme.

The extension also registers a `/name` command for RPC mode. It does so from a `session_start` handler only when `ctx.mode === "rpc"`; registering unconditionally would trigger the interactive TUI's built-in command conflict warning. In interactive mode the built-in TUI `/name` is handled before extension commands are resolved. The command sets the session name via `pi.setSessionName()` and reports the result through `ctx.ui.notify()`, which RPC emits as an `extension_ui_request` event; the authoritative value is the `sessionName` returned by `get_state`.

The extension is retained as a minimal `resources_discover` API example. Its empty `themePaths` array intentionally contributes no additional resources; the package manifest is the actual source of both themes. Pi loads the TypeScript source directly, so this package does not contain a separate `deepseek-theme.js` file.
