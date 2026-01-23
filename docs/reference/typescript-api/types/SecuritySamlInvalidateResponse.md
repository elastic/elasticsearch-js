# SecuritySamlInvalidateResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `invalidated` | `integer` | The number of tokens that were invalidated as part of this logout. |
| `realm` | `string` | The realm name of the SAML realm in Elasticsearch that authenticated the user. |
| `redirect` | `string` | A SAML logout response as a parameter so that the user can be redirected back to the SAML IdP. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
