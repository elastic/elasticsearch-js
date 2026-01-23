# GraphVertexDefinition

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `exclude?` | `string[]` | Prevents the specified terms from being included in the results. |
| `field` | [`Field`](Field.md) | Identifies a field in the documents of interest. |
| `include?` | `(GraphVertexInclude | string)[]` | Identifies the terms of interest that form the starting points from which you want to spider out. |
| `min_doc_count?` | `long` | Specifies how many documents must contain a pair of terms before it is considered to be a useful connection.
This setting acts as a certainty threshold. |
| `shard_min_doc_count?` | `long` | Controls how many documents on a particular shard have to contain a pair of terms before the connection is returned for global consideration. |
| `size?` | `integer` | Specifies the maximum number of vertex terms returned for each field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
