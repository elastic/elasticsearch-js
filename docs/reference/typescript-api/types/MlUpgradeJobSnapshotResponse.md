# MlUpgradeJobSnapshotResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node` | [`NodeId`](NodeId.md) | The ID of the node that the upgrade task was started on if it is still running. In serverless this will be the "serverless". |
| `completed` | `boolean` | When true, this means the task is complete. When false, it is still running. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
