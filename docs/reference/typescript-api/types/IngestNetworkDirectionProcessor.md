# IngestNetworkDirectionProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `source_ip?` | [`Field`](Field.md) | Field containing the source IP address. |
| `destination_ip?` | [`Field`](Field.md) | Field containing the destination IP address. |
| `target_field?` | [`Field`](Field.md) | Output field for the network direction. |
| `internal_networks?` | `string[]` | List of internal networks. Supports IPv4 and IPv6 addresses and ranges in
CIDR notation. Also supports the named ranges listed below. These may be
constructed with template snippets. Must specify only one of
internal_networks or internal_networks_field. |
| `internal_networks_field?` | [`Field`](Field.md) | A field on the given document to read the internal_networks configuration
from. |
| `ignore_missing?` | `boolean` | If true and any required fields are missing, the processor quietly exits
without modifying the document. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
