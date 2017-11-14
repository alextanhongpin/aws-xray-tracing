## Environment Variables

You can use environment variables to configure the X-Ray SDK for Node.js. The SDK supports the following variables.

- `AWS_XRAY_TRACING_NAME` – Set a service name that the SDK uses for segments. Overrides the segment name that you set on the Express middleware.
- `AWS_XRAY_DAEMON_ADDRESS` – Set the host and port of the X-Ray daemon listener. By default, the SDK sends trace data to 127.0.0.1:2000. Use this variable if you have configured the daemon to listen on a different port or if it is running on a different host.
- `AWS_XRAY_CONTEXT_MISSING` – Set to LOG_ERROR to avoid throwing exceptions when your instrumented code attempts to record data when no segment is open.
Valid Values
- `RUNTIME_ERROR` – Throw a runtime exception (default).
- `LOG_ERROR` – Log an error and continue.
Errors related to missing segments or subsegments can occur when you attempt to use an instrumented client in startup code that runs when no request is open, or in code that spawns a new thread.
- `AWS_XRAY_DEBUG_MODE` – Set to TRUE to configure the SDK to output logs to the console, instead of configuring a logger.