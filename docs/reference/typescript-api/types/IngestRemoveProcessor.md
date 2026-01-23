# IngestRemoveProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Fields`](Fields.md) | Fields to be removed. Supports template snippets. |
| `keep?` | [`Fields`](Fields.md) | Fields to be kept. When set, all fields other than those specified are removed. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
