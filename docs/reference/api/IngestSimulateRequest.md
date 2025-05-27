## Interface `IngestSimulateRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; verbose?: never; docs?: never; pipeline?: never; }) | All values in `body` will be added to the request body. |
| `docs` | [IngestDocument](./IngestDocument.md)[] | Sample documents to test in the pipeline. |
| `id` | [Id](./Id.md) | The pipeline to test. If you don't specify a `pipeline` in the request body, this parameter is required. |
| `pipeline` | [IngestPipeline](./IngestPipeline.md) | The pipeline to test. If you don't specify the `pipeline` request path parameter, this parameter is required. If you specify both this and the request path parameter, the API only uses the request path parameter. |
| `querystring` | { [key: string]: any; } & { id?: never; verbose?: never; docs?: never; pipeline?: never; } | All values in `querystring` will be added to the request querystring. |
| `verbose` | boolean | If `true`, the response includes output data for each processor in the executed pipeline. |
