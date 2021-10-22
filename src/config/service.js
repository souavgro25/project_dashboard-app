import axios from 'axios';
import { USER_URL, CATEGORY_URL } from './URL';
const token = localStorage.getItem('token')
export function login(data)
{
   return axios.post(`${USER_URL}adminlogin`,data);
}
export function register(data)
{
   return axios.post(`${USER_URL}register`,data);
}
export function changePassword(data)
{
   return axios.post(`${USER_URL}changepassword`,data,{
      headers: { 'x-auth-token': token }
    });
}
export function addCategory(data){
   return axios.post(`${CATEGORY_URL}addcategory`,data,{
      headers: { 'x-auth-token': token }
    });
}
export function getAllCategory(){
   return axios.get(`${CATEGORY_URL}getcategory`,{
      headers: { 'x-auth-token': token }
    });
}
export function delCategory(id){
   return axios.delete(`${CATEGORY_URL}delcategory/${id}`,{
      headers: { 'x-auth-token': token }
    });
}

export function editCategory(id,data){
   
      return axios.patch(`${CATEGORY_URL}updatecategory/${id}`,data,{
         headers: { 'x-auth-token': token }
       });
   
   
}