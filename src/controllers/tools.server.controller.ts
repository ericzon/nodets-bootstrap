
export class ToolsController {

	public static normalizePort(val: any) {
	  var port = parseInt(val, 10);
	  if (isNaN(port)) {
	    // named pipe
	    return val;
	  }
	  if (port >= 0) {
	    return port;
	  }
	  return false;
	}
}
