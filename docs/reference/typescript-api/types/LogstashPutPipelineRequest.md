# LogstashPutPipelineRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | An identifier for the pipeline.
Pipeline IDs must begin with a letter or underscore and contain only letters, underscores, dashes, hyphens and numbers. |
| `pipeline?` | [`LogstashPipeline`](LogstashPipeline.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, pipeline?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, pipeline?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
