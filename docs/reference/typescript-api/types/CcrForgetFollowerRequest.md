# CcrForgetFollowerRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | Name of the leader index for which specified follower retention leases should be removed |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `follower_cluster?` | `string` | - |
| `follower_index?` | [`IndexName`](IndexName.md) | - |
| `follower_index_uuid?` | [`Uuid`](Uuid.md) | - |
| `leader_remote_cluster?` | `string` | - |
| `body?` | `string | { [key: string]: any } & { index?: never, timeout?: never, follower_cluster?: never, follower_index?: never, follower_index_uuid?: never, leader_remote_cluster?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, timeout?: never, follower_cluster?: never, follower_index?: never, follower_index_uuid?: never, leader_remote_cluster?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
