# IngestCommunityIDProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `source_ip?` | [`Field`](Field.md) | Field containing the source IP address. |
| `source_port?` | [`Field`](Field.md) | Field containing the source port. |
| `destination_ip?` | [`Field`](Field.md) | Field containing the destination IP address. |
| `destination_port?` | [`Field`](Field.md) | Field containing the destination port. |
| `iana_number?` | [`Field`](Field.md) | Field containing the IANA number. |
| `icmp_type?` | [`Field`](Field.md) | Field containing the ICMP type. |
| `icmp_code?` | [`Field`](Field.md) | Field containing the ICMP code. |
| `transport?` | [`Field`](Field.md) | Field containing the transport protocol name or number. Used only when the
iana_number field is not present. The following protocol names are currently
supported: eigrp, gre, icmp, icmpv6, igmp, ipv6-icmp, ospf, pim, sctp, tcp, udp |
| `target_field?` | [`Field`](Field.md) | Output field for the community ID. |
| `seed?` | `integer` | Seed for the community ID hash. Must be between 0 and 65535 (inclusive). The
seed can prevent hash collisions between network domains, such as a staging
and production network that use the same addressing scheme. |
| `ignore_missing?` | `boolean` | If true and any required fields are missing, the processor quietly exits
without modifying the document. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
