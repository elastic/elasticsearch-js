# ReindexRemoteSource

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connect_timeout?` | [`Duration`](Duration.md) | The remote connection timeout. |
| `headers?` | `Record<string, string>` | An object containing the headers of the request. |
| `host` | [`Host`](Host.md) | The URL for the remote instance of Elasticsearch that you want to index from.
This information is required when you're indexing from remote. |
| `username?` | [`Username`](Username.md) | The username to use for authentication with the remote host (required when using basic auth). |
| `password?` | [`Password`](Password.md) | The password to use for authentication with the remote host (required when using basic auth). |
| `api_key?` | `string` | The API key to use for authentication with the remote host (as an alternative to basic auth when the remote cluster is in Elastic Cloud).
(It is not permitted to set this and also to set an `Authorization` header via `headers`.) |
| `socket_timeout?` | [`Duration`](Duration.md) | The remote socket read timeout. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
