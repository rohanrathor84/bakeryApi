const codes = {
  100: {
    message: "Continue",
    description:
      "Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request.",
  },
  101: {
    message: "Switching Protocols",
    description: "The server switches protocol.",
  },
  200: {
    message: "OK",
    description: "The request is OK.",
  },
  201: {
    message: "Created",
    description: "The request is complete, and a new resource is created .",
  },
  202: {
    message: "Accepted",
    description:
      "The request is accepted for processing, but the processing is not complete.",
  },
  203: {
    message: "Non-authoritative Information",
    description:
      "The information in the entity header is from a local or third-party copy, not from the original server.",
  },
  204: {
    message: "No Content",
    description:
      "A status code and a header are given in the response, but there is no entity-body in the reply.",
  },
  205: {
    message: "Reset Content",
    description:
      "The browser should clear the form used for this transaction for additional input.",
  },
  206: {
    message: "Partial Content",
    description:
      "The server is returning partial data of the size requested. Used in response to a request specifying a Range header. The server must specify the range included in the response with the Content-Range header.",
  },
  300: {
    message: "Multiple Choices",
    description:
      "A link list. The user can select a link and go to that location. Maximum five addresses.",
  },
  301: {
    message: "Moved Permanently",
    description: "The requested page has moved to a new url.",
  },
  302: {
    message: "Found",
    description: "The requested page has moved temporarily to a new url.",
  },
  303: {
    message: "See Other",
    description: "The requested page can be found under a different url.",
  },
  304: {
    message: "Not Modified",
    description:
      "This is the response code to an If-Modified-Since or If-None-Match header, where the URL has not been modified since the specified date.",
  },
  305: {
    message: "Use Proxy",
    description:
      "The requested URL must be accessed through the proxy mentioned in the Location header.",
  },
  306: {
    message: "Unused",
    description:
      "This code was used in a previous version. It is no longer used, but the code is reserved.",
  },
  307: {
    message: "Temporary Redirect",
    description: "The requested page has moved temporarily to a new url.",
  },
  400: {
    message: "Bad Request",
    description: "The server did not understand the request.",
  },
  401: {
    message: "Unauthorized",
    description: "The requested page needs a token to verify.",
  },
  402: {
    message: "Payment Required",
    description: "You can not use this code yet.",
  },
  403: {
    message: "Forbidden",
    description:
      "Access is forbidden to the requested page. Please provide correct token.",
  },
  404: {
    message: "Not Found",
    description: "The server can not find the requested page.",
  },
  405: {
    message: "Method Not Allowed",
    description: "The method specified in the request is not allowed.",
  },
  406: {
    message: "Not Acceptable",
    description:
      "The server can only generate a response that is not accepted by the client.",
  },
  407: {
    message: "Proxy Authentication Required",
    description:
      "You must authenticate with a proxy server before this request can be served.",
  },
  408: {
    message: "Request Timeout",
    description:
      "The request took longer than the server was prepared to wait.",
  },
  409: {
    message: "Conflict",
    description: "The request could not be completed because of a conflict.",
  },
  410: {
    message: "Gone",
    description: "The requested page is no longer available.",
  },
  411: {
    message: "Length Required",
    description:
      "The 'Content-Length' is not defined. The server will not accept the request without it.",
  },
  412: {
    message: "Precondition Failed",
    description:
      "The pre condition given in the request evaluated to false by the server.",
  },
  413: {
    message: "Request Entity Too Large",
    description:
      "The server will not accept the request, because the request entity is too large.",
  },
  414: {
    message: "Request-url Too Long",
    description:
      "The server will not accept the request, because the url is too long. Occurs when you convert a 'post' request to a 'get' request with a long query information.",
  },
  415: {
    message: "Unsupported Media Type",
    description:
      "The server will not accept the request, because the mediatype is not supported.",
  },
  416: {
    message: "Requested Range Not Satisfiable",
    description:
      "The requested byte range is not available and is out of bounds.",
  },
  417: {
    message: "Expectation Failed",
    description:
      "The expectation given in an Expect request-header field could not be met by this server.",
  },
  500: {
    message: "Internal Server Error",
    description:
      "The request was not completed. The server met an unexpected condition.",
  },
  501: {
    message: "Not Implemented",
    description:
      "The request was not completed. The server did not support the functionality required.",
  },
  502: {
    message: "Bad Gateway",
    description:
      "The request was not completed. The server received an invalid response from the upstream server.",
  },
  503: {
    message: "Service Unavailable",
    description:
      "The request was not completed. The server is temporarily overloading or down.",
  },
  504: {
    message: "Gateway Timeout",
    description: "The gateway has timed out.",
  },
  505: {
    message: "HTTP Version Not Supported",
    description: "The server does not support the 'http protocol' version.",
  },
};

module.exports = codes;
