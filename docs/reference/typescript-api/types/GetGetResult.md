# GetGetResult

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_index` | [`IndexName`](IndexName.md) | The name of the index the document belongs to. |
| `fields?` | `Record<string, any>` | If the `stored_fields` parameter is set to `true` and `found` is `true`, it contains the document fields stored in the index. |
| `_ignored?` | `string`[] | - |
| `found` | `boolean` | Indicates whether the document exists. |
| `_id` | [`Id`](Id.md) | The unique identifier for the document. |
| `_primary_term?` | [`long`](long.md) | The primary term assigned to the document for the indexing operation. |
| `_routing?` | `string` | The explicit routing, if set. |
| `_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | The sequence number assigned to the document for the indexing operation.
Sequence numbers are used to ensure an older version of a document doesn't overwrite a newer version. |
| `_source?` | `TDocument` | If `found` is `true`, it contains the document data formatted in JSON.
If the `_source` parameter is set to `false` or the `stored_fields` parameter is set to `true`, it is excluded. |
| `_version?` | [`VersionNumber`](VersionNumber.md) | The document version, which is ncremented each time the document is updated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
