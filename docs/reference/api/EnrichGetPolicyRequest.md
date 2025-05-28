# `EnrichGetPolicyRequest` [interface-EnrichGetPolicyRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `name` | [Names](./Names.md) | Comma-separated list of enrich policy names used to limit the request. To return information for all enrich policies, omit this parameter. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
