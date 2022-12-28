const apiEndpoint = 'http://127.0.0.1:8000/';

const api = {
  async getAllTodos() {
    return fetch(`${apiEndpoint}get_all_todos`).then((response) => response.json());
  },
  async addTodo(data) {
    return fetch(`${apiEndpoint}add_todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams(data),
    }).then((response) => response.json());
  },
  async modifyTodo(data) {
    return fetch(`${apiEndpoint}modify_todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams(data),
    }).then((response) => response.json());
  },
  async deleteTodo(id) {
    return fetch(`${apiEndpoint}delete_todo`, {
      method: 'DELETE',
      body: new URLSearchParams({ id }),
    }).then((response) => response.json());
  },
  async deleteAll() {
    return fetch(`${apiEndpoint}delete_all`, {
      method: 'DELETE',
    }).then((response) => response.json());
  },
};

export default api;