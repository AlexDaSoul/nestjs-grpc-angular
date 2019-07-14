import { TaskStatus } from './status.entity';
import { Task } from './task.entity';
declare const entities: (typeof TaskStatus | typeof Task)[];
export default entities;
