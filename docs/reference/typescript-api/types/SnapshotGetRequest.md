# SnapshotGetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `repository` | [`Name`](Name.md) | A comma-separated list of snapshot repository names used to limit the request.
Wildcard (`*`) expressions are supported. |
| `snapshot` | [`Names`](Names.md) | A comma-separated list of snapshot names to retrieve
Wildcards (`*`) are supported.

* To get information about all snapshots in a registered repository, use a wildcard (`*`) or `_all`.
* To get information about any snapshots that are currently running, use `_current`. |
| `after?` | `string` | An offset identifier to start pagination from as returned by the next field in the response body. |
| `from_sort_value?` | `string` | The value of the current sort column at which to start retrieval.
It can be a string `snapshot-` or a repository name when sorting by snapshot or repository name.
It can be a millisecond time value or a number when sorting by `index-` or shard count. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error for any snapshots that are unavailable. |
| `index_details?` | `boolean` | If `true`, the response includes additional information about each index in the snapshot comprising the number of shards in the index, the total size of the index in bytes, and the maximum number of segments per shard in the index.
The default is `false`, meaning that this information is omitted. |
| `index_names?` | `boolean` | If `true`, the response includes the name of each index in each snapshot. |
| `include_repository?` | `boolean` | If `true`, the response includes the repository name in each snapshot. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `order?` | [`SortOrder`](SortOrder.md) | The sort order.
Valid values are `asc` for ascending and `desc` for descending order.
The default behavior is ascending order. |
| `offset?` | `integer` | Numeric offset to start pagination from based on the snapshots matching this request. Using a non-zero value for this parameter is mutually exclusive with using the after parameter. Defaults to 0. |
| `size?` | `integer` | The maximum number of snapshots to return.
The default is 0, which means to return all that match the request without limit. |
| `slm_policy_filter?` | [`Name`](Name.md) | Filter snapshots by a comma-separated list of snapshot lifecycle management (SLM) policy names that snapshots belong to.

You can use wildcards (`*`) and combinations of wildcards followed by exclude patterns starting with `-`.
For example, the pattern `*,-policy-a-\*` will return all snapshots except for those that were created by an SLM policy with a name starting with `policy-a-`.
Note that the wildcard pattern `*` matches all snapshots created by an SLM policy but not those snapshots that were not created by an SLM policy.
To include snapshots that were not created by an SLM policy, you can use the special pattern `_none` that will match all snapshots without an SLM policy. |
| `sort?` | [`SnapshotSnapshotSort`](SnapshotSnapshotSort.md) | The sort order for the result.
The default behavior is sorting by snapshot start time stamp. |
| `state?` | `SnapshotSnapshotState | SnapshotSnapshotState[]` | Only return snapshots with a state found in the given comma-separated list of snapshot states.
The default is all snapshot states. |
| `verbose?` | `boolean` | If `true`, returns additional information about each snapshot such as the version of Elasticsearch which took the snapshot, the start and end times of the snapshot, and the number of shards snapshotted.

NOTE: The parameters `size`, `order`, `after`, `from_sort_value`, `offset`, `slm_policy_filter`, and `sort` are not supported when you set `verbose=false` and the sort order for requests with `verbose=false` is undefined. |
| `body?` | `string | { [key: string]: any } & { repository?: never, snapshot?: never, after?: never, from_sort_value?: never, ignore_unavailable?: never, index_details?: never, index_names?: never, include_repository?: never, master_timeout?: never, order?: never, offset?: never, size?: never, slm_policy_filter?: never, sort?: never, state?: never, verbose?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { repository?: never, snapshot?: never, after?: never, from_sort_value?: never, ignore_unavailable?: never, index_details?: never, index_names?: never, include_repository?: never, master_timeout?: never, order?: never, offset?: never, size?: never, slm_policy_filter?: never, sort?: never, state?: never, verbose?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
