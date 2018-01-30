/*

TODO: in project usage

gateway.addProject(project);

events.setup(project);
permission.setup(project);
keyValue.setup(project);
queue.setup(project);
dynamicObject.setup(project);

Gateway.start({port: 80});
*/

export {default as Gateway} from './gateway'
export {default as Project} from './project'
export {default as Events} from './events'
export {default as Permission} from './permission'
export {default as KeyValue} from './key_value'
export {default as Queue} from './queue'
export {default as DynamicObject} from './dynamic_object'
