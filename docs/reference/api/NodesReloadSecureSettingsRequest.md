# `NodesReloadSecureSettingsRequest` [interface-NodesReloadSecureSettingsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; timeout?: never; secure_settings_password?: never; }) | All values in `body` will be added to the request body. |
| `node_id` | [NodeIds](./NodeIds.md) | The names of particular nodes in the cluster to target. |
| `querystring` | { [key: string]: any; } & { node_id?: never; timeout?: never; secure_settings_password?: never; } | All values in `querystring` will be added to the request querystring. |
| `secure_settings_password` | [Password](./Password.md) | The password for the Elasticsearch keystore. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
