import { useEffect, useState } from "react";
import {form, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Header from "../header";
const PER_PAGE=5;

const Home = () => {

    let [brand, updatebrand] = useState([]);

    let [Bname, updatename] = useState("");
    let [Bdetails, updatedetails] = useState("");
    let [Bactive, updateactive] = useState("");
    let[keyword,pickSearchName]=useState("");

    const Datafetch = () => {

        const url = "https://www.medicalplanet.in/webapi/Brand/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                toast.warning(" Total No. in the List are " + data.length);
                updatebrand(data);
            })
    }
    useEffect(() => {
        Datafetch();
    }, [true]);

    const saveBrand = () => {
        let input = {
            "brandname": Bname,
            "details": Bdetails,
            "active": Bactive,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                swal("Are You sure to save the details ?", {
                    buttons: ["Cancel", " Save"],
                });
                toast.success(`${Bname} Added Successfully ! 😀👍 `)
            });

    }
    const deleteBrand = (brandid) => {
        let input = { id: brandid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/deleteone', requestOptions)
            .then(response => response.text())
            .then(data => {
                // swal(" Product Deleted Successfully !");
          
                swal({   
                   title: "Are you sure?",
                   text: "Once deleted, you will not be able to recover this file!",
                   icon: "warning",
                   buttons: true,
                   dangerMode: true,
                })
                .then((willDelete) => {
                   if (willDelete) {
                    swal("Ooof! Your file has been deleted!", {
                      icon: "success",
                    });
                  } else {
                    swal("Your imaginary file is safe!");
                  }
                  });  
                  Datafetch();
            });
          
    }
    const [currentPage, setCurrentPage] = useState(0);     
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(brand.length / PER_PAGE);

    return (

        <>
            <Header/>
            <h3 className="text-primary text-center mt-3 p-2 text-primary"> Brand Details </h3>
             <div className="col-lg-2 offset-9" align="center">
                <form className="d-flex">
                    <input onChange={obj=>pickSearchName(obj.target.value)} className="form-control me-2 p-1" type="text" placeholder="Search"/> 
                      <button className="btn btn-primary border p-1" type="button"> Search</button>
                  </form>
            </div>
            
     <div className="container text-center ">
        <div className="row justify-content-md-center">
          <div className="col-lg-4 mt-4">
              <div className="card border-0 shadow">
                    <div className="card-header bg-primary text-white mt-4">
                                <h3 className="text-white text-center">Add New Brand  </h3> </div>
                            <div className="card-body pt-1" id="mylabel">
                                <div>
                                    <div className="col-lg-5"> Brand Name</div>
                                    <div className="col-lg-12"><input type="text" className="form-control" onChange={obj => updatename(obj.target.value)} value={Bname} /></div>
                                </div>
                                <div>
                                    <div className="col-lg-5"> Brand Details </div>
                                    <div className="col-lg-12"><textarea className="form-control" onChange={obj => updatedetails(obj.target.value)} value={Bdetails} /></div>
                                </div>
                                <div>
                                    <div className="col-lg-5"> Active </div>
                                    <div className="col-lg-12"><select className="form-select" onChange={obj => updateactive(obj.target.value)} value={Bactive}>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="mt-4 row">
                                    <div className="col-lg-4">  </div>
                                    <div className="col-lg-7"><button onClick={saveBrand} className="btn btn-outline-primary mb-4" > Save </button></div>
                                </div>


                            </div>

                        </div>

                    </div>

                    
                    </div>
                    </div>

                       
                    <div className="container container text-center"> 
                    <div className="row row justify-content-md-center"> 
                    <div className="col-lg-8 mt-4">
                    <div className="bg-primary text-white mt-4">
                                <h3 className="text-white text-center"> Brand Details  </h3> </div>
                            <div class="card-body pt-2" id="mylabel">
                                <table className="table table-bordered table-hover shadow text-center">
                                    <thead>
                                        <tr>
                                            <th> Brand ID </th>
                                            <th> Brand Name </th>
                                            <th>Brand Details </th>
                                            <th> Active </th>
                                            <th> Edit</th>
                                            <th> Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            brand.slice(offset, offset + PER_PAGE).filter((temp)=>{                                                     if(keyword === ""){
                                                    return temp;
                                                } else if (temp.brandname.toLowerCase().includes(keyword.toLowerCase())){
                                                    return temp;
                                            }}).map((mybrand, index) => {
                                                return (
                                                    <tr>
                                                        <td> {mybrand.brandid}</td>
                                                        <td> {mybrand.brandname} </td>
                                                        <td> {mybrand.details} </td>
                                                        <td> {mybrand.active} </td>
                                                        <td>
                                                            <div className="btn btn-outline-primary mb-4">
                                                                <Link to="/edit"> Edit </Link> </div> 
                                                            
                                                            </td>
                                                        <td><button onClick={deleteBrand.bind(this,mybrand.brandid)} className="btn btn-danger">
                                                        <i className="fa fa-trash"></i> </button></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
             

       
       </div>
    
            <div className="mb-2 mt-2">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
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
    <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            </>
    )
}
export default Home;