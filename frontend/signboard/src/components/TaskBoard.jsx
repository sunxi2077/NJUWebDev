import { useState, useEffect } from 'react';
import './TaskBoard.css';

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
    const [attachment, setAttachment] = useState(null);
    const [showProjectMenu, setShowProjectMenu] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProjectMenu !== null && !event.target.closest('.action-panel')) {
                setShowProjectMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProjectMenu]);//实现了操作菜单的点击外部关闭，但是这一条其实只配置了showProjectMenu的监听，其他的监听没有配置

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

    const handleTaskDetailChange = (e) => {
        const { name, value } = e.target;
        setProjects(projects.map(project =>
            project.id === selectedProjectId
                ? {
                    ...project,
                    columns: project.columns.map((column, cIndex) =>
                        cIndex === taskDetails.columnIndex
                            ? {
                                ...column,
                                tasks: column.tasks.map((task, tIndex) =>
                                    tIndex === taskDetails.taskIndex ? { ...task, [name]: value } : task
                                )
                            }
                            : column
                    )
                }
                : project
        ));
    };

    const handleAttachmentUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAttachment(url);
            // Update the task's attachments array
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
        setShowActionPanel(null);
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
    };

    const deleteTask = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
        setSelectedProjectId(null);
    };

    const handleTaskDetails = (columnIndex, taskIndex) => {
        if (selectedProjectId !== null) {
            setTaskDetails({ visible: true, columnIndex, taskIndex });
        }
    };

    const currentProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="taskboard-container">
            <nav className="navbar">
                <h2>Task Board</h2>
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
                                        <div className="action-panel">
                                            <button onClick={() => renameProject(project.id)}>Rename Project</button>
                                            <button onClick={() => deleteTask(project.id)}>Delete Task</button>
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
                                    placeholder="工作状态"
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
                                                <div className="action-panel">
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
                                                    <button onClick={() => handleTaskDetails(index, taskIndex)} className='tasks'>⋮</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>请选择一个项目来查看看板。</p>
                    )}
                </div>

                {taskDetails.visible && selectedProjectId !== null && taskDetails.columnIndex !== null && taskDetails.taskIndex !== null && (
                    <div className="task-details-modal">
                    <h3>任务详情</h3>
                    
                    {/* 任务名称 */}
                    <div className="task-details-field">
                        <label htmlFor="task-name">任务名称:</label>
                        <input
                            type="text"
                            id="task-name"
                            name="name"
                            value={projects[selectedProjectId]?.columns[taskDetails.columnIndex]?.tasks[taskDetails.taskIndex]?.name || ''}
                            onChange={handleTaskDetailChange}
                        />
                    </div>
                    
                    {/* 描述 */}
                    <div className="task-details-field">
                        <label htmlFor="task-description">描述:</label>
                        <textarea
                            id="task-description"
                            name="description"
                            value={projects[selectedProjectId]?.columns[taskDetails.columnIndex]?.tasks[taskDetails.taskIndex]?.description || ''}
                            onChange={handleTaskDetailChange}
                        />
                    </div>
                    
                    {/* 评分 */}
                    <div className="task-details-field">
                        <label htmlFor="task-rating">评分:</label>
                        <input
                            type="text"
                            id="task-rating"
                            name="rating"
                            value={projects[selectedProjectId]?.columns[taskDetails.columnIndex]?.tasks[taskDetails.taskIndex]?.rating || ''}
                            onChange={handleTaskDetailChange}
                        />
                    </div>
                    
                    {/* 附件 */}
                    <div className="task-details-field">
                        <label htmlFor="task-attachment">附件:</label>
                        <input
                            type="file"
                            id="task-attachment"
                            onChange={handleAttachmentUpload}
                        />
                        {attachment && (
                            <div className="attachment-download">
                                <a href={attachment} download>下载附件</a>
                            </div>
                        )}
                    </div>
                    
                    {/* 关闭按钮 */}
                    <button className="close-modal-btn" onClick={() => setTaskDetails({ visible: false, columnIndex: null, taskIndex: null })}>
                        关闭
                    </button>
                </div>
                
                )}
            </div>
        </div>
    );
};

export default TaskBoard;
