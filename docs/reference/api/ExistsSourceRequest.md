# `ExistsSourceRequest` [interface-ExistsSourceRequest]

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | A comma-separated list of source fields to exclude in the response. |
| `_source_includes` | [Fields](./Fields.md) | A comma-separated list of source fields to include in the response. |
| `_source` | [SearchSourceConfigParam](./SearchSourceConfigParam.md) | Indicates whether to return the `_source` field ( `true` or `false`) or lists the fields to return. |
| `body` | string | ({ [key: string]: any; } & { id?: never; index?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; version?: never; version_type?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | A unique identifier for the document. |
| `index` | [IndexName](./IndexName.md) | A comma-separated list of data streams, indices, and aliases. It supports wildcards ( `*`). |
| `preference` | string | The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas. |
| `querystring` | { [key: string]: any; } & { id?: never; index?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; version?: never; version_type?: never; } | All values in `querystring` will be added to the request querystring. |
| `realtime` | boolean | If `true`, the request is real-time as opposed to near-real-time. |
| `refresh` | boolean | If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing). |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `version_type` | [VersionType](./VersionType.md) | The version type. |
| `version` | [VersionNumber](./VersionNumber.md) | The version number for concurrency control. It must match the current version of the document for the request to succeed. |
