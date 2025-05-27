## Interface `AnalysisPatternReplaceTokenFilter`

| Name | Type | Description |
| - | - | - |
| `all` | boolean | If `true`, all substrings matching the pattern parameter’s regular expression are replaced. If `false`, the filter replaces only the first matching substring in each token. Defaults to `true`. |
| `pattern` | string | Regular expression, written in Java’s regular expression syntax. The filter replaces token substrings matching this pattern with the substring in the `replacement` parameter. |
| `replacement` | string | Replacement substring. Defaults to an empty substring ( `""`). |
| `type` | 'pattern_replace' | &nbsp; |
