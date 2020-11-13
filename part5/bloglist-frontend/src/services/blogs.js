import axios from 'axios'
const baseUrl = '/api/v1/blog'

const headers = {headers : {
  Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgZGVsZXRpb25zIiwiaWQiOiI1ZmFjNjU1MzQ0ZDdlYzNlMTQwMDIwNWYiLCJpYXQiOjE2MDUxMzM2NzR9.meM2gEL_Hdr0jx_fmqUvNxOShPJIAIWrzhkLPo6YN34'
}}


const getAll = () => {
  const request = axios.get(baseUrl,headers)
  return request.then(response => response.data)
}

export default { getAll }