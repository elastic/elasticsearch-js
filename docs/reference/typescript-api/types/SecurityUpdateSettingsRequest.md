# SecurityUpdateSettingsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `security?` | [`SecuritySecuritySettings`](SecuritySecuritySettings.md) | Settings for the index used for most security configuration, including native realm users and roles configured with the API. |
| `'security-profile'?` | [`SecuritySecuritySettings`](SecuritySecuritySettings.md) | Settings for the index used to store profile information. |
| `'security-tokens'?` | [`SecuritySecuritySettings`](SecuritySecuritySettings.md) | Settings for the index used to store tokens. |
| `body?` | `string | { [key: string]: any } & { master_timeout?: never, timeout?: never, security?: never, 'security-profile'?: never, 'security-tokens'?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { master_timeout?: never, timeout?: never, security?: never, 'security-profile'?: never, 'security-tokens'?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
