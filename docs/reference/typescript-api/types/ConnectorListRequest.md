# ConnectorListRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `from?` | `integer` | Starting offset |
| `size?` | `integer` | Specifies a max number of results to get |
| `index_name?` | [`Indices`](Indices.md) | A comma-separated list of connector index names to fetch connector documents for |
| `connector_name?` | [`Names`](Names.md) | A comma-separated list of connector names to fetch connector documents for |
| `service_type?` | [`Names`](Names.md) | A comma-separated list of connector service types to fetch connector documents for |
| `include_deleted?` | `boolean` | A flag to indicate if the desired connector should be fetched, even if it was soft-deleted. |
| `query?` | `string` | A wildcard query string that filters connectors with matching name, description or index name |
| `body?` | `string | { [key: string]: any } & { from?: never, size?: never, index_name?: never, connector_name?: never, service_type?: never, include_deleted?: never, query?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { from?: never, size?: never, index_name?: never, connector_name?: never, service_type?: never, include_deleted?: never, query?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
