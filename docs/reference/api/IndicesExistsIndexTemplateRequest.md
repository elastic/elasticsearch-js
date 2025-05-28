# `IndicesExistsIndexTemplateRequest` [interface-IndicesExistsIndexTemplateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; local?: never; flat_settings?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `flat_settings` | boolean | If true, returns settings in flat format. |
| `local` | boolean | If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Name](./Name.md) | Comma-separated list of index template names used to limit the request. Wildcard (*) expressions are supported. |
| `querystring` | { [key: string]: any; } & { name?: never; local?: never; flat_settings?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
