## Interface `IlmMigrateToDataTiersRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { dry_run?: never; master_timeout?: never; legacy_template_to_delete?: never; node_attribute?: never; }) | All values in `body` will be added to the request body. |
| `dry_run` | boolean | If true, simulates the migration from node attributes based allocation filters to data tiers, but does not perform the migration. This provides a way to retrieve the indices and ILM policies that need to be migrated. |
| `legacy_template_to_delete` | string | &nbsp; |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. It can also be set to `-1` to indicate that the request should never timeout. |
| `node_attribute` | string | &nbsp; |
| `querystring` | { [key: string]: any; } & { dry_run?: never; master_timeout?: never; legacy_template_to_delete?: never; node_attribute?: never; } | All values in `querystring` will be added to the request querystring. |
