# DeepSeek Themes for pi

An extension package that provides paired DeepSeek-inspired light and dark themes for [pi](https://github.com/earendil-works/pi).

The package is unofficial and is not affiliated with or endorsed by DeepSeek.

## Themes

- `deepseek-light`: cool white surfaces with readable, restrained DeepSeek-blue accents.
- `deepseek-dark`: dark navy surfaces with DeepSeek-blue accents and low-contrast tool backgrounds.

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
```

The value before `/` is used for light terminal backgrounds; the value after `/` is used for dark backgrounds.

## How It Works

Pi loads `deepseek-theme.ts` as an extension. Its `resources_discover` handler contributes the `themes/` directory during startup and `/reload`, making both theme files available to the session.
