## Interface `IngestGetGeoipDatabaseRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Ids](./Ids.md) | A comma-separated list of database configuration IDs to retrieve. Wildcard ( `*`) expressions are supported. To get all database configurations, omit this parameter or use `*`. |
| `querystring` | { [key: string]: any; } & { id?: never; } | All values in `querystring` will be added to the request querystring. |
