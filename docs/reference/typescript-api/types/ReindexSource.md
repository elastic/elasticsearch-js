# ReindexSource

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | The name of the data stream, index, or alias you are copying from.
It accepts a comma-separated list to reindex from multiple sources. |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | The documents to reindex, which is defined with Query DSL. |
| `remote?` | [`ReindexRemoteSource`](ReindexRemoteSource.md) | A remote instance of Elasticsearch that you want to index from. |
| `size?` | [`integer`](integer.md) | The number of documents to index per batch.
Use it when you are indexing from remote to ensure that the batches fit within the on-heap buffer, which defaults to a maximum size of 100 MB. |
| `slice?` | [`SlicedScroll`](SlicedScroll.md) | Slice the reindex request manually using the provided slice ID and total number of slices. |
| `sort?` | [`Sort`](Sort.md) | A comma-separated list of `<field>:<direction>` pairs to sort by before indexing.
Use it in conjunction with `max_docs` to control what documents are reindexed.

WARNING: Sort in reindex is deprecated.
Sorting in reindex was never guaranteed to index documents in order and prevents further development of reindex such as resilience and performance improvements.
If used in combination with `max_docs`, consider using a query filter instead. |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | If `true`, reindex all source fields.
Set it to a list to reindex select fields. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
