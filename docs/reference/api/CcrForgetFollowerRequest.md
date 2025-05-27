## Interface `CcrForgetFollowerRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; timeout?: never; follower_cluster?: never; follower_index?: never; follower_index_uuid?: never; leader_remote_cluster?: never; }) | All values in `body` will be added to the request body. |
| `follower_cluster` | string | &nbsp; |
| `follower_index_uuid` | [Uuid](./Uuid.md) | &nbsp; |
| `follower_index` | [IndexName](./IndexName.md) | &nbsp; |
| `index` | [IndexName](./IndexName.md) | the name of the leader index for which specified follower retention leases should be removed |
| `leader_remote_cluster` | string | &nbsp; |
| `querystring` | { [key: string]: any; } & { index?: never; timeout?: never; follower_cluster?: never; follower_index?: never; follower_index_uuid?: never; leader_remote_cluster?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
