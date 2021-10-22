import axios from 'axios';
import {PRODUCT_URL } from './URL';
const token = localStorage.getItem('token')


export async function addProducts(data){
    try {
        return await axios.post(`${PRODUCT_URL}addProduct`,data,{
            headers: { 'x-auth-token': token }
          });
    } catch (error) {
        console.log(error)
    }
  
 }


 export async function getAllProducts(){
     try {
        return await axios.get(`${PRODUCT_URL}getProduct`,{
            headers: { 'x-auth-token': token }
          });
     } catch (error) {
        console.log(error)
     }
  
 }

 export async function delProduct(id){
     try {
        return await  axios.delete(`${PRODUCT_URL}deleteProduct/${id}`,{
            headers: { 'x-auth-token': token }
          });
     } catch (error) {
        console.log(error) 
     }
   
 }
 
 export async function editProduct(id,data){

    try {
          
    return await axios.patch(`${PRODUCT_URL}updateProduct/${id}`,data,{
        headers: { 'x-auth-token': token }
      });
    } catch (error) {
        console.log(error)
    }
 
 
 
}