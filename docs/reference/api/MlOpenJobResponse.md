# `MlOpenJobResponse` [interface-MlOpenJobResponse]

| Name | Type | Description |
| - | - | - |
| `node` | [NodeId](./NodeId.md) | The ID of the node that the job was started on. In serverless this will be the "serverless". If the job is allowed to open lazily and has not yet been assigned to a node, this value is an empty string. |
| `opened` | boolean | &nbsp; |
