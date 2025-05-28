# `IngestDeletePipelineRequest` [interface-IngestDeletePipelineRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | Pipeline ID or wildcard expression of pipeline IDs used to limit the request. To delete all ingest pipelines in a cluster, use a value of `*`. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { id?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
