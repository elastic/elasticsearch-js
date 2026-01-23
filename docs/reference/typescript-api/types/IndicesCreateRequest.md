# IndicesCreateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | Name of the index you wish to create.
Index names must meet the following criteria:

* Lowercase only
* Cannot include `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, ` ` (space character), `,`, or `#`
* Indices prior to 7.0 could contain a colon (`:`), but that has been deprecated and will not be supported in later versions
* Cannot start with `-`, `_`, or `+`
* Cannot be `.` or `..`
* Cannot be longer than 255 bytes (note thtat it is bytes, so multi-byte characters will reach the limit faster)
* Names starting with `.` are deprecated, except for hidden indices and internal indices managed by plugins |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation.
Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). |
| `aliases?` | `Record<Name, IndicesAlias>` | Aliases for the index. |
| `mappings?` | [`MappingTypeMapping`](MappingTypeMapping.md) | Mapping for fields in the index. If specified, this mapping can include:
- Field names
- Field data types
- Mapping parameters |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | Configuration options for the index. |
| `body?` | `string | { [key: string]: any } & { index?: never, master_timeout?: never, timeout?: never, wait_for_active_shards?: never, aliases?: never, mappings?: never, settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, master_timeout?: never, timeout?: never, wait_for_active_shards?: never, aliases?: never, mappings?: never, settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
