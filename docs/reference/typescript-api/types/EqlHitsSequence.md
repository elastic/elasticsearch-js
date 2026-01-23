# EqlHitsSequence

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `events` | [`EqlHitsEvent`](EqlHitsEvent.md)<TEvent>[] | Contains events matching the query. Each object represents a matching event. |
| `join_keys?` | `any[]` | Shared field values used to constrain matches in the sequence. These are defined using the by keyword in the EQL query syntax. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
