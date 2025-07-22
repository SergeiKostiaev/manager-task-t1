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
    static async searchTasksByTitle(title: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}?title=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to search tasks');
        }
        return response.json();
    }

    static async filterTasksByDate(date: Date): Promise<Task[]> {
        const dateStr = date.toISOString().split('T')[0];
        const response = await fetch(`${API_URL}?date=${dateStr}`);
        if (!response.ok) {
            throw new Error('Failed to filter tasks by date');
        }
        return response.json();
    }

    static async filterTasksByCategory(category: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}?category=${category}`);
        if (!response.ok) {
            throw new Error('Failed to filter tasks by category');
        }
        return response.json();
    }

    static async filterTasksByStatus(status: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}?status=${status}`);
        if (!response.ok) {
            throw new Error('Failed to filter tasks by status');
        }
        return response.json();
    }

    static async filterTasksByPriority(priority: string): Promise<Task[]> {
        const response = await fetch(`${API_URL}?priority=${priority}`);
        if (!response.ok) {
            throw new Error('Failed to filter tasks by priority');
        }
        return response.json();
    }
}