# `SnapshotDeleteRequest` [interface-SnapshotDeleteRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { repository?: never; snapshot?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. |
| `querystring` | { [key: string]: any; } & { repository?: never; snapshot?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `repository` | [Name](./Name.md) | The name of the repository to delete a snapshot from. |
| `snapshot` | [Name](./Name.md) | A comma-separated list of snapshot names to delete. It also accepts wildcards ( `*`). |
