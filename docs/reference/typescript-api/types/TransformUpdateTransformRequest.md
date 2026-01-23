# TransformUpdateTransformRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transform_id` | [`Id`](Id.md) | Identifier for the transform. |
| `defer_validation?` | `boolean` | When true, deferrable validations are not run. This behavior may be
desired if the source index does not exist until after the transform is
created. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the
timeout expires, the request fails and returns an error. |
| `dest?` | [`TransformDestination`](TransformDestination.md) | The destination for the transform. |
| `description?` | `string` | Free text description of the transform. |
| `frequency?` | [`Duration`](Duration.md) | The interval between checks for changes in the source indices when the
transform is running continuously. Also determines the retry interval in
the event of transient failures while the transform is searching or
indexing. The minimum value is 1s and the maximum is 1h. |
| `_meta?` | [`Metadata`](Metadata.md) | Defines optional transform metadata. |
| `source?` | [`TransformSource`](TransformSource.md) | The source of the data for the transform. |
| `settings?` | [`TransformSettings`](TransformSettings.md) | Defines optional transform settings. |
| `sync?` | [`TransformSyncContainer`](TransformSyncContainer.md) | Defines the properties transforms require to run continuously. |
| `retention_policy?` | `TransformRetentionPolicyContainer | null` | Defines a retention policy for the transform. Data that meets the defined
criteria is deleted from the destination index. |
| `body?` | `string | { [key: string]: any } & { transform_id?: never, defer_validation?: never, timeout?: never, dest?: never, description?: never, frequency?: never, _meta?: never, source?: never, settings?: never, sync?: never, retention_policy?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { transform_id?: never, defer_validation?: never, timeout?: never, dest?: never, description?: never, frequency?: never, _meta?: never, source?: never, settings?: never, sync?: never, retention_policy?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
