# `SecurityEnrollNodeResponse` [interface-SecurityEnrollNodeResponse]

| Name | Type | Description |
| - | - | - |
| `http_ca_cert` | string | The CA certificate that can be used by the new node in order to sign its certificate for the HTTP layer, as a Base64 encoded string of the ASN.1 DER encoding of the certificate. |
| `http_ca_key` | string | The CA private key that can be used by the new node in order to sign its certificate for the HTTP layer, as a Base64 encoded string of the ASN.1 DER encoding of the key. |
| `nodes_addresses` | string[] | A list of transport addresses in the form of `host:port` for the nodes that are already members of the cluster. |
| `transport_ca_cert` | string | The CA certificate that is used to sign the TLS certificate for the transport layer, as a Base64 encoded string of the ASN.1 DER encoding of the certificate. |
| `transport_cert` | string | The certificate that the node can use for TLS for its transport layer, as a Base64 encoded string of the ASN.1 DER encoding of the certificate. |
| `transport_key` | string | The private key that the node can use for TLS for its transport layer, as a Base64 encoded string of the ASN.1 DER encoding of the key. |
