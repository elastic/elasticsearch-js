# `MonitoringBulkRequest` [interface-MonitoringBulkRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { type?: never; system_id?: never; system_api_version?: never; interval?: never; operations?: never; }) | All values in `body` will be added to the request body. |
| `interval` | [Duration](./Duration.md) | Collection interval (e.g., '10s' or '10000ms') of the payload |
| `operations` | ([BulkOperationContainer](./BulkOperationContainer.md) | [BulkUpdateAction](./BulkUpdateAction.md)<TDocument, TPartialDocument> | TDocument)[] | &nbsp; |
| `querystring` | { [key: string]: any; } & { type?: never; system_id?: never; system_api_version?: never; interval?: never; operations?: never; } | All values in `querystring` will be added to the request querystring. |
| `system_api_version` | string | &nbsp; |
| `system_id` | string | Identifier of the monitored system |
| `type` | string | Default document type for items which don't provide one |
