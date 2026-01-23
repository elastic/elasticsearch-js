# DeleteRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | A unique identifier for the document. |
| `index` | [`IndexName`](IndexName.md) | The name of the target index. |
| `if_primary_term?` | [`long`](long.md) | Only perform the operation if the document has this primary term. |
| `if_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | Only perform the operation if the document has this sequence number. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search.
If `wait_for`, it waits for a refresh to make this operation visible to search.
If `false`, it does nothing with refreshes. |
| `routing?` | [`Routing`](Routing.md) | A custom value used to route operations to a specific shard. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for active shards.

This parameter is useful for situations where the primary shard assigned to perform the delete operation might not be available when the delete operation runs.
Some reasons for this might be that the primary shard is currently recovering from a store or undergoing relocation.
By default, the delete operation will wait on the primary shard to become available for up to 1 minute before failing and responding with an error. |
| `version?` | [`VersionNumber`](VersionNumber.md) | An explicit version number for concurrency control.
It must match the current version of the document for the request to succeed. |
| `version_type?` | [`VersionType`](VersionType.md) | The version type. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | The minimum number of shard copies that must be active before proceeding with the operation.
You can set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).
The default value of `1` means it waits for each primary shard to be active. |
| `body?` | `string | { [key: string]: any } & { id?: never, index?: never, if_primary_term?: never, if_seq_no?: never, refresh?: never, routing?: never, timeout?: never, version?: never, version_type?: never, wait_for_active_shards?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, index?: never, if_primary_term?: never, if_seq_no?: never, refresh?: never, routing?: never, timeout?: never, version?: never, version_type?: never, wait_for_active_shards?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
