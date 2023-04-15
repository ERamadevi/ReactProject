import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../header";
const PER_PAGE=5;


const Category1 = () =>{
    const[category, updateCategory] = useState([]);
    const[parent,updateParent] = useState([]);

    const[catparent, pickParent] = useState("");
    const[catename, pickCatename] = useState("");
    const[catedetails, pickCatedetails] = useState("");
    const[type, pickType] = useState("");
    const [pid, pickid] = useState("");
    const[url, pickUrl] = useState("");
    const[Active, pickActive] = useState("");
    let[pcatid, updateCat] = useState(0) // siyaram

    const[msg, updateMsg] = useState("");
    

    const getCategory = () =>{
       const url = "https://www.medicalplanet.in/webapi/Category/getall";
       fetch(url)
       .then(response=>response.json())
    .then(data=>{
        updateCategory(data);
	// alert(data.length)
     })
    }

    useEffect(()=>{
        getCategory();
    })
 const Save =() =>{
    let input={
        "categoryname":catename,
        "categorydetails":catedetails,
                     "url":url,
                     "pid":catparent,
                     
        "active":Active,
        "parent":parent
    };
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
    };
    fetch('https://www.medicalplanet.in/webapi/Category/save', requestOptions)
    .then(response => response.text())
    .then(data => {

        alert(data);
    });


    const getParent = () =>{
        const url = "https://www.medicalplanet.in/webapi/Category/getparent";
        fetch(url)
        .then(response=>response.json())
     .then(data=>{
         updateParent(data);
     // alert(data.length)
      })
     }

 
     useEffect(()=>{
         getParent();
     })
    
}
  const [currentPage, setCurrentPage] = useState(0);     
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(category.length / PER_PAGE); 


     return (
        <>
  
         <Header/>

        <div className="container mt-3">
        <div className="row">
         <div className="col-lg-4"> 
         <form>
          <div className="card border-none shadow"> 
          <div className="card-header bg-primary text-white p-2 text-center fs-5"> Category Api</div>
          <div className="card-body">
        
            <div className="mb-3">
            <label> Category Name </label>          
          <select className="form-select">
		  <option value="0">Parent Category</option>
		   <option value="1">Child Category</option>
		    <option value="2">TV</option>
		     <option value="3">Books</option>
             <option value="4">Laptop</option> 
			 </select>
            </div>

            <div className="mb-3">
                <label> Category Details </label>
                <input type="text" className="form-control" onChange={obj=>pickCatedetails(obj.target.value)} value={catedetails}/>
            </div>
            <div className="mb-3">
                <label>  Category Url </label>
                <input type="text" className="form-control" onChange={obj=>pickUrl(obj.target.value)} value={url}/>
            </div>
            <div className="mb-3">
                            <label> Active </label>
                            <select className='form-select' onChange={obj=>pickActive(obj.target.value)} value={Active}>  
                            <option> Choose </option>
                            <option> Yes</option>
                            <option> No </option>
                            </select>
            </div>
            <div className="mb-3">
                <label> Category Pid </label>
            <select className="form-select" onChange={obj=>pickParent(obj.target.value)} value={catparent} >  
		<option value="0">1</option>
		<option value="1">2</option>
		<option value="2">3</option>
		<option value="3">4</option>
	</select>
            </div>
            
            <div className="mb-3 text-center">
            <button className="btn btn-success text-center" onClick={Save}> Save </button>
        </div>
        </div>
        </div>  
        </form>
        </div>    
        
     <div className="col-lg-8 ">
     <div className="col-lg-4"> 
     <select className="form-select mt-3">
         {category.map((parent, index) => {
                                
									return (
                                        
										<option key={index}>
											<button
												onClick={() => {
													<getCategory />;
                                                    <getParent />;
												}}
											>
												{parent.categoryname} 
                                               {parent.catparent}
											</button>
                                            </option>
                                        
                                       
                                       
									);
                                   
                                    
								})}
                                </select>
                                </div>
                
                 
         
        <table className="table border-none">     
            <thead className="bg-primary text-white">
                <tr>
                    <th> Category Id </th>
                    <th> Category Name </th>
                    <th> Category Details </th>
                    <th> Url </th>
                    <th>Active </th> 
                    <th> Edit </th>
                    <th> Delete</th>
                </tr> 
            </thead>
            <tbody>
                {
                    category.map((cate, index)=>{
                        return(
                            <tr key={index}>
                                <td> {cate.catid} </td>
                               
                                <td> {cate.categoryname} </td>
                                <td> {cate.categorydetails} </td>
                                <td> {cate.url} </td> 
                                <td> {cate.active} </td>  
                              <td>  <div className="btn btn mb-4 bg-success text-white"> 
                              <Link to="/cataApi/edit1"> Edit </Link>  </div> </td>
                                <td> <div className="btn btn mb-4 bg-info">
                                <i className="fa fa-trash"> delete </i> 
                                 </div>
                                </td>
                                
                                
                            </tr>
                        )
                    })
                }
            </tbody>
            
        </table>
        <div className="mb-2 mt-2">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
             </div>

        
     </div>
     
            </div>
        </div>
        </>
     )
}

export default Category1;