# streaming
Preact Redux recipe for Maze framework with support for model update streaming


A React/Redux SPA with the same features as preact_redux with the addition of streaming changes to database entries.  As database entries for a model are added/deleted and modified, a copy of the change
is sent to all connected cients that are viewing the index list of the model.
The amber backend serves both html and json.  Also includes a JWT authorisation
pipe in src/pipes.  Create a new amber app with this template with these commands;

```
amber new mynewapp -r react/preact_streaming
cd mynewapp
amber g auth User
```
Notes:  yarn or npm install issue warnings about unmet dependencies for react.  this
is normal as react is provided by preact via the preact-compat shim.  Remove the
Authenticate pipe from config/routes.cr after generating the auth plugin.  Remove the
AuthenticateJWT pipe from config/routes.cr if authentication is not required.
