## Interface `SecurityGetApiKeyRequest`

| Name | Type | Description |
| - | - | - |
| `active_only` | boolean | A boolean flag that can be used to query API keys that are currently active. An API key is considered active if it is neither invalidated, nor expired at query time. You can specify this together with other parameters such as `owner` or `name`. If `active_only` is false, the response will include both active and inactive (expired or invalidated) keys. |
| `body` | string | ({ [key: string]: any; } & { id?: never; name?: never; owner?: never; realm_name?: never; username?: never; with_limited_by?: never; active_only?: never; with_profile_uid?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | An API key id. This parameter cannot be used with any of `name`, `realm_name` or `username`. |
| `name` | [Name](./Name.md) | An API key name. This parameter cannot be used with any of `id`, `realm_name` or `username`. It supports prefix search with wildcard. |
| `owner` | boolean | A boolean flag that can be used to query API keys owned by the currently authenticated user. The `realm_name` or `username` parameters cannot be specified when this parameter is set to `true` as they are assumed to be the currently authenticated ones. |
| `querystring` | { [key: string]: any; } & { id?: never; name?: never; owner?: never; realm_name?: never; username?: never; with_limited_by?: never; active_only?: never; with_profile_uid?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm_name` | [Name](./Name.md) | The name of an authentication realm. This parameter cannot be used with either `id` or `name` or when `owner` flag is set to `true`. |
| `username` | [Username](./Username.md) | The username of a user. This parameter cannot be used with either `id` or `name` or when `owner` flag is set to `true`. |
| `with_limited_by` | boolean | Return the snapshot of the owner user's role descriptors associated with the API key. An API key's actual permission is the intersection of its assigned role descriptors and the owner user's role descriptors. |
| `with_profile_uid` | boolean | Determines whether to also retrieve the profile uid, for the API key owner principal, if it exists. |
