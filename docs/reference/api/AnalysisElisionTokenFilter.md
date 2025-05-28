# `AnalysisElisionTokenFilter` [interface-AnalysisElisionTokenFilter]

| Name | Type | Description |
| - | - | - |
| `articles_case` | [SpecUtilsStringified](./SpecUtilsStringified.md)<boolean> | If `true`, elision matching is case insensitive. If `false`, elision matching is case sensitive. Defaults to `false`. |
| `articles_path` | string | Path to a file that contains a list of elisions to remove. This path must be absolute or relative to the `config` location, and the file must be UTF-8 encoded. Each elision in the file must be separated by a line break. To be removed, the elision must be at the beginning of a token and be immediately followed by an apostrophe. Both the elision and apostrophe are removed. For custom `elision` filters, either this parameter or `articles` must be specified. |
| `articles` | string[] | List of elisions to remove. To be removed, the elision must be at the beginning of a token and be immediately followed by an apostrophe. Both the elision and apostrophe are removed. For custom `elision` filters, either this parameter or `articles_path` must be specified. |
| `type` | 'elision' | &nbsp; |
