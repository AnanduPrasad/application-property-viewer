# Application Properties Viewer

<p align="center">
  <img src="https://img.shields.io/badge/status-Ready%20to%20Use-brightgreen" alt="Status badge" />
  <img src="https://img.shields.io/badge/app-browser%20tool-ffffff" alt="Browser tool badge" />
  <img src="https://img.shields.io/badge/goal-IntelliJ%20friendly-4f46e5" alt="IntelliJ friendly badge" />
</p>

A polished browser-based utility for parsing, editing, and exporting application properties into the compact one-line format commonly used in IntelliJ IDEA.

## ✨ What it does

This app helps you:

- paste a compact property string such as `key=value;key2=value2;`
- see each entry in a clean, editable table
- add or remove properties in seconds
- copy the final output without extra spacing or line breaks

## 🚀 Why it’s useful

When working with IntelliJ IDEA, configuration values often need to be pasted in a single compact line. This tool makes that fast and easy.

Example output:

```text
app.name=MyApp;app.port=8080;debug=true;
```

## 🛠️ How to use

1. Open `index.html` in your browser.
2. Paste a compact property string into the input box and click `Parse`.
3. Or click `Add Property` to create entries manually.
4. Edit the key and value fields on the left side.
5. Copy the generated compact output from the right side.

## 📌 Notes

- Output is generated in the compact `key=value;key2=value2;` style.
- Empty rows are ignored automatically.
- The copy action preserves the final string exactly as shown.

## 🗂️ Project files

- `index.html` — app structure and layout
- `script.js` — parsing, editing, and export logic
- `styles.css` — visual styling and interface design

## ✅ Quick summary

If you need a simple way to organize and reuse application property entries in a clean IntelliJ-friendly format, this project is designed to make that process fast and frictionless.
