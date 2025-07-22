import type { Task } from '@entities/task/model/types';

const API_URL = 'http://localhost:3001/tasks';

export class TaskApi {
    static async getAllTasks(): Promise<Task[]> {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    }

    static async getTaskById(id: number): Promise<Task> {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch task');
        }
        return response.json();
    }

    static async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return response.json();
    }

    static async updateTask(id: number, taskData: Partial<Task>): Promise<Task> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return response.json();
    }

    static async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    }
}