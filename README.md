# Application Properties Viewer

A small browser-based tool for viewing, editing, and copying application property entries in a compact format that is easy to use in IntelliJ IDEA.

## What this app does

This app helps you:

- paste a compact property string such as `key=value;key2=value2;`
- view each property in a clean editable table
- add new properties manually
- remove properties if needed
- copy the final compact output without unnecessary spaces or formatting

## Why it is useful

When working with IntelliJ IDEA, you often need to copy application properties in a simple one-line format. This tool converts your entries into a clean compact string like:

```text
app.name=MyApp;app.port=8080;debug=true;
```

That makes it easy to paste into configuration files or IDE settings without extra spaces or line breaks.

## How to use

1. Open `index.html` in your browser.
2. Paste a compact property string into the input box and click `Parse`.
3. Or click `Add Property` to create entries manually.
4. Edit the key and value fields on the left panel.
5. Copy the generated compact output from the right panel.

## Notes

- The output is generated in a compact `key=value;key2=value2;` format.
- Empty property rows are ignored automatically.
- The copy button copies the final string exactly as shown, without extra spaces.

## Files

- `index.html` — app layout
- `script.js` — parsing, editing, and copy logic
- `styles.css` — styling
