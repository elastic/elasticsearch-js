# NodesTransportHistogram

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count?` | `long` | The number of times a transport thread took a period of time within the bounds of this bucket to handle an inbound message. |
| `lt_millis?` | `long` | The exclusive upper bound of the bucket in milliseconds.
May be omitted on the last bucket if this bucket has no upper bound. |
| `ge_millis?` | `long` | The inclusive lower bound of the bucket in milliseconds. May be omitted on the first bucket if this bucket has no lower bound. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
