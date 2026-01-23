# SearchApplicationPostBehavioralAnalyticsEventRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `collection_name` | [`Name`](Name.md) | The name of the behavioral analytics collection. |
| `event_type` | [`SearchApplicationEventType`](SearchApplicationEventType.md) | The analytics event type. |
| `debug?` | `boolean` | Whether the response type has to include more details |
| `payload?` | `any` | - |
| `body?` | `string | { [key: string]: any } & { collection_name?: never, event_type?: never, debug?: never, payload?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { collection_name?: never, event_type?: never, debug?: never, payload?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
