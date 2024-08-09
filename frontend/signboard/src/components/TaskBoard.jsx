import { useState, useEffect } from 'react';
import './TaskBoard.css';

const TaskBoard = () => {
    // 模拟的项目数据
    const [projects] = useState([
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
        { id: 3, name: 'Project 3' },
    ]);

    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [columns, setColumns] = useState(() => {
        const savedColumns = localStorage.getItem('taskboard-columns');
        return savedColumns ? JSON.parse(savedColumns) : [];
    });
    const [newColumnTitle, setNewColumnTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('taskboard-columns', JSON.stringify(columns));
    }, [columns]);

    const selectProject = (projectId) => {
        setSelectedProjectId(projectId);
        // 根据选中的项目加载对应的任务板内容
        // 你可以在此处根据 projectId 加载数据
    };

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

            <div className="main-content">
                <div className="new-section">
                    <h3>Projects</h3>
                    <ul className="project-list">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                className={selectedProjectId === project.id ? 'active' : ''}
                                onClick={() => selectProject(project.id)}
                            >
                                {project.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="taskboard-content">
                    {selectedProjectId ? (
                        <>
                            <div className="add-column">
                                <input
                                    type="text"
                                    value={newColumnTitle}
                                    onChange={(e) => setNewColumnTitle(e.target.value)}
                                    placeholder="Work State"
                                />
                                <button onClick={addColumn}>Add</button>
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
                        </>
                    ) : (
                        <p>Select a project to view the board.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
