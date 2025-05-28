# `ConnectorPutRequest` [interface-ConnectorPutRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; description?: never; index_name?: never; is_native?: never; language?: never; name?: never; service_type?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be created or updated. ID is auto-generated if not provided. |
| `description` | string | &nbsp; |
| `index_name` | [IndexName](./IndexName.md) | &nbsp; |
| `is_native` | boolean | &nbsp; |
| `language` | string | &nbsp; |
| `name` | string | &nbsp; |
| `querystring` | { [key: string]: any; } & { connector_id?: never; description?: never; index_name?: never; is_native?: never; language?: never; name?: never; service_type?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_type` | string | &nbsp; |
