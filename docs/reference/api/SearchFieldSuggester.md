# `SearchFieldSuggester` [interface-SearchFieldSuggester]

| Name | Type | Description |
| - | - | - |
| `completion` | [SearchCompletionSuggester](./SearchCompletionSuggester.md) | Provides auto-complete/search-as-you-type functionality. |
| `phrase` | [SearchPhraseSuggester](./SearchPhraseSuggester.md) | Provides access to word alternatives on a per token basis within a certain string distance. |
| `prefix` | string | Prefix used to search for suggestions. |
| `regex` | string | A prefix expressed as a regular expression. |
| `term` | [SearchTermSuggester](./SearchTermSuggester.md) | Suggests terms based on edit distance. |
| `text` | string | The text to use as input for the suggester. Needs to be set globally or per suggestion. |
