# `ClusterDeleteVotingConfigExclusionsRequest` [interface-ClusterDeleteVotingConfigExclusionsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { master_timeout?: never; wait_for_removal?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `querystring` | { [key: string]: any; } & { master_timeout?: never; wait_for_removal?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_removal` | boolean | Specifies whether to wait for all excluded nodes to be removed from the cluster before clearing the voting configuration exclusions list. Defaults to true, meaning that all excluded nodes must be removed from the cluster before this API takes any action. If set to false then the voting configuration exclusions list is cleared even if some excluded nodes are still in the cluster. |
