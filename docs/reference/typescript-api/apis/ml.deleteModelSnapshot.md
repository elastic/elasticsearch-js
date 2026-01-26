# Client.ml.deleteModelSnapshot

Delete a model snapshot. You cannot delete the active model snapshot. To delete that snapshot, first revert to a different one. To identify the active model snapshot, refer to the `model_snapshot_id` in the results from the get jobs API.

## Method Signature

```typescript
client.ml.deleteModelSnapshot(this: That, params: T.MlDeleteModelSnapshotRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteModelSnapshotResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteModelSnapshotRequest`](../types/MlDeleteModelSnapshotRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteModelSnapshotResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
