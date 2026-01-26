# IndicesAnalyzeRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | Index used to derive the analyzer.
If specified, the `analyzer` or field parameter overrides this value.
If no index is specified or the index does not have a default analyzer, the analyze API uses the standard analyzer. |
| `analyzer?` | `string` | The name of the analyzer that should be applied to the provided `text`.
This could be a built-in analyzer, or an analyzer that’s been configured in the index. |
| `attributes?` | `string`[] | Array of token attributes used to filter the output of the `explain` parameter. |
| `char_filter?` | [`AnalysisCharFilter`](AnalysisCharFilter.md)[] | Array of character filters used to preprocess characters before the tokenizer. |
| `explain?` | `boolean` | If `true`, the response includes token attributes and additional details. |
| `field?` | [`Field`](Field.md) | Field used to derive the analyzer.
To use this parameter, you must specify an index.
If specified, the `analyzer` parameter overrides this value. |
| `filter?` | [`AnalysisTokenFilter`](AnalysisTokenFilter.md)[] | Array of token filters used to apply after the tokenizer. |
| `normalizer?` | `string` | Normalizer to use to convert text into a single token. |
| `text?` | [`IndicesAnalyzeTextToAnalyze`](IndicesAnalyzeTextToAnalyze.md) | Text to analyze.
If an array of strings is provided, it is analyzed as a multi-value field. |
| `tokenizer?` | [`AnalysisTokenizer`](AnalysisTokenizer.md) | Tokenizer to use to convert text into tokens. |
| `body?` | `string | { [key: string]: any } & { index?: never, analyzer?: never, attributes?: never, char_filter?: never, explain?: never, field?: never, filter?: never, normalizer?: never, text?: never, tokenizer?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, analyzer?: never, attributes?: never, char_filter?: never, explain?: never, field?: never, filter?: never, normalizer?: never, text?: never, tokenizer?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
