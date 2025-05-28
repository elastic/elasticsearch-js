# `TransformPreviewTransformRequest` [interface-TransformPreviewTransformRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; timeout?: never; dest?: never; description?: never; frequency?: never; pivot?: never; source?: never; settings?: never; sync?: never; retention_policy?: never; latest?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | Free text description of the transform. |
| `dest` | [TransformDestination](./TransformDestination.md) | The destination for the transform. |
| `frequency` | [Duration](./Duration.md) | The interval between checks for changes in the source indices when the transform is running continuously. Also determines the retry interval in the event of transient failures while the transform is searching or indexing. The minimum value is 1s and the maximum is 1h. |
| `latest` | [TransformLatest](./TransformLatest.md) | The latest method transforms the data by finding the latest document for each unique key. |
| `pivot` | [TransformPivot](./TransformPivot.md) | The pivot method transforms the data by aggregating and grouping it. These objects define the group by fields and the aggregation to reduce the data. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; timeout?: never; dest?: never; description?: never; frequency?: never; pivot?: never; source?: never; settings?: never; sync?: never; retention_policy?: never; latest?: never; } | All values in `querystring` will be added to the request querystring. |
| `retention_policy` | [TransformRetentionPolicyContainer](./TransformRetentionPolicyContainer.md) | Defines a retention policy for the transform. Data that meets the defined criteria is deleted from the destination index. |
| `settings` | [TransformSettings](./TransformSettings.md) | Defines optional transform settings. |
| `source` | [TransformSource](./TransformSource.md) | The source of the data for the transform. |
| `sync` | [TransformSyncContainer](./TransformSyncContainer.md) | Defines the properties transforms require to run continuously. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `transform_id` | [Id](./Id.md) | Identifier for the transform to preview. If you specify this path parameter, you cannot provide transform configuration details in the request body. |
