# CcrReadException

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `exception` | [`ErrorCause`](ErrorCause.md) | The exception that caused the read to fail. |
| `from_seq_no` | [`SequenceNumber`](SequenceNumber.md) | The starting sequence number of the batch requested from the leader. |
| `retries` | [`integer`](integer.md) | The number of times the batch has been retried. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
