# SearchSuggesterBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to fetch the candidate suggestions from.
Needs to be set globally or per suggestion. |
| `analyzer?` | `string` | The analyzer to analyze the suggest text with.
Defaults to the search analyzer of the suggest field. |
| `size?` | [`integer`](integer.md) | The maximum corrections to be returned per suggest text token. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
