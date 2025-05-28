# `IndicesSimulateIndexTemplateRequest` [interface-IndicesSimulateIndexTemplateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; create?: never; cause?: never; master_timeout?: never; include_defaults?: never; }) | All values in `body` will be added to the request body. |
| `cause` | string | User defined reason for dry-run creating the new template for simulation purposes |
| `create` | boolean | Whether the index template we optionally defined in the body should only be dry-run added if new or can also replace an existing one |
| `include_defaults` | boolean | If true, returns all relevant default configurations for the index template. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Name](./Name.md) | Name of the index to simulate |
| `querystring` | { [key: string]: any; } & { name?: never; create?: never; cause?: never; master_timeout?: never; include_defaults?: never; } | All values in `querystring` will be added to the request querystring. |
