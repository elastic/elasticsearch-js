# SecurityEnableUserProfileRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `uid` | [`SecurityUserProfileId`](SecurityUserProfileId.md) | A unique identifier for the user profile. |
| `refresh?` | [`Refresh`](Refresh.md) | If 'true', Elasticsearch refreshes the affected shards to make this operation
visible to search.
If 'wait_for', it waits for a refresh to make this operation visible to search.
If 'false', nothing is done with refreshes. |
| `body?` | `string | { [key: string]: any } & { uid?: never, refresh?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { uid?: never, refresh?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
