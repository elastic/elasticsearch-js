# MlCategorizationAnalyzerDefinition

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `char_filter?` | `AnalysisCharFilter[]` | One or more character filters. In addition to the built-in character filters, other plugins can provide more character filters. If this property is not specified, no character filters are applied prior to categorization. If you are customizing some other aspect of the analyzer and you need to achieve the equivalent of `categorization_filters` (which are not permitted when some other aspect of the analyzer is customized), add them here as pattern replace character filters. |
| `filter?` | `AnalysisTokenFilter[]` | One or more token filters. In addition to the built-in token filters, other plugins can provide more token filters. If this property is not specified, no token filters are applied prior to categorization. |
| `tokenizer?` | [`AnalysisTokenizer`](AnalysisTokenizer.md) | The name or definition of the tokenizer to use after character filters are applied. This property is compulsory if `categorization_analyzer` is specified as an object. Machine learning provides a tokenizer called `ml_standard` that tokenizes in a way that has been determined to produce good categorization results on a variety of log file formats for logs in English. If you want to use that tokenizer but change the character or token filters, specify "tokenizer": "ml_standard" in your `categorization_analyzer`. Additionally, the `ml_classic` tokenizer is available, which tokenizes in the same way as the non-customizable tokenizer in old versions of the product (before 6.2). `ml_classic` was the default categorization tokenizer in versions 6.2 to 7.13, so if you need categorization identical to the default for jobs created in these versions, specify "tokenizer": "ml_classic" in your `categorization_analyzer`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
