## Interface `TransformPutTransformRequest`

| Name | Type | Description |
| - | - | - |
| `_meta` | [Metadata](./Metadata.md) | Defines optional transform metadata. |
| `body` | string | ({ [key: string]: any; } & { transform_id?: never; defer_validation?: never; timeout?: never; dest?: never; description?: never; frequency?: never; latest?: never; _meta?: never; pivot?: never; retention_policy?: never; settings?: never; source?: never; sync?: never; }) | All values in `body` will be added to the request body. |
| `defer_validation` | boolean | When the transform is created, a series of validations occur to ensure its success. For example, there is a check for the existence of the source indices and a check that the destination index is not part of the source index pattern. You can use this parameter to skip the checks, for example when the source index does not exist until after the transform is created. The validations are always run when you start the transform, however, with the exception of privilege checks. |
| `description` | string | Free text description of the transform. |
| `dest` | [TransformDestination](./TransformDestination.md) | The destination for the transform. |
| `frequency` | [Duration](./Duration.md) | The interval between checks for changes in the source indices when the transform is running continuously. Also determines the retry interval in the event of transient failures while the transform is searching or indexing. The minimum value is `1s` and the maximum is `1h`. |
| `latest` | [TransformLatest](./TransformLatest.md) | The latest method transforms the data by finding the latest document for each unique key. |
| `pivot` | [TransformPivot](./TransformPivot.md) | The pivot method transforms the data by aggregating and grouping it. These objects define the group by fields and the aggregation to reduce the data. |
| `querystring` | { [key: string]: any; } & { transform_id?: never; defer_validation?: never; timeout?: never; dest?: never; description?: never; frequency?: never; latest?: never; _meta?: never; pivot?: never; retention_policy?: never; settings?: never; source?: never; sync?: never; } | All values in `querystring` will be added to the request querystring. |
| `retention_policy` | [TransformRetentionPolicyContainer](./TransformRetentionPolicyContainer.md) | Defines a retention policy for the transform. Data that meets the defined criteria is deleted from the destination index. |
| `settings` | [TransformSettings](./TransformSettings.md) | Defines optional transform settings. |
| `source` | [TransformSource](./TransformSource.md) | The source of the data for the transform. |
| `sync` | [TransformSyncContainer](./TransformSyncContainer.md) | Defines the properties transforms require to run continuously. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `transform_id` | [Id](./Id.md) | Identifier for the transform. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It has a 64 character limit and must start and end with alphanumeric characters. |
