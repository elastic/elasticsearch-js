# Client.indices.promoteDataStream

Promote a data stream. Promote a data stream from a replicated data stream managed by cross-cluster replication (CCR) to a regular data stream. With CCR auto following, a data stream from a remote cluster can be replicated to the local cluster. These data streams can't be rolled over in the local cluster. These replicated data streams roll over only if the upstream data stream rolls over. In the event that the remote cluster is no longer available, the data stream in the local cluster can be promoted to a regular data stream, which allows these data streams to be rolled over in the local cluster. NOTE: When promoting a data stream, ensure the local cluster has a data stream enabled index template that matches the data stream. If this is missing, the data stream will not be able to roll over until a matching index template is created. This will affect the lifecycle management of the data stream and interfere with the data stream size and retention.

## Method Signature

```typescript
client.indices.promoteDataStream(this: That, params: T.IndicesPromoteDataStreamRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPromoteDataStreamResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPromoteDataStreamRequest`](../types/IndicesPromoteDataStreamRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPromoteDataStreamResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
