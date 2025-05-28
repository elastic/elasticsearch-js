# `NodesIoStats` [interface-NodesIoStats]

| Name | Type | Description |
| - | - | - |
| `devices` | [NodesIoStatDevice](./NodesIoStatDevice.md)[] | Array of disk metrics for each device that is backing an Elasticsearch data path. These disk metrics are probed periodically and averages between the last probe and the current probe are computed. |
| `total` | [NodesIoStatDevice](./NodesIoStatDevice.md) | The sum of the disk metrics for all devices that back an Elasticsearch data path. |
