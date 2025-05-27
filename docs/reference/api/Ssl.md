## `Ssl`

### Constructor

:::
new Ssl(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `certificates` | `certificates(this: [That](./That.md), params?: [SslCertificatesRequest](./SslCertificatesRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SslCertificatesResponse](./SslCertificatesResponse.md)>;` | Get SSL certificates. Get information about the X.509 certificates that are used to encrypt communications in the cluster. The API returns a list that includes certificates from all TLS contexts including: - Settings for transport and HTTP interfaces - TLS settings that are used within authentication realms - TLS settings for remote monitoring exporters The list includes certificates that are used for configuring trust, such as those configured in the `xpack.security.transport.ssl.truststore` and `xpack.security.transport.ssl.certificate_authorities` settings. It also includes certificates that are used for configuring server identity, such as `xpack.security.http.ssl.keystore` and `xpack.security.http.ssl.certificate settings`. The list does not include certificates that are sourced from the default SSL context of the Java Runtime Environment (JRE), even if those certificates are in use within Elasticsearch. NOTE: When a PKCS#11 token is configured as the truststore of the JRE, the API returns all the certificates that are included in the PKCS#11 token irrespective of whether these are used in the Elasticsearch TLS configuration. If Elasticsearch is configured to use a keystore or truststore, the API output includes all certificates in that store, even though some of the certificates might not be in active use within the cluster. |
| `certificates` | `certificates(this: [That](./That.md), params?: [SslCertificatesRequest](./SslCertificatesRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SslCertificatesResponse](./SslCertificatesResponse.md), unknown>>;` | &nbsp; |
| `certificates` | `certificates(this: [That](./That.md), params?: [SslCertificatesRequest](./SslCertificatesRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SslCertificatesResponse](./SslCertificatesResponse.md)>;` | &nbsp; |
