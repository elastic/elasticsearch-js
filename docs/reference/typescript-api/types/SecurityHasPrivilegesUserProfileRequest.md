# SecurityHasPrivilegesUserProfileRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `uids` | [`SecurityUserProfileId`](SecurityUserProfileId.md)[] | A list of profile IDs. The privileges are checked for associated users of the profiles. |
| `privileges` | [`SecurityHasPrivilegesUserProfilePrivilegesCheck`](SecurityHasPrivilegesUserProfilePrivilegesCheck.md) | An object containing all the privileges to be checked. |
| `body?` | `string | { [key: string]: any } & { uids?: never, privileges?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { uids?: never, privileges?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
