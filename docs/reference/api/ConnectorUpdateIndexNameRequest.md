# `ConnectorUpdateIndexNameRequest` [interface-ConnectorUpdateIndexNameRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; index_name?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `index_name` | [SpecUtilsWithNullValue](./SpecUtilsWithNullValue.md)<[IndexName](./IndexName.md)> | &nbsp; |
| `querystring` | { [key: string]: any; } & { connector_id?: never; index_name?: never; } | All values in `querystring` will be added to the request querystring. |
