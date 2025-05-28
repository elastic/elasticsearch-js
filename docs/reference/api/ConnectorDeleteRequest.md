# `ConnectorDeleteRequest` [interface-ConnectorDeleteRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; delete_sync_jobs?: never; hard?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be deleted |
| `delete_sync_jobs` | boolean | A flag indicating if associated sync jobs should be also removed. Defaults to false. |
| `hard` | boolean | A flag indicating if the connector should be hard deleted. |
| `querystring` | { [key: string]: any; } & { connector_id?: never; delete_sync_jobs?: never; hard?: never; } | All values in `querystring` will be added to the request querystring. |
