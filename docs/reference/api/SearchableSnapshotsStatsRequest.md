# `SearchableSnapshotsStatsRequest` [interface-SearchableSnapshotsStatsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; level?: never; }) | All values in `body` will be added to the request body. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams and indices to retrieve statistics for. |
| `level` | [SearchableSnapshotsStatsLevel](./SearchableSnapshotsStatsLevel.md) | Return stats aggregated at cluster, index or shard level |
| `querystring` | { [key: string]: any; } & { index?: never; level?: never; } | All values in `querystring` will be added to the request querystring. |
