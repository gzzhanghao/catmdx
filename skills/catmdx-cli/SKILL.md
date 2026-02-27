---
name: catmdx-cli
description: Efficiently read markdown files while minimizing token consumption. Use when you need to read a markdown file while having strict token usage constraints.
---

# Read markdown efficiently with catmdx

```bash
# Print metadata
catmdx SKILL.md --metadata
# Print TOC
catmdx SKILL.md --toc
# Print specified section
catmdx SKILL.md --section 'Quick Start'
```

## Input

```bash
# Read from a markdown file
catmdx SKILL.md --toc
# Specify markdown content as a string
catmdx --content "$(cat SKILL.md)$" --toc
# Read from stdin
cat SKILL.md | catmdx --stdin --toc
```

## Advanced Usage

### TOC with metadata

```bash
catmdx SKILL.md --toc --toc-metadata
```

Output:

```
* [Read markdown efficiently with catmdx](#1) - (Line 1, 155 chs)
  * [Input](#1.1) - (Line 11, 196 chs)
  * [Advanced Usage](#1.2) - (Line 23, empty)
    * [TOC with metadata](#1.2.1) - (Line 23, 485 chs)
    * [Print specific section](#1.2.2) - (Line 45, 150 chs)
    * [Print sections recursively](#1.2.3) - (Line 53, 246 chs)
  * [Agent Notes](#1.3) - (Line 63, 95 chs)
  * [Command Reference](#1.4) - (Line 68, 724 chs)
```

### Print specific section

```bash
# Print the 'Usage' section
catmdx SKILL.md --section 'Usage'
# Print the section with numbered heading
catmdx SKILL.md --section '#1.2.1'
```

### Print sections recursively

By default, `catmdx` only prints the direct content of the specified section. To print subsections recursively, use the `--recursive` flag.

```bash
# Print the 'Usage' section and its subsections
catmdx SKILL.md --section 'Usage' --recursive
```

## Agent Notes

Always use `catmdx` for unknown markdown files to avoid token burn.

```bash
# Print metadata (-m), TOC (-t) and the first section (-s '#1') of unknown.md
catmdx unknown.md -mts '#1' --toc-metadata
```

## Command Reference

```bash
Usage: catmdx [options] [path]

Parse and display specific contents of a markdown

Arguments:
  path                         Path to the markdown file, optional with --content or --stdin flag

Options:
  -c, --content <content>      Markdown content provided as a string
  -i, --stdin                  Read markdown content from stdin
  -m, --metadata               Print metadata
  -t, --toc                    Print table of contents
  --toc-metadata               Print section metadata in table of contents
  -s, --section <sections...>  Print specific sections (e.g. "Introduction" or "#2")
  -r, --recursive              Print subsections recursively
  -h, --help                   display help for command
```
