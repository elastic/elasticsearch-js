# `ClusterAllocationExplainRequest` [interface-ClusterAllocationExplainRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { include_disk_info?: never; include_yes_decisions?: never; master_timeout?: never; current_node?: never; index?: never; primary?: never; shard?: never; }) | All values in `body` will be added to the request body. |
| `current_node` | string | Specifies the node ID or the name of the node to only explain a shard that is currently located on the specified node. |
| `include_disk_info` | boolean | If true, returns information about disk usage and shard sizes. |
| `include_yes_decisions` | boolean | If true, returns YES decisions in explanation. |
| `index` | [IndexName](./IndexName.md) | Specifies the name of the index that you would like an explanation for. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `primary` | boolean | If true, returns explanation for the primary shard for the given shard ID. |
| `querystring` | { [key: string]: any; } & { include_disk_info?: never; include_yes_decisions?: never; master_timeout?: never; current_node?: never; index?: never; primary?: never; shard?: never; } | All values in `querystring` will be added to the request querystring. |
| `shard` | [integer](./integer.md) | Specifies the ID of the shard that you would like an explanation for. |
