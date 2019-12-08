# insert imports
1i\
/* tslint:disable */
2i\
import { Observable } from "rxjs";
2i\
import { Metadata } from "grpc";

# remove service functions with callback (variation 1)
s/extends $protobuf.rpc.Service //g
/.*(request: [^,]\+, callback: [^)]\+).*/d
# remove callback definitions (variation 1)
/^[[:blank:]]*type [[:alpha:]]*Callback = .*/d

# modify service functions return type from Promise to Observable (variation 2) 
s/Promise/Observable/g
# add param Metadata to variation 2 methods 
s/\((request: [^,)]\+\))/\1, metadata?: Metadata)/
