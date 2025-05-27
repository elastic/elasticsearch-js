## Interface `SecurityHasPrivilegesUserProfileResponse`

| Name | Type | Description |
| - | - | - |
| `errors` | [SecurityHasPrivilegesUserProfileHasPrivilegesUserProfileErrors](./SecurityHasPrivilegesUserProfileHasPrivilegesUserProfileErrors.md) | The subset of the requested profile IDs for which an error was encountered. It does not include the missing profile IDs or the profile IDs of the users that do not have all the requested privileges. This field is absent if empty. |
| `has_privilege_uids` | [SecurityUserProfileId](./SecurityUserProfileId.md)[] | The subset of the requested profile IDs of the users that have all the requested privileges. |
