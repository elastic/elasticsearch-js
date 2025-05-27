## Interface `SecurityEnrollKibanaResponse`

| Name | Type | Description |
| - | - | - |
| `http_ca` | string | The CA certificate used to sign the node certificates that Elasticsearch uses for TLS on the HTTP layer. The certificate is returned as a Base64 encoded string of the ASN.1 DER encoding of the certificate. |
| `token` | [SecurityEnrollKibanaToken](./SecurityEnrollKibanaToken.md) | &nbsp; |
