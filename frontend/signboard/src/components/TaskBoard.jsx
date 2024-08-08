import  { useState, useEffect } from 'react';
import './TaskBoard.css';

const TaskBoard = () => {
    const [columns, setColumns] = useState(() => {
        // 从 localStorage 获取初始数据
        const savedColumns = localStorage.getItem('taskboard-columns');
        return savedColumns ? JSON.parse(savedColumns) : [];
    });
    const [newColumnTitle, setNewColumnTitle] = useState('');

    useEffect(() => {
        // 当 columns 变化时，更新 localStorage
        localStorage.setItem('taskboard-columns', JSON.stringify(columns));
    }, [columns]);

    const addColumn = () => {
        if (newColumnTitle.trim() !== '') {
            setColumns([...columns, { title: newColumnTitle, tasks: [] }]);
            setNewColumnTitle('');
        }
    };

    const addTask = (columnIndex) => {
        const task = prompt('Enter task title:');
        if (task) {
            const updatedColumns = [...columns];
            updatedColumns[columnIndex].tasks.push(task);
            setColumns(updatedColumns);
        }
    };

    const deleteColumn = (columnIndex) => {
        const updatedColumns = columns.filter((_, index) => index !== columnIndex);
        setColumns(updatedColumns);
    };

    return (
        <div className="taskboard-container">
            <nav className="navbar">
                <h2>Task Board</h2>
                <div className="nav-options">
                    <button>All Projects</button>
                    <button>Important Projects</button>
                </div>
            </nav>

            <div className="taskboard-content">
                <div className="add-column">
                    <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        placeholder="Work State"
                    />
                    <button onClick={addColumn}>Add State</button>
                </div>

                <div className="columns">
                    {columns.map((column, index) => (
                        <div key={index} className="column">
                            <div className="column-header">
                                <h2>{column.title}</h2>
                                <div className="column-menu">
                                    <button onClick={() => deleteColumn(index)}>⋮</button>
                                </div>
                            </div>
                            <button onClick={() => addTask(index)}>Add Task</button>
                            <div className="tasks">
                                {column.tasks.map((task, taskIndex) => (
                                    <div key={taskIndex} className="task">
                                        {task}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
