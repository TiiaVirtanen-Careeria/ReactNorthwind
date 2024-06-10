import axios from "axios";

const baseUrl = "https://localhost:7141/api/Employees"
//const baseUrl = "https://restapinorthwind.azurewebsites.net/api/Employees"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEmployee => {
    return axios.post(baseUrl, newEmployee)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.employeeId}`, object)
}

export default { getAll, create, remove, update }