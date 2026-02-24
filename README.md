# CatMdX CLI

Read markdown efficiently.

## Usage

```bash
# read metadata, TOC and the '#Usage' section from target markdown
npx catmdx README.md --metadata --toc --section 'Usage'
```

## Options

```
catmdx [file] [options]

Arguments:
  path                     Path to the markdown file, optional with --content or --stdin flag

Options:
  -c, --content <content>  Markdown content provided as a string
  -i, --stdin              Read markdown content from stdin
  -m, --metadata           Print metadata from markdown content
  -t, --toc                Print table of contents from markdown content
  -s, --section <section>  Print specific section from markdown content (e.g. "Introduction" or "#2")
```
