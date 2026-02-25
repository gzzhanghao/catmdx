# CatMdX CLI

Read markdown efficiently.

## Usage

```bash
# print metadata, TOC and the '#Usage' section from target markdown
npx catmdx README.md --metadata --toc --section 'Usage'

# or - print from online files
curl https://raw.githubusercontent.com/gzzhanghao/catmdx/refs/heads/main/README.md | npx catmdx --toc --stdin
```

## Options

```
catmdx [file] [options]

Arguments:
  path                     Path to the markdown file, optional with --content or --stdin flag

Options:
  -c, --content <content>  Markdown content provided as a string
  -i, --stdin              Read markdown content from stdin
  -m, --metadata           Print metadata
  -t, --toc                Print table of contents
  --toc-metadata           Print section metadata in table of contents
  -s, --section <section>  Print specific section (e.g. "Introduction" or "#2")
  -r, --recursive          Print subsections recursively
```
