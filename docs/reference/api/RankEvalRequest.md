## Interface `RankEvalRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; search_type?: never; requests?: never; metric?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `ignore_unavailable` | boolean | If `true`, missing or closed indices are not included in the response. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and index aliases used to limit the request. Wildcard ( `*`) expressions are supported. To target all data streams and indices in a cluster, omit this parameter or use `_all` or `*`. |
| `metric` | [RankEvalRankEvalMetric](./RankEvalRankEvalMetric.md) | Definition of the evaluation metric to calculate. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; search_type?: never; requests?: never; metric?: never; } | All values in `querystring` will be added to the request querystring. |
| `requests` | [RankEvalRankEvalRequestItem](./RankEvalRankEvalRequestItem.md)[] | A set of typical search requests, together with their provided ratings. |
| `search_type` | string | Search operation type |
