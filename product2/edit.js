import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";

const Edit = () => {
    let{brandid}=useParams();

    let [brand, updatebrand] = useState([]);

    let [Bname, updatename] = useState("");
    let [Bdetails, updatedetails] = useState("");
    let [Bactive, updateactive] = useState("");

     
    const saveBrand = () => {
        let input={ id:brandid};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/edit', requestOptions)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
           updatename(data.brandname);
            updatedetails(data.details);
            updateactive(data.active);
        });
        
    }
    

    const UpdateBrand = () =>{
        let input={
			brandname:Bname,
			details:Bdetails,
            active:Bactive,
            id:brandid,
            
    	};
		const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
		};
		fetch('https://www.medicalplanet.in/webapi/Brand/update', requestOptions)
		.then(response => response.text())
		.then(data => {
			swal("updated");
		})
    }
    useEffect(()=>{
        saveBrand();
    },[true]);

        return(
            <>
            <h3 className="text-primary text-center mt-3 bg-info  text-white"> <i className="fa fa-home"></i> Brand API </h3>
            <div className="col-lg-2 offset-9" align="right">
                </div><div className="container mt-2">
                    <div className="row mt-2"><div className="col-lg-3 mb-4">
                        <Link to="/product2/homepage" className="btn btn-primary text-light p-2" ><i className="fa fa-arrow-left"></i> Click Here For Entry Page  </Link></div>
                        <div className="col-lg-7 mt-4">
                            <div className="card border-0 shadow">
                                
                                <div className="card-header bg-primary text-white mt-4">
                                    <h3 className="text-white text-center"><i className="fa fa-edit"></i> Edit Page  {brand.Bname}</h3> </div>
                                <div class="card-body pt-1" id="mylabel">
                                    <div class="mt-4 row ">
                                        <div class="col-lg-5"> Brand Name</div>
                                        <div class="col-lg-7"><input type="text" className="form-control" value={Bname} onChange={obj => updatename(obj.target.value)}  /></div>
                                    </div>
                                    <div class="mt-4 row ">
                                        <div class="col-lg-5"> Brand Details </div>
                                        <div class="col-lg-7"><textarea className="form-control" value={Bdetails} onChange={obj => updatedetails(obj.target.value)} /></div>
                                    </div>
                                    <div class="mt-4 row ">
                                        <div class="col-lg-5"> Active </div>
                                        <div class="col-lg-7"><select className="form-select" value={Bactive} onChange={obj => updateactive(obj.target.value)} >
                                            <option>Select</option>
                                            <option>YES</option>
                                            <option>NO</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div class="mt-4 row ">
                                        <div class="col-lg-5">  </div>
                                        <div class="col-lg-7"><Link to="/product2/homepage" onClick={UpdateBrand} className="btn btn-outline-primary mb-4"> Update </Link></div>
                                    </div>


                                </div>

                            </div>
                        </div></div></div></>
                        )
                        }
                        export default Edit;