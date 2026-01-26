# Client.ml.revertModelSnapshot

Revert to a snapshot. The machine learning features react quickly to anomalous input, learning new behaviors in data. Highly anomalous input increases the variance in the models whilst the system learns whether this is a new step-change in behavior or a one-off event. In the case where this anomalous input is known to be a one-off, then it might be appropriate to reset the model state to a time before this event. For example, you might consider reverting to a saved snapshot after Black Friday or a critical system failure.

## Method Signature

```typescript
client.ml.revertModelSnapshot(this: That, params: T.MlRevertModelSnapshotRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlRevertModelSnapshotResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlRevertModelSnapshotRequest`](../types/MlRevertModelSnapshotRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlRevertModelSnapshotResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
