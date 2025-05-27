## Interface `SearchApplicationPostBehavioralAnalyticsEventRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { collection_name?: never; event_type?: never; debug?: never; payload?: never; }) | All values in `body` will be added to the request body. |
| `collection_name` | [Name](./Name.md) | The name of the behavioral analytics collection. |
| `debug` | boolean | Whether the response type has to include more details |
| `event_type` | [SearchApplicationEventType](./SearchApplicationEventType.md) | The analytics event type. |
| `payload` | any | &nbsp; |
| `querystring` | { [key: string]: any; } & { collection_name?: never; event_type?: never; debug?: never; payload?: never; } | All values in `querystring` will be added to the request querystring. |
