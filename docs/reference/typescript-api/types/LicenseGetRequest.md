# LicenseGetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `accept_enterprise?` | `boolean` | If `true`, this parameter returns enterprise for Enterprise license types. If `false`, this parameter returns platinum for both platinum and enterprise license types. This behavior is maintained for backwards compatibility.
This parameter is deprecated and will always be set to true in 8.x. |
| `local?` | `boolean` | Specifies whether to retrieve local information.
From 9.2 onwards the default value is `true`, which means the information is retrieved from the responding node.
In earlier versions the default is `false`, which means the information is retrieved from the elected master node. |
| `body?` | `string | { [key: string]: any } & { accept_enterprise?: never, local?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { accept_enterprise?: never, local?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
