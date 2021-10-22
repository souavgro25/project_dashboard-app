import React,{useState,useEffect} from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom'
import { getAllCategory,delCategory  } from '../config/service'
import { MAIN } from '../config/URL'
import Swal from 'sweetalert2'

export default function Category() {
    const [state,setState]=useState({catData:[]});
  
    useEffect(()=>{
      getAllCategory()
      .then(res=>{
          if(res.data.err===0){
              setState({...state,catData:res.data.catdata})
          }
      })
    },[])

    const delcat=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
              if(result.isConfirmed)
              {
                  delCategory(id)
                  .then(res=>{
                      if(res.data.err==0){
                        Swal.fire(res.data.msg)
                        getAllCategory()
                        .then(res=>{
                        if(res.data.err==0){
                            setState({...state,catData:res.data.catdata})
                        }})}
                        else {
                        Swal.fire(res.data.msg)
                      }})
              }})
            }
    return (
       <main>
             
           <header>
             <Nav />
           </header>
           <section className="row container">
               <div className="col-sm-4">
                  <Sidebar />
               </div>
               <div className="col-sm-8">
                   <h2> Category</h2>
                   <table className="table">
                       <tr>
                           <td colspan={5}>
                               <Link to="/dashboard/AddCategory/" className="btn bg-success text-white ">Add Category</Link>
                           </td>
                       </tr>
                       {state.catData.length>0 ?
                       <tr>
                           <th>S.no</th>
                           <th>Cname</th>
                           <th>Image</th>
                           <th>Created At</th>
                           <th>Action</th>
                       </tr>:""}
                       {state.catData.map((cat,index)=>
                        <tr>
                            <td>{index+1}</td>
                            <td>{cat.cname}</td>
                            <td>
                <img alt="" src={`${MAIN}${cat.image}`} width={50} height={50}/>
                            </td>
                            <td>{cat.created_at}</td>
                            <td>
                            <Link to={`/dashboard/editcategory/${cat._id}`}><p  className="btn bg-primary text-white me-2">Edit</p></Link>  
                               <p onClick={()=> delcat(cat._id)} className="btn bg-danger text-white">Delete</p> </td>


                        </tr>)}
                   </table>
               </div>
           </section>
       </main>
    )
}
