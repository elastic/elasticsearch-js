## Interface `ConnectorUpdateFilteringValidationRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; validation?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `querystring` | { [key: string]: any; } & { connector_id?: never; validation?: never; } | All values in `querystring` will be added to the request querystring. |
| `validation` | [ConnectorFilteringRulesValidation](./ConnectorFilteringRulesValidation.md) | &nbsp; |
