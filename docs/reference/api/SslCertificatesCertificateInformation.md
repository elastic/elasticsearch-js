# `SslCertificatesCertificateInformation` [interface-SslCertificatesCertificateInformation]

| Name | Type | Description |
| - | - | - |
| `alias` | string | null | If the path refers to a container file (a jks keystore, or a PKCS#12 file), it is the alias of the certificate. Otherwise, it is null. |
| `expiry` | [DateTime](./DateTime.md) | The ISO formatted date of the certificate's expiry (not-after) date. |
| `format` | string | The format of the file. Valid values include `jks`, `PKCS12`, and `PEM`. |
| `has_private_key` | boolean | Indicates whether Elasticsearch has access to the private key for this certificate. |
| `issuer` | string | The Distinguished Name of the certificate's issuer. |
| `path` | string | The path to the certificate, as configured in the `elasticsearch.yml` file. |
| `serial_number` | string | The hexadecimal representation of the certificate's serial number. |
| `subject_dn` | string | The Distinguished Name of the certificate's subject. |
