## Interface `RRFRetriever`

| Name | Type | Description |
| - | - | - |
| `rank_constant` | [integer](./integer.md) | This value determines how much influence documents in individual result sets per query have over the final ranked result set. |
| `rank_window_size` | [integer](./integer.md) | This value determines the size of the individual result sets per query. |
| `retrievers` | [RetrieverContainer](./RetrieverContainer.md)[] | A list of child retrievers to specify which sets of returned top documents will have the RRF formula applied to them. |
