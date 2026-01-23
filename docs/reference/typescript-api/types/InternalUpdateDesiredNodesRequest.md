# InternalUpdateDesiredNodesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `history_id` | `string` | The history ID |
| `version` | `long` | The version number |
| `dry_run?` | `boolean` | Simulate the update |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `any` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
