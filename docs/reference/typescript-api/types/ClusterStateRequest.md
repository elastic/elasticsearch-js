# ClusterStateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `metric?` | [`ClusterStateClusterStateMetrics`](ClusterStateClusterStateMetrics.md) | Limit the information returned to the specified metrics. |
| `index?` | [`Indices`](Indices.md) | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices |
| `allow_no_indices?` | `boolean` | Whether to ignore if a wildcard indices expression resolves into no concrete indices.
(This includes `_all` string or when no indices have been specified) |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both |
| `flat_settings?` | `boolean` | Return settings in flat format |
| `ignore_unavailable?` | `boolean` | Whether specified concrete indices should be ignored when unavailable (missing or closed) |
| `local?` | `boolean` | Return local information, do not retrieve the state from master node |
| `master_timeout?` | [`Duration`](Duration.md) | Timeout for waiting for new cluster state in case it is blocked |
| `wait_for_metadata_version?` | [`VersionNumber`](VersionNumber.md) | Wait for the metadata version to be equal or greater than the specified metadata version |
| `wait_for_timeout?` | [`Duration`](Duration.md) | The maximum time to wait for wait_for_metadata_version before timing out |
| `body?` | `string | { [key: string]: any } & { metric?: never, index?: never, allow_no_indices?: never, expand_wildcards?: never, flat_settings?: never, ignore_unavailable?: never, local?: never, master_timeout?: never, wait_for_metadata_version?: never, wait_for_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { metric?: never, index?: never, allow_no_indices?: never, expand_wildcards?: never, flat_settings?: never, ignore_unavailable?: never, local?: never, master_timeout?: never, wait_for_metadata_version?: never, wait_for_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
