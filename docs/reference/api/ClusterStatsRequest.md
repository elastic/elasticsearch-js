# `ClusterStatsRequest` [interface-ClusterStatsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; include_remotes?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `include_remotes` | boolean | Include remote cluster data into the response |
| `node_id` | [NodeIds](./NodeIds.md) | Comma-separated list of node filters used to limit returned information. Defaults to all nodes in the cluster. |
| `querystring` | { [key: string]: any; } & { node_id?: never; include_remotes?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for each node to respond. If a node does not respond before its timeout expires, the response does not include its stats. However, timed out nodes are included in the response’s `_nodes.failed` property. Defaults to no timeout. |
