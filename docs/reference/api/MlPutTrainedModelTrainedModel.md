# `MlPutTrainedModelTrainedModel` [interface-MlPutTrainedModelTrainedModel]

| Name | Type | Description |
| - | - | - |
| `ensemble` | [MlPutTrainedModelEnsemble](./MlPutTrainedModelEnsemble.md) | The definition for an ensemble model |
| `tree_node` | [MlPutTrainedModelTrainedModelTreeNode](./MlPutTrainedModelTrainedModelTreeNode.md) | The definition of a node in a tree. There are two major types of nodes: leaf nodes and not-leaf nodes. - Leaf nodes only need node_index and leaf_value defined. - All other nodes need split_feature, left_child, right_child, threshold, decision_type, and default_left defined. |
| `tree` | [MlPutTrainedModelTrainedModelTree](./MlPutTrainedModelTrainedModelTree.md) | The definition for a binary decision tree. |
