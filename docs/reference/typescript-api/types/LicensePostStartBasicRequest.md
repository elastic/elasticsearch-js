# LicensePostStartBasicRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `acknowledge?` | `boolean` | Whether the user has acknowledged acknowledge messages |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { acknowledge?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { acknowledge?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
