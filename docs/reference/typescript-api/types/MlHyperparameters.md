# MlHyperparameters

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alpha?` | [`double`](double.md) | Advanced configuration option.
Machine learning uses loss guided tree growing, which means that the decision trees grow where the regularized loss decreases most quickly.
This parameter affects loss calculations by acting as a multiplier of the tree depth.
Higher alpha values result in shallower trees and faster training times.
By default, this value is calculated during hyperparameter optimization.
It must be greater than or equal to zero. |
| `lambda?` | [`double`](double.md) | Advanced configuration option.
Regularization parameter to prevent overfitting on the training data set.
Multiplies an L2 regularization term which applies to leaf weights of the individual trees in the forest.
A high lambda value causes training to favor small leaf weights.
This behavior makes the prediction function smoother at the expense of potentially not being able to capture relevant relationships between the features and the dependent variable.
A small lambda value results in large individual trees and slower training.
By default, this value is calculated during hyperparameter optimization.
It must be a nonnegative value. |
| `gamma?` | [`double`](double.md) | Advanced configuration option.
Regularization parameter to prevent overfitting on the training data set.
Multiplies a linear penalty associated with the size of individual trees in the forest.
A high gamma value causes training to prefer small trees.
A small gamma value results in larger individual trees and slower training.
By default, this value is calculated during hyperparameter optimization.
It must be a nonnegative value. |
| `eta?` | [`double`](double.md) | Advanced configuration option.
The shrinkage applied to the weights.
Smaller values result in larger forests which have a better generalization error.
However, larger forests cause slower training.
By default, this value is calculated during hyperparameter optimization.
It must be a value between `0.001` and `1`. |
| `eta_growth_rate_per_tree?` | [`double`](double.md) | Advanced configuration option.
Specifies the rate at which `eta` increases for each new tree that is added to the forest.
For example, a rate of 1.05 increases `eta` by 5% for each extra tree.
By default, this value is calculated during hyperparameter optimization.
It must be between `0.5` and `2`. |
| `feature_bag_fraction?` | [`double`](double.md) | Advanced configuration option.
Defines the fraction of features that will be used when selecting a random bag for each candidate split.
By default, this value is calculated during hyperparameter optimization. |
| `downsample_factor?` | [`double`](double.md) | Advanced configuration option.
Controls the fraction of data that is used to compute the derivatives of the loss function for tree training.
A small value results in the use of a small fraction of the data.
If this value is set to be less than 1, accuracy typically improves.
However, too small a value may result in poor convergence for the ensemble and so require more trees.
By default, this value is calculated during hyperparameter optimization.
It must be greater than zero and less than or equal to 1. |
| `max_attempts_to_add_tree?` | [`integer`](integer.md) | If the algorithm fails to determine a non-trivial tree (more than a single leaf), this parameter determines how many of such consecutive failures are tolerated.
Once the number of attempts exceeds the threshold, the forest training stops. |
| `max_optimization_rounds_per_hyperparameter?` | [`integer`](integer.md) | Advanced configuration option.
A multiplier responsible for determining the maximum number of hyperparameter optimization steps in the Bayesian optimization procedure.
The maximum number of steps is determined based on the number of undefined hyperparameters times the maximum optimization rounds per hyperparameter.
By default, this value is calculated during hyperparameter optimization. |
| `max_trees?` | [`integer`](integer.md) | Advanced configuration option.
Defines the maximum number of decision trees in the forest.
The maximum value is 2000.
By default, this value is calculated during hyperparameter optimization. |
| `num_folds?` | [`integer`](integer.md) | The maximum number of folds for the cross-validation procedure. |
| `num_splits_per_feature?` | [`integer`](integer.md) | Determines the maximum number of splits for every feature that can occur in a decision tree when the tree is trained. |
| `soft_tree_depth_limit?` | [`integer`](integer.md) | Advanced configuration option.
Machine learning uses loss guided tree growing, which means that the decision trees grow where the regularized loss decreases most quickly.
This soft limit combines with the `soft_tree_depth_tolerance` to penalize trees that exceed the specified depth; the regularized loss increases quickly beyond this depth.
By default, this value is calculated during hyperparameter optimization.
It must be greater than or equal to 0. |
| `soft_tree_depth_tolerance?` | [`double`](double.md) | Advanced configuration option.
This option controls how quickly the regularized loss increases when the tree depth exceeds `soft_tree_depth_limit`.
By default, this value is calculated during hyperparameter optimization.
It must be greater than or equal to 0.01. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
