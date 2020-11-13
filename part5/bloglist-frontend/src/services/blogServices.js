import axios from 'axios'
const baseUrl = '/api/v1/blog/'

// const headers = {headers : {
//   Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgZGVsZXRpb25zIiwiaWQiOiI1ZmFjNjU1MzQ0ZDdlYzNlMTQwMDIwNWYiLCJpYXQiOjE2MDUxMzM2NzR9.meM2gEL_Hdr0jx_fmqUvNxOShPJIAIWrzhkLPo6YN34'
// }}

let token = null


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}

const update = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.put(`${baseUrl}${id}`,config)
  return request.then(response => response.data)
}

const _delete = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.delete(`${baseUrl}${id}`,config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update , _delete}
