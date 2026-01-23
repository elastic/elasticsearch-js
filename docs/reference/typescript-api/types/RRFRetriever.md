# RRFRetriever

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `retrievers` | `RRFRetrieverEntry[]` | A list of child retrievers to specify which sets of returned top documents will have the RRF formula applied to them. Each retriever can optionally include a weight parameter. |
| `rank_constant?` | `integer` | This value determines how much influence documents in individual result sets per query have over the final ranked result set. |
| `rank_window_size?` | `integer` | This value determines the size of the individual result sets per query. |
| `query?` | `string` | - |
| `fields?` | `string[]` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
