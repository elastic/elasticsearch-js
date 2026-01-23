# SearchFieldCollapse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to collapse the result set on |
| `inner_hits?` | `SearchInnerHits | SearchInnerHits[]` | The number of inner hits and their sort order |
| `max_concurrent_group_searches?` | [`integer`](integer.md) | The number of concurrent requests allowed to retrieve the inner_hits per group |
| `collapse?` | [`SearchFieldCollapse`](SearchFieldCollapse.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
