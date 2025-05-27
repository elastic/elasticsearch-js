## Interface `MlDatafeedStats`

| Name | Type | Description |
| - | - | - |
| `assignment_explanation` | string | For started datafeeds only, contains messages relating to the selection of a node. |
| `datafeed_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `node` | [MlDiscoveryNodeCompact](./MlDiscoveryNodeCompact.md) | For started datafeeds only, this information pertains to the node upon which the datafeed is started. |
| `running_state` | [MlDatafeedRunningState](./MlDatafeedRunningState.md) | An object containing the running state for this datafeed. It is only provided if the datafeed is started. |
| `state` | [MlDatafeedState](./MlDatafeedState.md) | The status of the datafeed, which can be one of the following values: `starting`, `started`, `stopping`, `stopped`. |
| `timing_stats` | [MlDatafeedTimingStats](./MlDatafeedTimingStats.md) | An object that provides statistical information about timing aspect of this datafeed. |
