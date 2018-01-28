Functions
---------
- set value to key
- get value at the key
- delete value at key

API
---
var KV = new KeyValueStorage();
KV.set(key, value);
KV.get(key); // returns value
KV.delete(); // returns true if deleted