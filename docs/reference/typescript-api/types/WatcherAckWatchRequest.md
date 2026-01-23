# WatcherAckWatchRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `watch_id` | [`Name`](Name.md) | The watch identifier. |
| `action_id?` | [`Names`](Names.md) | A comma-separated list of the action identifiers to acknowledge.
If you omit this parameter, all of the actions of the watch are acknowledged. |
| `body?` | `string | { [key: string]: any } & { watch_id?: never, action_id?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { watch_id?: never, action_id?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
