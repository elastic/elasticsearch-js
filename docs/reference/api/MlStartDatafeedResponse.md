# `MlStartDatafeedResponse` [interface-MlStartDatafeedResponse]

| Name | Type | Description |
| - | - | - |
| `node` | [NodeIds](./NodeIds.md) | The ID of the node that the job was started on. In serverless this will be the "serverless". If the job is allowed to open lazily and has not yet been assigned to a node, this value is an empty string. |
| `started` | boolean | For a successful response, this value is always `true`. On failure, an exception is returned instead. |
