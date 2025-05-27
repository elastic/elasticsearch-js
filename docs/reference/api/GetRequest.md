## Interface `GetRequest`

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | A comma-separated list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored. |
| `_source_includes` | [Fields](./Fields.md) | A comma-separated list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored. |
| `_source` | [SearchSourceConfigParam](./SearchSourceConfigParam.md) | Indicates whether to return the `_source` field ( `true` or `false`) or lists the fields to return. |
| `body` | string | ({ [key: string]: any; } & { id?: never; index?: never; force_synthetic_source?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; version?: never; version_type?: never; }) | All values in `body` will be added to the request body. |
| `force_synthetic_source` | boolean | Indicates whether the request forces synthetic `_source`. Use this paramater to test if the mapping supports synthetic `_source` and to get a sense of the worst case performance. Fetches with this parameter enabled will be slower than enabling synthetic source natively in the index. |
| `id` | [Id](./Id.md) | A unique document identifier. |
| `index` | [IndexName](./IndexName.md) | The name of the index that contains the document. |
| `preference` | string | The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas. If it is set to `_local`, the operation will prefer to be run on a local allocated shard when possible. If it is set to a custom value, the value is used to guarantee that the same shards will be used for the same custom value. This can help with "jumping values" when hitting different shards in different refresh states. A sample value can be something like the web session ID or the user name. |
| `querystring` | { [key: string]: any; } & { id?: never; index?: never; force_synthetic_source?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; version?: never; version_type?: never; } | All values in `querystring` will be added to the request querystring. |
| `realtime` | boolean | If `true`, the request is real-time as opposed to near-real-time. |
| `refresh` | boolean | If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing). |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `stored_fields` | [Fields](./Fields.md) | A comma-separated list of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the `_source` parameter defaults to `false`. Only leaf fields can be retrieved with the `stored_field` option. Object fields can't be returned;if specified, the request fails. |
| `version_type` | [VersionType](./VersionType.md) | The version type. |
| `version` | [VersionNumber](./VersionNumber.md) | The version number for concurrency control. It must match the current version of the document for the request to succeed. |
