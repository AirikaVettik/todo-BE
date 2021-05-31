const { getAllTasks, 
        getTodoTasks,
        getDoneTasks,
        getTasksCreatedBy,
        moveTask,
        createTask,
        deleteDoneTask,
        deleteToDoTask,
        createUser,
        getAllUsers,
        downloadFile
    } = require('../../src/controllers');

const spy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: spy,
        post: spy,
        delete: spy,
      };
    },
  };
});

describe('router', () => {
    require('../../src/router.js');
  
    test('should use getAllTasks controller when "/all-tasks" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(1, '/all-tasks', getAllTasks);
    });
    test('should use getTodoTasks controller when "/todo-tasks" is triggered', () => {
        expect(spy).toHaveBeenNthCalledWith(2, '/todo-tasks', getTodoTasks);
      });
    test('should use getDoneTasks controller when "/done-tasks" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(3, '/done-tasks', getDoneTasks);
    });
    test('should use getTasksCreatedBy controller when "/all-tasks/:createdBy" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(4, '/all-tasks/:createdBy', getTasksCreatedBy);
    });
    test('should use moveTask controller when "/moveTask/:id/:toTask" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(5, '/moveTask/:id/:toTask', moveTask);
    });
    test('should use createTask controller when "/createTask" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(6, '/createTask', createTask);
    });
    test('should use deleteDoneTask controller when "/done-tasks/:id" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(7, '/done-tasks/:id', deleteDoneTask);
    });
    test('should use deleteToDoTask controller when "/todo-tasks/:id" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(8, '/todo-tasks/:id', deleteToDoTask);
    });
    test('should use createUser controller when "/user" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(9, '/user', createUser);
    });
    test('should use getAllUsers controller when "/all-users" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(10, '/all-users', getAllUsers);
    });
    test('should use downloadFile controller when "/downloadFile" is triggered', () => {
      expect(spy).toHaveBeenNthCalledWith(11, '/downloadFile', downloadFile);
    });
    test('should call methods 11 times', () => {
        expect(spy).toHaveBeenCalledTimes(11);
      });
});