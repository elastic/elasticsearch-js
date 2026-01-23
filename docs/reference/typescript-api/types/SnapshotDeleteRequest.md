# SnapshotDeleteRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `repository` | [`Name`](Name.md) | The name of the repository to delete a snapshot from. |
| `snapshot` | [`Names`](Names.md) | A comma-separated list of snapshot names to delete.
It also accepts wildcards (`*`). |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `wait_for_completion?` | `boolean` | If `true`, the request returns a response when the matching snapshots are all deleted.
If `false`, the request returns a response as soon as the deletes are scheduled. |
| `body?` | `string | { [key: string]: any } & { repository?: never, snapshot?: never, master_timeout?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { repository?: never, snapshot?: never, master_timeout?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
