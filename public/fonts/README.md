# Fonts

This project is configured to use **Halyard Display Book** site-wide.

To enable it locally and in production, place your licensed font file in this folder with this exact name:

- `HalyardDisplay-Book.woff2` (weight 400, normal)

The global font stack is defined in `src/index.css` using `@font-face` and the CSS variable `--font-primary`.

Note: Halyard Display is a commercial font. Do not commit font binaries unless your license permits redistribution.
