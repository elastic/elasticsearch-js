# `ExplainRequest` [interface-ExplainRequest]

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | A comma-separated list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored. |
| `_source_includes` | [Fields](./Fields.md) | A comma-separated list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored. |
| `_source` | [SearchSourceConfigParam](./SearchSourceConfigParam.md) | `True` or `false` to return the `_source` field or not or a list of fields to return. |
| `analyze_wildcard` | boolean | If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified. |
| `analyzer` | string | The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `body` | string | ({ [key: string]: any; } & { id?: never; index?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; lenient?: never; preference?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; q?: never; query?: never; }) | All values in `body` will be added to the request body. |
| `default_operator` | [QueryDslOperator](./QueryDslOperator.md) | The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified. |
| `df` | string | The field to use as default where no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `id` | [Id](./Id.md) | The document identifier. |
| `index` | [IndexName](./IndexName.md) | Index names that are used to limit the request. Only a single index name can be provided to this parameter. |
| `lenient` | boolean | If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified. |
| `preference` | string | The node or shard the operation should be performed on. It is random by default. |
| `q` | string | The query in the Lucene query string syntax. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Defines the search definition using the Query DSL. |
| `querystring` | { [key: string]: any; } & { id?: never; index?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; lenient?: never; preference?: never; routing?: never; _source?: never; _source_excludes?: never; _source_includes?: never; stored_fields?: never; q?: never; query?: never; } | All values in `querystring` will be added to the request querystring. |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `stored_fields` | [Fields](./Fields.md) | A comma-separated list of stored fields to return in the response. |
