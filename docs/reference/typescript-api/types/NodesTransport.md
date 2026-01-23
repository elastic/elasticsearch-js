# NodesTransport

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inbound_handling_time_histogram?` | `NodesTransportHistogram[]` | The distribution of the time spent handling each inbound message on a transport thread, represented as a histogram. |
| `outbound_handling_time_histogram?` | `NodesTransportHistogram[]` | The distribution of the time spent sending each outbound transport message on a transport thread, represented as a histogram. |
| `rx_count?` | `long` | Total number of RX (receive) packets received by the node during internal cluster communication. |
| `rx_size?` | `string` | Size of RX packets received by the node during internal cluster communication. |
| `rx_size_in_bytes?` | `long` | Size, in bytes, of RX packets received by the node during internal cluster communication. |
| `server_open?` | `integer` | Current number of inbound TCP connections used for internal communication between nodes. |
| `tx_count?` | `long` | Total number of TX (transmit) packets sent by the node during internal cluster communication. |
| `tx_size?` | `string` | Size of TX packets sent by the node during internal cluster communication. |
| `tx_size_in_bytes?` | `long` | Size, in bytes, of TX packets sent by the node during internal cluster communication. |
| `total_outbound_connections?` | `long` | The cumulative number of outbound transport connections that this node has opened since it started.
Each transport connection may comprise multiple TCP connections but is only counted once in this statistic.
Transport connections are typically long-lived so this statistic should remain constant in a stable cluster. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
