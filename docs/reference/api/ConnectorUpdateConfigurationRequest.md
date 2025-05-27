## Interface `ConnectorUpdateConfigurationRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; configuration?: never; values?: never; }) | All values in `body` will be added to the request body. |
| `configuration` | [ConnectorConnectorConfiguration](./ConnectorConnectorConfiguration.md) | &nbsp; |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `querystring` | { [key: string]: any; } & { connector_id?: never; configuration?: never; values?: never; } | All values in `querystring` will be added to the request querystring. |
| `values` | Record<string, any> | &nbsp; |
