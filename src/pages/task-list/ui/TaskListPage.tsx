import { useState, useEffect } from 'react';
import { Button, Modal, Spin, Alert, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { TaskList } from '@widgets/task-list/ui/TaskList';
import { TaskForm } from '@features/task-manager/ui/TaskForm';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import {
    selectFilteredTasks,
    selectTasksLoading,
    selectTasksError,
    selectCurrentFilters,
    fetchTasks,
    applyFilters,
    resetFilters as resetFiltersAction
} from '@entities/task/model/taskSlice';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { Search } = Input;
const { Option } = Select;

export function TaskListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectFilteredTasks);
    const loading = useAppSelector(selectTasksLoading);
    const error = useAppSelector(selectTasksError);
    const currentFilters = useAppSelector(selectCurrentFilters);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleSearch = (value: string) => {
        dispatch(applyFilters({ searchText: value }));
    };

    const handleFilterChange = (filterName: keyof typeof currentFilters, value: string | null) => {
        dispatch(applyFilters({ [filterName]: value }));
    };

    const handleDateChange = (date: Dayjs | null) => {
        dispatch(applyFilters({ date: date ? date.toISOString() : null }));
    };

    const resetAllFilters = () => {
        dispatch(resetFiltersAction());
    };

    if (loading && !tasks.length) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message={error} type="error" />;
    }

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1>Менеджер задач</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Новая задача
                </Button>
            </div>

            <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 24 }}>
                <Search
                    placeholder="Поиск по названию"
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    value={currentFilters.searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    onSearch={handleSearch}
                />

                <Space size="middle" wrap>
                    <DatePicker
                        placeholder="Фильтр по дате"
                        value={currentFilters.date ? dayjs(currentFilters.date) : null}
                        onChange={handleDateChange}
                    />

                    <Select
                        placeholder="Категория"
                        style={{ width: 150 }}
                        allowClear
                        value={currentFilters.category}
                        onChange={(value) => handleFilterChange('category', value)}
                    >
                        <Option value="Bug">Bug</Option>
                        <Option value="Feature">Feature</Option>
                        <Option value="Documentation">Documentation</Option>
                        <Option value="Refactor">Refactor</Option>
                        <Option value="Test">Test</Option>
                    </Select>

                    <Select
                        placeholder="Статус"
                        style={{ width: 150 }}
                        allowClear
                        value={currentFilters.status}
                        onChange={(value) => handleFilterChange('status', value)}
                    >
                        <Option value="To Do">To Do</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Done">Done</Option>
                    </Select>

                    <Select
                        placeholder="Приоритет"
                        style={{ width: 150 }}
                        allowClear
                        value={currentFilters.priority}
                        onChange={(value) => handleFilterChange('priority', value)}
                    >
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                    </Select>

                    <Button
                        icon={<FilterOutlined />}
                        onClick={resetAllFilters}
                    >
                        Сбросить
                    </Button>
                </Space>
            </Space>

            <TaskList tasks={tasks} />

            <Modal
                title="Создать задачу"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <TaskForm onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}