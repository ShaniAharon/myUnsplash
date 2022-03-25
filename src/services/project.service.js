import {storageService} from './async-storage.service.js';
import {utilService} from './util.service.js';

const KEY = 'projectDB';

export const projectService = {
  query,
  getById,
  remove,
  save,
  getEmptyProject,
};

_createProjects();

// TODO: support paging and filtering and sorting
function query() {
  return storageService.query(KEY);
}

function getById(id) {
  return storageService.get(KEY, id);
}

function remove(id) {
  return storageService.remove(KEY, id);
}

function save(project) {
  const savedProject = project._id
    ? storageService.put(KEY, project)
    : storageService.post(KEY, project);
  return savedProject;
}

function getEmptyProject(name = '', price = 100) {
  return {
    _id: '',
    name,
    price,
    createdAt: Date.now(),
    reviews: ['good', 'great', 'fine'],
  };
}

// Create Test Data:
function _createProjects() {
  var projects = JSON.parse(localStorage.getItem(KEY));
  if (!projects || !projects.length) {
    projects = [
      _createProject('Apple'),
      _createProject('Amazon'),
      _createProject('Google'),
    ];
    localStorage.setItem(KEY, JSON.stringify(projects));
  }
  return projects;
}

function _createProject(name) {
  const project = getEmptyProject(name, utilService.getRandomInt(80, 300));
  project._id = utilService.makeId();
  return project;
}
