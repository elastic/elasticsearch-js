# KnnSearchResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `took` | `long` | The milliseconds it took Elasticsearch to run the request. |
| `timed_out` | `boolean` | If true, the request timed out before completion;
returned results may be partial or empty. |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | A count of shards used for the request. |
| `hits` | `SearchHitsMetadata<TDocument>` | The returned documents and metadata. |
| `fields?` | `Record<string, any>` | The field values for the documents. These fields
must be specified in the request using the `fields` parameter. |
| `max_score?` | `double` | The highest returned document score. This value is null for requests
that do not sort by score. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
