import {storageService} from './async-storage.service';
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_PROJECTS = 'projects';
//var gWatchedProject = null;

export const projectService = {
  login,
  logout,
  signup,
  getLoggedinProject,
  getProjects,
  getById,
  remove,
  update,
};

// Debug technique
// window.projectService = projectService;

function getProjects(txt) {
  // return storageService.query('project')
  return httpService.get(`project`, txt);
}

async function getById(projectId) {
  // const project = await storageService.get('project', projectId)
  const project = await httpService.get(`project/${projectId}`);
  //  gWatchedProject = project;
  return project;
}
function remove(projectId) {
  // return storageService.remove('project', projectId)
  return httpService.delete(`project/${projectId}`);
}

async function update(project) {
  // await storageService.put('project', project)
  project = await httpService.put(`project/${project._id}`, project);
  // Handle case in which admin updates other project's details
  if (getLoggedinProject()._id === project._id) _saveLocalProject(project);
  return project;
}

async function login(projectCred) {
  // const projects = await storageService.query('project')
  // const project = projects.find(project => project.projectname === projectCred.projectname)
  // return _saveLocalProject(project)

  const project = await httpService.post('auth/login', projectCred);
  // socketService.emit('set-project-socket', project._id);
  if (project) return _saveLocalProject(project);
}
async function signup(projectCred) {
  // projectCred.score = 10000;
  // const project = await storageService.post('project', projectCred)
  const project = await httpService.post('auth/signup', projectCred);
  // socketService.emit('set-project-socket', project._id);
  return _saveLocalProject(project);
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_PROJECTS);
  // socketService.emit('unset-project-socket');
  return await httpService.post('auth/logout');
}

function _saveLocalProject(project) {
  sessionStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(project));
  return project;
}

function getLoggedinProject() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_PROJECTS) || 'null');
}

// (async ()=>{
//     await projectService.signup({fullname: 'Puki Norma', projectname: 'project1', password:'123',score: 10000, isAdmin: false})
//     await projectService.signup({fullname: 'Master Adminov', projectname: 'admin', password:'123', score: 10000, isAdmin: true})
//     await projectService.signup({fullname: 'Muki G', projectname: 'muki', password:'123', score: 10000})
// })();

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events

// This is relevant when backend is connected
// (async () => {
//     var project = getLoggedinProject()
//     if (project) socketService.emit('set-project-socket', project._id)
// })();
