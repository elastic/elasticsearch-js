# SecurityDelegatePkiRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `x509_certificate_chain` | `string[]` | The X509Certificate chain, which is represented as an ordered string array.
Each string in the array is a base64-encoded (Section 4 of RFC4648 - not base64url-encoded) of the certificate's DER encoding.

The first element is the target certificate that contains the subject distinguished name that is requesting access.
This may be followed by additional certificates; each subsequent certificate is used to certify the previous one. |
| `body?` | `string | { [key: string]: any } & { x509_certificate_chain?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { x509_certificate_chain?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
