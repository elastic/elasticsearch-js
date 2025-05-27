## Interface `MlDatafeedRunningState`

| Name | Type | Description |
| - | - | - |
| `real_time_configured` | boolean | Indicates if the datafeed is "real-time"; meaning that the datafeed has no configured `end` time. |
| `real_time_running` | boolean | Indicates whether the datafeed has finished running on the available past data. For datafeeds without a configured `end` time, this means that the datafeed is now running on "real-time" data. |
| `search_interval` | [MlRunningStateSearchInterval](./MlRunningStateSearchInterval.md) | Provides the latest time interval the datafeed has searched. |
