## Interface `SearchSuggesterBase`

| Name | Type | Description |
| - | - | - |
| `analyzer` | string | The analyzer to analyze the suggest text with. Defaults to the search analyzer of the suggest field. |
| `field` | [Field](./Field.md) | The field to fetch the candidate suggestions from. Needs to be set globally or per suggestion. |
| `size` | [integer](./integer.md) | The maximum corrections to be returned per suggest text token. |
