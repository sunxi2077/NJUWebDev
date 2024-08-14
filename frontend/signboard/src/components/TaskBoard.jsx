import { useState, useEffect } from 'react';
import './TaskBoard.css';
import { useNavigate } from 'react-router-dom';

const TaskBoard = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: 'Project 1', isImportant: false, columns: [] },
        { id: 2, name: 'Project 2', isImportant: false, columns: [] },
        { id: 3, name: 'Project 3', isImportant: false, columns: [] },
    ]);

    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [viewMode, setViewMode] = useState('all');
    const [newColumnTitle, setNewColumnTitle] = useState('');
    const [showActionPanel, setShowActionPanel] = useState(null);
    const [taskDetails, setTaskDetails] = useState({ visible: false, columnIndex: null, taskIndex: null });
    const [showProjectMenu, setShowProjectMenu] = useState(null);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProjectMenu !== null && !event.target.closest('.project-action-panel')) {
                setShowProjectMenu(null);
            }
            if (showActionPanel !== null && !event.target.closest('.action-panel')) {
                setShowActionPanel(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProjectMenu, showActionPanel]);

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');  // 跳转到主页面
        };
    const selectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const toggleImportant = (projectId) => {
        setProjects(projects.map(project =>
            project.id === projectId ? { ...project, isImportant: !project.isImportant } : project
        ));
    };

    const addColumn = () => {
        if (newColumnTitle.trim() !== '') {
            setProjects(projects.map(project =>
                project.id === selectedProjectId
                    ? { ...project, columns: [...project.columns, { title: newColumnTitle, tasks: [] }] }
                    : project
            ));
            setNewColumnTitle('');
        }
    };

    const addTask = (columnIndex) => {
        const taskName = prompt('Enter task title:');
        if (taskName) {
            setProjects(projects.map(project =>
                project.id === selectedProjectId
                    ? {
                        ...project,
                        columns: project.columns.map((column, index) =>
                            index === columnIndex
                                ? { ...column, tasks: [...column.tasks, { name: taskName, description: '', rating: '', attachments: [] }] }
                                : column
                        )
                    }
                    : project
            ));
        }
    };

    const handleAttachmentUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProjects(projects.map(project =>
                project.id === selectedProjectId
                    ? {
                        ...project,
                        columns: project.columns.map((column, cIndex) =>
                            cIndex === taskDetails.columnIndex
                                ? {
                                    ...column,
                                    tasks: column.tasks.map((task, tIndex) =>
                                        tIndex === taskDetails.taskIndex
                                            ? { ...task, attachments: [...task.attachments, url] }
                                            : task
                                    )
                                }
                                : column
                        )
                    }
                    : project
            ));
        }
    };

    const archiveColumn = (columnIndex, archiveTasks = false) => {
        setProjects(projects.map(project =>
            project.id === selectedProjectId
                ? {
                    ...project,
                    columns: project.columns.map((column, index) =>
                        index === columnIndex ? (archiveTasks ? { ...column, tasks: [] } : null) : column
                    ).filter(column => column !== null)
                }
                : project
        ));
        setShowActionPanel(null); // 完成操作后关闭 action-panel
    };

    
        


    const addNewProject = () => {
        const newProjectName = prompt('Enter new project name:');
        if (newProjectName) {
            const isImportant = viewMode === 'important';
            const newProject = {
                id: projects.length + 1,
                name: newProjectName,
                isImportant: isImportant,
                columns: []
            };
            setProjects([...projects, newProject]);
        }
    };

    const renameProject = (projectId) => {
        const newName = prompt('Enter new project name:');
        if (newName) {
            setProjects(projects.map(project =>
                project.id === projectId ? { ...project, name: newName } : project
            ));
        }
        setShowProjectMenu(null);
    };

    const deleteTask = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
        setSelectedProjectId(null);
        setShowProjectMenu(null);
    };

    const handleTaskDetails = (columnIndex, taskIndex) => {
        if (selectedProjectId !== null) {
            setTaskDetails({ visible: true, columnIndex, taskIndex });
        }
    };

    const saveTaskDetails = () => {
        setProjects(projects.map(project =>
            project.id === selectedProjectId
                ? {
                    ...project,
                    columns: project.columns.map((column, cIndex) =>
                        cIndex === taskDetails.columnIndex
                            ? {
                                ...column,
                                tasks: column.tasks.map((task, tIndex) =>
                                    tIndex === taskDetails.taskIndex
                                        ? {
                                            ...task,
                                            name: document.getElementById('task-name').value,
                                            rating: document.getElementById('task-rating').value,
                                            description: document.getElementById('task-description').value,
                                            url: document.getElementById('url').value
                                        }
                                        : task
                                )
                            }
                            : column
                    )
                }
                : project
        ));
        setTaskDetails({ visible: false, columnIndex: null, taskIndex: null });
    };

    const currentProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="taskboard-container">
            <nav className="navbar">
                <button className="backtohome" onClick={goToHome}><span>TaskBoard </span></button>
                <div className="nav-options">
                    <button onClick={() => { setSelectedProjectId(null); setViewMode('all'); }}>All Projects</button>
                    <button onClick={() => { setSelectedProjectId(null); setViewMode('important'); }}>Important Projects</button>
                </div>
            </nav>

            <div className="main-content">
                <div className="new-section">
                    <h3>{viewMode === 'important' ? 'Starred Projects' : 'All Projects'}</h3>
                    <ul className="project-list">
                        {projects
                            .filter(project => viewMode === 'important' ? project.isImportant : true)
                            .map((project) => (
                                <li
                                    key={project.id}
                                    onClick={() => selectProject(project.id)}
                                    className={selectedProjectId === project.id ? 'active' : ''}
                                >
                                    <span>{project.name}</span>
                                    <button onClick={() => toggleImportant(project.id)} >
                                        {project.isImportant ? '★' : '☆'}
                                    </button>
                                    <button onClick={() => setShowProjectMenu(project.id)}>⋮</button>
                                    {showProjectMenu === project.id && (
                                        <div className="project-action-panel">
                                            <button onClick={() => renameProject(project.id)} >重命名项目</button>
                                            <button onClick={() => deleteTask(project.id)}>删除项目</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                    <button className="addnewproject" onClick={addNewProject}>Add New Project</button>
                </div>

                <div className="taskboard-content">
                    {currentProject ? (
                        <>
                            <h3>{currentProject.name}</h3>
                            <div className="add-column">
                                <input
                                    type="text"
                                    value={newColumnTitle}
                                    onChange={(e) => setNewColumnTitle(e.target.value)}
                                    placeholder="Enter list title"
                                />
                                <button onClick={addColumn}>Add a List</button>
                            </div>

                            <div className="columns">
                                {currentProject.columns.map((column, index) => (
                                    <div key={index} className="column">
                                        <div className="column-header">
                                            <h2>{column.title}</h2>
                                            <div className="column-menu">
                                                <button onClick={() => setShowActionPanel(index)}>⋮</button>
                                            </div>
                                            {showActionPanel === index && (
                                                <div className="action-panel" >
                                                    <button onClick={() => archiveColumn(index)}>归档列表</button>
                                                    <button onClick={() => archiveColumn(index, true)}>归档所有任务</button>
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => addTask(index)}>添加任务</button>
                                        <div className="tasks">
                                            {column.tasks.map((task, taskIndex) => (
                                                <div key={taskIndex} className="task">
                                                    <span className="task-name">{task.name}</span>
                                                    <button onClick={() => handleTaskDetails(index, taskIndex)} className="tasks">⋮</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {taskDetails.visible && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h3>Task Details</h3>
                                        <label htmlFor="task-name">Task Name:</label>
                                        <input
                                            id="task-name"
                                            type="text"
                                            defaultValue={currentProject.columns[taskDetails.columnIndex].tasks[taskDetails.taskIndex].name}
                                        />
                                        <label htmlFor="task-rating">Remark:</label>
                                        <textarea
                                            id="task-rating"
                                            defaultValue={currentProject.columns[taskDetails.columnIndex].tasks[taskDetails.taskIndex].rating}
                                        />
                                        <label htmlFor="task-description">Description:</label>
                                        <textarea
                                            id="task-description"
                                            defaultValue={currentProject.columns[taskDetails.columnIndex].tasks[taskDetails.taskIndex].description}
                                        ></textarea>
                                        <label htmlFor="task-attachment">Attachment:</label>
                                        <input
                                            type='text'
                                            id="url"
                                            defaultValue={currentProject.columns[taskDetails.columnIndex].tasks[taskDetails.taskIndex].url}
                                        />
                                        <input type="file" id="task-attachment" onChange={handleAttachmentUpload} />
                                        <ul>
                                            {currentProject.columns[taskDetails.columnIndex].tasks[taskDetails.taskIndex].attachments.map((attachment, index) => (
                                                <li key={index}><a href={attachment} download>Download Attachment</a></li>
                                            ))}
                                        </ul>
                                        <button onClick={saveTaskDetails}>Save</button>
                                        <button onClick={() => setTaskDetails({ visible: false, columnIndex: null, taskIndex: null })}>Close</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>Please select a project to view its details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
