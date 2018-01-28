Functions
---------
- authenticate
- validate request
- update permission

API
---
var P = new Permission();
P.authenticate({user, password, token});
P.validate({requestData}); // returns true if can access, or error report why cannot access
P.update([{target, permission}]);