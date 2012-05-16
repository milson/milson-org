If possible, `serial` connections should function the same way as `tcp`.

However, since some serial devices use extremely low bandwidth microcontrollers, a lesser protocol must be developed.

###Bare Minimum Example

Let's take a hypothetical example with an IR sensor (ir-sens100) developed by ACME, whose domain is acme.com.

The sensor should be able to identify itself by its domain, a unique identifier (such as a serial number) and the protocol being used.

    POST /org.milson.ir-sens100.af1018e HTTP/1.0\\r\\n
    Content-Length: 10\r\n
    \r\n
    0123456789

Since the server will know that it has a device connected on a serial port, some assumptions can be made on the server's part.

  * The connection is persistent
  * If not otherwise specified, a default binary protocol will be used (what should that be?)

###Discussion

  * What are the important attributes of this imaginary binary protocol?
  * Would it be simpler to define a constant size? 

###Resources

  * [Key Differences between HTTP/1.0 and HTTP/1.1](http://www8.org/w8-papers/5c-protocols/key/key.html)
  * [HTTP 1.0 Spec](w3.org/Protocols/HTTP/1.0/spec.html)
