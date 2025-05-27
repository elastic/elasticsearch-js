## Interface `EnrichPutPolicyRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; geo_match?: never; match?: never; range?: never; }) | All values in `body` will be added to the request body. |
| `geo_match` | [EnrichPolicy](./EnrichPolicy.md) | Matches enrich data to incoming documents based on a `geo_shape` query. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `match` | [EnrichPolicy](./EnrichPolicy.md) | Matches enrich data to incoming documents based on a `term` query. |
| `name` | [Name](./Name.md) | Name of the enrich policy to create or update. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; geo_match?: never; match?: never; range?: never; } | All values in `querystring` will be added to the request querystring. |
| `range` | [EnrichPolicy](./EnrichPolicy.md) | Matches a number, date, or IP address in incoming documents to a range in the enrich index based on a `term` query. |
