# Client.snapshot.status

Get the snapshot status. Get a detailed description of the current state for each shard participating in the snapshot. Note that this API should be used only to obtain detailed shard-level information for ongoing snapshots. If this detail is not needed or you want to obtain information about one or more existing snapshots, use the get snapshot API. If you omit the `<snapshot>` request path parameter, the request retrieves information only for currently running snapshots. This usage is preferred. If needed, you can specify `<repository>` and `<snapshot>` to retrieve information for specific snapshots, even if they're not currently running. Note that the stats will not be available for any shard snapshots in an ongoing snapshot completed by a node that (even momentarily) left the cluster. Loading the stats from the repository is an expensive operation (see the WARNING below). Therefore the stats values for such shards will be -1 even though the "stage" value will be "DONE", in order to minimize latency. A "description" field will be present for a shard snapshot completed by a departed node explaining why the shard snapshot's stats results are invalid. Consequently, the total stats for the index will be less than expected due to the missing values from these shards. WARNING: Using the API to return the status of any snapshots other than currently running snapshots can be expensive. The API requires a read from the repository for each shard in each snapshot. For example, if you have 100 snapshots with 1,000 shards each, an API request that includes all snapshots will require 100,000 reads (100 snapshots x 1,000 shards). Depending on the latency of your storage, such requests can take an extremely long time to return results. These requests can also tax machine resources and, when using cloud storage, incur high processing costs.

## Method Signature

```typescript
client.snapshot.status(this: That, params?: T.SnapshotStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SnapshotStatusRequest`](../types/SnapshotStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
