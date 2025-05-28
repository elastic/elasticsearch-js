# `XpackInfoRequest` [interface-XpackInfoRequest]

| Name | Type | Description |
| - | - | - |
| `accept_enterprise` | boolean | If this param is used it must be set to true |
| `body` | string | ({ [key: string]: any; } & { categories?: never; accept_enterprise?: never; human?: never; }) | All values in `body` will be added to the request body. |
| `categories` | [XpackInfoXPackCategory](./XpackInfoXPackCategory.md)[] | A comma-separated list of the information categories to include in the response. For example, `build,license,features`. |
| `human` | boolean | Defines whether additional human-readable information is included in the response. In particular, it adds descriptions and a tag line. |
| `querystring` | { [key: string]: any; } & { categories?: never; accept_enterprise?: never; human?: never; } | All values in `querystring` will be added to the request querystring. |
