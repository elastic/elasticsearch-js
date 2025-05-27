## Interface `ConnectorListRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { from?: never; size?: never; index_name?: never; connector_name?: never; service_type?: never; include_deleted?: never; query?: never; }) | All values in `body` will be added to the request body. |
| `connector_name` | [Names](./Names.md) | A comma-separated list of connector names to fetch connector documents for |
| `from` | [integer](./integer.md) | Starting offset (default: 0) |
| `include_deleted` | boolean | A flag to indicate if the desired connector should be fetched, even if it was soft-deleted. |
| `index_name` | [Indices](./Indices.md) | A comma-separated list of connector index names to fetch connector documents for |
| `query` | string | A wildcard query string that filters connectors with matching name, description or index name |
| `querystring` | { [key: string]: any; } & { from?: never; size?: never; index_name?: never; connector_name?: never; service_type?: never; include_deleted?: never; query?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_type` | [Names](./Names.md) | A comma-separated list of connector service types to fetch connector documents for |
| `size` | [integer](./integer.md) | Specifies a max number of results to get |
