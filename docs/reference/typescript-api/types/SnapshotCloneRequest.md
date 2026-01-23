# SnapshotCloneRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `repository` | [`Name`](Name.md) | The name of the snapshot repository that both source and target snapshot belong to. |
| `snapshot` | [`Name`](Name.md) | The source snapshot name. |
| `target_snapshot` | [`Name`](Name.md) | The target snapshot name. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `indices` | `string` | A comma-separated list of indices to include in the snapshot.
Multi-target syntax is supported. |
| `body?` | `string | { [key: string]: any } & { repository?: never, snapshot?: never, target_snapshot?: never, master_timeout?: never, indices?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { repository?: never, snapshot?: never, target_snapshot?: never, master_timeout?: never, indices?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
