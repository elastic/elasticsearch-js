# `MlUpgradeJobSnapshotResponse` [interface-MlUpgradeJobSnapshotResponse]

| Name | Type | Description |
| - | - | - |
| `completed` | boolean | When true, this means the task is complete. When false, it is still running. |
| `node` | [NodeId](./NodeId.md) | The ID of the node that the upgrade task was started on if it is still running. In serverless this will be the "serverless". |
