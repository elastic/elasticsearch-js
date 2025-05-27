## Interface `SecurityCreateCrossClusterApiKeyResponse`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | Generated API key. |
| `encoded` | string | API key credentials which is the base64-encoding of the UTF-8 representation of `id` and `api_key` joined by a colon ( `:`). |
| `expiration` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Expiration in milliseconds for the API key. |
| `id` | [Id](./Id.md) | Unique ID for this API key. |
| `name` | [Name](./Name.md) | Specifies the name for this API key. |
