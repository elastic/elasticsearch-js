# `SearchCompletionSuggester` [interface-SearchCompletionSuggester]

| Name | Type | Description |
| - | - | - |
| `contexts` | Record<[Field](./Field.md), [SearchCompletionContext](./SearchCompletionContext.md) | [SearchContext](./SearchContext.md) | ([SearchCompletionContext](./SearchCompletionContext.md) | [SearchContext](./SearchContext.md))[]> | A value, geo point object, or a geo hash string to filter or boost the suggestion on. |
| `fuzzy` | [SearchSuggestFuzziness](./SearchSuggestFuzziness.md) | Enables fuzziness, meaning you can have a typo in your search and still get results back. |
| `regex` | [SearchRegexOptions](./SearchRegexOptions.md) | A regex query that expresses a prefix as a regular expression. |
| `skip_duplicates` | boolean | Whether duplicate suggestions should be filtered out. |
