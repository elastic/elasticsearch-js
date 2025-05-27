## Interface `AggregationsIpPrefixAggregation`

| Name | Type | Description |
| - | - | - |
| `append_prefix_length` | boolean | Defines whether the prefix length is appended to IP address keys in the response. |
| `field` | [Field](./Field.md) | The IP address field to aggregation on. The field mapping type must be `ip`. |
| `is_ipv6` | boolean | Defines whether the prefix applies to IPv6 addresses. |
| `keyed` | boolean | Defines whether buckets are returned as a hash rather than an array in the response. |
| `min_doc_count` | [long](./long.md) | Minimum number of documents in a bucket for it to be included in the response. |
| `prefix_length` | [integer](./integer.md) | Length of the network prefix. For IPv4 addresses the accepted range is [0, 32]. For IPv6 addresses the accepted range is [0, 128]. |
