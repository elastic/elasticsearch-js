# LicensePostRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `acknowledge?` | `boolean` | Specifies whether you acknowledge the license changes. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `license?` | [`LicenseLicense`](LicenseLicense.md) | - |
| `licenses?` | `LicenseLicense[]` | A sequence of one or more JSON documents containing the license information. |
| `body?` | `string | { [key: string]: any } & { acknowledge?: never, master_timeout?: never, timeout?: never, license?: never, licenses?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { acknowledge?: never, master_timeout?: never, timeout?: never, license?: never, licenses?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
