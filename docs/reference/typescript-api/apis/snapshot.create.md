# Client.snapshot.create

Create a snapshot. Take a snapshot of a cluster or of data streams and indices.

## Method Signature

```typescript
client.snapshot.create(this: That, params: T.SnapshotCreateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotCreateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotCreateRequest`](../types/SnapshotCreateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotCreateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
