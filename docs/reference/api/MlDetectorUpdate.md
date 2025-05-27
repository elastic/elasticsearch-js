## Interface `MlDetectorUpdate`

| Name | Type | Description |
| - | - | - |
| `custom_rules` | [MlDetectionRule](./MlDetectionRule.md)[] | An array of custom rule objects, which enable you to customize the way detectors operate. For example, a rule may dictate to the detector conditions under which results should be skipped. Kibana refers to custom rules as job rules. |
| `description` | string | A description of the detector. |
| `detector_index` | [integer](./integer.md) | A unique identifier for the detector. This identifier is based on the order of the detectors in the `analysis_config`, starting at zero. |
