## Interface `MlDetector`

| Name | Type | Description |
| - | - | - |
| `by_field_name` | [Field](./Field.md) | The field used to split the data. In particular, this property is used for analyzing the splits with respect to their own history. It is used for finding unusual values in the context of the split. |
| `custom_rules` | [MlDetectionRule](./MlDetectionRule.md)[] | Custom rules enable you to customize the way detectors operate. For example, a rule may dictate conditions under which results should be skipped. Kibana refers to custom rules as job rules. |
| `detector_description` | string | A description of the detector. |
| `detector_index` | [integer](./integer.md) | A unique identifier for the detector. This identifier is based on the order of the detectors in the `analysis_config`, starting at zero. If you specify a value for this property, it is ignored. |
| `exclude_frequent` | [MlExcludeFrequent](./MlExcludeFrequent.md) | If set, frequent entities are excluded from influencing the anomaly results. Entities can be considered frequent over time or frequent in a population. If you are working with both over and by fields, you can set `exclude_frequent` to `all` for both fields, or to `by` or `over` for those specific fields. |
| `field_name` | [Field](./Field.md) | The field that the detector uses in the function. If you use an event rate function such as count or rare, do not specify this field. The `field_name` cannot contain double quotes or backslashes. |
| `function` | string | The analysis function that is used. For example, `count`, `rare`, `mean`, `min`, `max`, or `sum`. |
| `over_field_name` | [Field](./Field.md) | The field used to split the data. In particular, this property is used for analyzing the splits with respect to the history of all splits. It is used for finding unusual values in the population of all splits. |
| `partition_field_name` | [Field](./Field.md) | The field used to segment the analysis. When you use this property, you have completely independent baselines for each value of this field. |
| `use_null` | boolean | Defines whether a new series is used as the null series when there is no value for the by or partition fields. |
