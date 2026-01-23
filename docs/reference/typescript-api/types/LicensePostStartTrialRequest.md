# LicensePostStartTrialRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `acknowledge?` | `boolean` | Whether the user has acknowledged acknowledge messages |
| `type?` | `string` | The type of trial license to generate |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { acknowledge?: never, type?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { acknowledge?: never, type?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
