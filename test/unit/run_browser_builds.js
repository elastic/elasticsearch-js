/* jshint browser:true */

// hard requires so that browserify can grab them
require('./test_abstract_logger');
require('./test_client');
require('./test_client_action');
require('./test_connection_abstract');
require('./test_connection_pool');
require('./test_console_logger');
require('./test_errors');
// require('./test_file_logger');
require('./test_host');
// require('./test_http_connector');
require('./test_json_serializer');
require('./test_log');
require('./test_nodes_to_host_callback');
require('./test_random_selector');
require('./test_round_robin_selector');
// require('./test_stdio_logger');
// require('./test_stream_logger');
// require('./test_tracer_logger');
require('./test_transport');
// require('./test_transport_with_server');
require('./test_utils');


// browser build tests
require('./browser_test_generic_build');
require('./browser_test_angular_build');
require('./browser_test_jquery_build');