const gateway = require('./gateway');
const project = require('./project');
const events = require('./events');
const permission = require('./permission');
const keyValue = require('./key_value');
const queue = require('./queue');
const dynamicObject = require('./dynamic_object');


gateway.addProject(project);

events.setup(project);
permission.setup(project);
keyValue.setup(project);
queue.setup(project);
dynamicObject.setup(project);

gateway.start({port: 80});
