## Interface `TransformSettings`

| Name | Type | Description |
| - | - | - |
| `align_checkpoints` | boolean | Specifies whether the transform checkpoint ranges should be optimized for performance. Such optimization can align checkpoint ranges with the date histogram interval when date histogram is specified as a group source in the transform config. As a result, less document updates in the destination index will be performed thus improving overall performance. |
| `dates_as_epoch_millis` | boolean | Defines if dates in the ouput should be written as ISO formatted string or as millis since epoch. epoch_millis was the default for transforms created before version 7.11. For compatible output set this value to `true`. |
| `deduce_mappings` | boolean | Specifies whether the transform should deduce the destination index mappings from the transform configuration. |
| `docs_per_second` | [float](./float.md) | Specifies a limit on the number of input documents per second. This setting throttles the transform by adding a wait time between search requests. The default value is null, which disables throttling. |
| `max_page_search_size` | [integer](./integer.md) | Defines the initial page size to use for the composite aggregation for each checkpoint. If circuit breaker exceptions occur, the page size is dynamically adjusted to a lower value. The minimum value is `10` and the maximum is `65,536`. |
| `unattended` | boolean | If `true`, the transform runs in unattended mode. In unattended mode, the transform retries indefinitely in case of an error which means the transform never fails. Setting the number of retries other than infinite fails in validation. |
