# `ConnectorUpdateFilteringRequest` [interface-ConnectorUpdateFilteringRequest]

| Name | Type | Description |
| - | - | - |
| `advanced_snippet` | [ConnectorFilteringAdvancedSnippet](./ConnectorFilteringAdvancedSnippet.md) | &nbsp; |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; filtering?: never; rules?: never; advanced_snippet?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `filtering` | [ConnectorFilteringConfig](./ConnectorFilteringConfig.md)[] | &nbsp; |
| `querystring` | { [key: string]: any; } & { connector_id?: never; filtering?: never; rules?: never; advanced_snippet?: never; } | All values in `querystring` will be added to the request querystring. |
| `rules` | [ConnectorFilteringRule](./ConnectorFilteringRule.md)[] | &nbsp; |
