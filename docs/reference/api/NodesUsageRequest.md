# `NodesUsageRequest` [interface-NodesUsageRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; metric?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `metric` | [Metrics](./Metrics.md) | Limits the information returned to the specific metrics. A comma-separated list of the following options: `_all`, `rest_actions`. |
| `node_id` | [NodeIds](./NodeIds.md) | A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes |
| `querystring` | { [key: string]: any; } & { node_id?: never; metric?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
