# Client.indices.recovery

Get index recovery information. Get information about ongoing and completed shard recoveries for one or more indices. For data streams, the API returns information for the stream's backing indices. All recoveries, whether ongoing or complete, are kept in the cluster state and may be reported on at any time. Shard recovery is the process of initializing a shard copy, such as restoring a primary shard from a snapshot or creating a replica shard from a primary shard. When a shard recovery completes, the recovered shard is available for search and indexing. Recovery automatically occurs during the following processes: * When creating an index for the first time. * When a node rejoins the cluster and starts up any missing primary shard copies using the data that it holds in its data path. * Creation of new replica shard copies from the primary. * Relocation of a shard copy to a different node in the same cluster. * A snapshot restore operation. * A clone, shrink, or split operation. You can determine the cause of a shard recovery using the recovery or cat recovery APIs. The index recovery API reports information about completed recoveries only for shard copies that currently exist in the cluster. It only reports the last recovery for each shard copy and does not report historical information about earlier recoveries, nor does it report information about the recoveries of shard copies that no longer exist. This means that if a shard copy completes a recovery and then Elasticsearch relocates it onto a different node then the information about the original recovery will not be shown in the recovery API.

## Method Signature

```typescript
client.indices.recovery(this: That, params?: T.IndicesRecoveryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesRecoveryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesRecoveryRequest`](../types/IndicesRecoveryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesRecoveryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
