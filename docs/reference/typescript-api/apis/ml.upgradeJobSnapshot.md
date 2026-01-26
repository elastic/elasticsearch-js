# Client.ml.upgradeJobSnapshot

Upgrade a snapshot. Upgrade an anomaly detection model snapshot to the latest major version. Over time, older snapshot formats are deprecated and removed. Anomaly detection jobs support only snapshots that are from the current or previous major version. This API provides a means to upgrade a snapshot to the current major version. This aids in preparing the cluster for an upgrade to the next major version. Only one snapshot per anomaly detection job can be upgraded at a time and the upgraded snapshot cannot be the current snapshot of the anomaly detection job.

## Method Signature

```typescript
client.ml.upgradeJobSnapshot(this: That, params: T.MlUpgradeJobSnapshotRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlUpgradeJobSnapshotResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlUpgradeJobSnapshotRequest`](../types/MlUpgradeJobSnapshotRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlUpgradeJobSnapshotResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
