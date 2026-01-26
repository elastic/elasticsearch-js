# Client.snapshot.get

Get snapshot information. NOTE: The `after` parameter and `next` field enable you to iterate through snapshots with some consistency guarantees regarding concurrent creation or deletion of snapshots. It is guaranteed that any snapshot that exists at the beginning of the iteration and is not concurrently deleted will be seen during the iteration. Snapshots concurrently created may be seen during an iteration.

## Method Signature

```typescript
client.snapshot.get(this: That, params: T.SnapshotGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotGetRequest`](../types/SnapshotGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
