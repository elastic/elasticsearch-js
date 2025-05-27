## Interface `MgetRequest`

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | A comma-separated list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. |
| `_source_includes` | [Fields](./Fields.md) | A comma-separated list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored. |
| `_source` | [SearchSourceConfigParam](./SearchSourceConfigParam.md) | True or false to return the `_source` field or not, or a list of fields to return. |
| `body` | string | ({ [key: string]: any; } & { index?: never; force_synthetic_source?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; docs?: never; ids?: never; }) | All values in `body` will be added to the request body. |
| `docs` | [MgetOperation](./MgetOperation.md)[] | The documents you want to retrieve. Required if no index is specified in the request URI. |
| `force_synthetic_source` | boolean | Should this request force synthetic _source? Use this to test if the mapping supports synthetic _source and to get a sense of the worst case performance. Fetches with this enabled will be slower the enabling synthetic source natively in the index. |
| `ids` | [Ids](./Ids.md) | The IDs of the documents you want to retrieve. Allowed when the index is specified in the request URI. |
| `index` | [IndexName](./IndexName.md) | Name of the index to retrieve documents from when `ids` are specified, or when a document in the `docs` array does not specify an index. |
| `preference` | string | Specifies the node or shard the operation should be performed on. Random by default. |
| `querystring` | { [key: string]: any; } & { index?: never; force_synthetic_source?: never; preference?: never; realtime?: never; refresh?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; docs?: never; ids?: never; } | All values in `querystring` will be added to the request querystring. |
| `realtime` | boolean | If `true`, the request is real-time as opposed to near-real-time. |
| `refresh` | boolean | If `true`, the request refreshes relevant shards before retrieving documents. |
| `routing` | [Routing](./Routing.md) | Custom value used to route operations to a specific shard. |
| `stored_fields` | [Fields](./Fields.md) | If `true`, retrieves the document fields stored in the index rather than the document `_source`. |
