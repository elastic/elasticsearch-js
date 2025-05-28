# `SecurityEnableUserProfileRequest` [interface-SecurityEnableUserProfileRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { uid?: never; refresh?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { uid?: never; refresh?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If 'true', Elasticsearch refreshes the affected shards to make this operation visible to search. If 'wait_for', it waits for a refresh to make this operation visible to search. If 'false', nothing is done with refreshes. |
| `uid` | [SecurityUserProfileId](./SecurityUserProfileId.md) | A unique identifier for the user profile. |
