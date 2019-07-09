import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface ITodoTask {
    id: string;
    title: string;
    description: string;
    statusId: string;
}

interface ITodoStatus {
    id: string;
    name: string;
    tasks: ITodoTask[];
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

    public statuses: ITodoStatus[] = [
        {
            id: 'todo',
            name: 'To Do',
            tasks: [
                {
                    id: 'sdfdfdf1',
                    title: 'Task 1',
                    description: '',
                    statusId: 'todo',
                },
                {
                    id: 'sdfdfdf2',
                    title: 'Task 2',
                    description: '',
                    statusId: 'todo',
                },
                {
                    id: 'sdfdfdf3',
                    title: 'Task 3',
                    description: '',
                    statusId: 'todo',
                },
            ],
        },
        {
            id: 'open',
            name: 'Open',
            tasks: [],
        },
        {
            id: 'progress',
            name: 'In Progress',
            tasks: [],
        },
        {
            id: 'resolved',
            name: 'Resolved',
            tasks: [],
        },
        {
            id: 'close',
            name: 'Close',
            tasks: [],
        },
    ];
    public statusIds: string[] = this.statuses.map(s => s.id);

    constructor() {
    }

    ngOnInit() {
    }

    public drop(event: CdkDragDrop<ITodoTask[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            event.container.data[event.currentIndex].statusId = event.container.id;
        }
    }

}
