# MlHyperparameter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `absolute_importance?` | `double` | A positive number showing how much the parameter influences the variation of the loss function. For hyperparameters with values that are not specified by the user but tuned during hyperparameter optimization. |
| `name` | [`Name`](Name.md) | Name of the hyperparameter. |
| `relative_importance?` | `double` | A number between 0 and 1 showing the proportion of influence on the variation of the loss function among all tuned hyperparameters. For hyperparameters with values that are not specified by the user but tuned during hyperparameter optimization. |
| `supplied` | `boolean` | Indicates if the hyperparameter is specified by the user (true) or optimized (false). |
| `value` | `double` | The value of the hyperparameter, either optimized or specified by the user. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
