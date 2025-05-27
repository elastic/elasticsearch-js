## Interface `MlStartDataFrameAnalyticsResponse`

| Name | Type | Description |
| - | - | - |
| `acknowledged` | boolean | &nbsp; |
| `node` | [NodeId](./NodeId.md) | The ID of the node that the job was started on. If the job is allowed to open lazily and has not yet been assigned to a node, this value is an empty string. The node ID of the node the job has been assigned to, or an empty string if it hasn't been assigned to a node. In serverless if the job has been assigned to run then the node ID will be "serverless". |
