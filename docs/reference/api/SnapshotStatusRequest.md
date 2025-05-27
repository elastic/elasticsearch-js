## Interface `SnapshotStatusRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { repository?: never; snapshot?: never; ignore_unavailable?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error for any snapshots that are unavailable. If `true`, the request ignores snapshots that are unavailable, such as those that are corrupted or temporarily cannot be returned. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. |
| `querystring` | { [key: string]: any; } & { repository?: never; snapshot?: never; ignore_unavailable?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `repository` | [Name](./Name.md) | The snapshot repository name used to limit the request. It supports wildcards ( `*`) if `<snapshot>` isn't specified. |
| `snapshot` | [Names](./Names.md) | A comma-separated list of snapshots to retrieve status for. The default is currently running snapshots. Wildcards ( `*`) are not supported. |
