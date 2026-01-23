# AnalysisKeywordMarkerTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'keyword_marker'` | - |
| `ignore_case?` | `boolean` | If `true`, matching for the `keywords` and `keywords_path` parameters ignores letter case. Defaults to `false`. |
| `keywords?` | `string | string[]` | Array of keywords. Tokens that match these keywords are not stemmed.
This parameter, `keywords_path`, or `keywords_pattern` must be specified. You cannot specify this parameter and `keywords_pattern`. |
| `keywords_path?` | `string` | Path to a file that contains a list of keywords. Tokens that match these keywords are not stemmed.
This path must be absolute or relative to the `config` location, and the file must be UTF-8 encoded. Each word in the file must be separated by a line break.
This parameter, `keywords`, or `keywords_pattern` must be specified. You cannot specify this parameter and `keywords_pattern`. |
| `keywords_pattern?` | `string` | Java regular expression used to match tokens. Tokens that match this expression are marked as keywords and not stemmed.
This parameter, `keywords`, or `keywords_path` must be specified. You cannot specify this parameter and `keywords` or `keywords_pattern`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
