# `NodeOptions` [interface-NodeOptions]

| Name | Type | Description |
| - | - | - |
| `agent` | [HttpAgentOptions](./HttpAgentOptions.md) | [UndiciAgentOptions](./UndiciAgentOptions.md) | agent Custom HTTP agent options |
| `headers` | Record<string, any> | headers Custom HTTP headers that should be sent with each request |
| `id` | string | &nbsp; |
| `roles` | { master: boolean; data: boolean; ingest: boolean; ml: boolean; } | roles Common Elasticsearch roles that can be assigned to this node. Can be helpful when writing custom nodeFilter or nodeSelector functions. |
| `ssl` | [TlsConnectionOptions](./TlsConnectionOptions.md) | ssl Overrides default TLS connection settings |
| `url` | URL | url Elasticsearch node's location |
