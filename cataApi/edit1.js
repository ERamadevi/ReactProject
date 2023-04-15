import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";



const Editcat = () => {
    let { catid } = useParams();

    let [category, updatecategory] = useState([]);

    let [Cname, updatename] = useState("");
    let [Cdetails, updatedetails] = useState("");
    let [Cactive, updateactive] = useState("");
    let [Curl, updateurl] = useState("");
    let [cpid, updatepid] = useState("");
    let [Ctype, updatetype] = useState("");

    

    const datacategory = () => {
        let input = { "id": catid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                updatename(data.categoryname);
                updatedetails(data.categorydetails);
                updateactive(data.active);
                updateurl(data.url);
                updatepid(data.parent);
                updatetype(data.type);
            });

    }

    const UpdateCategory = () => {
        let input = {
            categoryname: Cname,
            categorydetails: Cdetails,
            url:Curl ,
            parent: cpid,
            active:Cactive ,
            id: catid,
            type:Ctype
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/update', requestOptions)
            .then(response => response.text())
            .then(data => {
                swal("Good job!", "Your Data has been Updated ! 👍 ", "success");
            });

    }
    useEffect(()=>{
        datacategory();
    },[true]);

    return (

        <><h3 className="text-primary text-center mt-1 bg-light rounded-pill p-2 text-primary"> <i className="fa fa-folder"></i> Category API </h3><div className="col-lg-2 offset-9" align="right">
        </div><div className="container mt-2">
                <div className="row mt-2"><div className="col-lg-3 mb-2"><Link to="/cataApi/category1" className="btn btn-primary text-light p-2"><i className="fa fa-arrow-left"></i> Click Here For Entry Page  </Link></div>
                    <div className="col-lg-5 mt-2">
                        <div className="card border-0 shadow">
                            <div className="card-header bg-primary text-white mt-2">
                                <h5 className="text-white text-center"><i className="fa fa-address-book"></i> Category Entry  </h5> </div>
                            <div class="card-body pt-1" id="mylabel">
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Category Name</div>
                                    <div class="col-lg-6"><input type="text" className="form-control" onChange={obj => updatename(obj.target.value)} value={Cname} /></div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Category Details </div>
                                    <div class="col-lg-6"><textarea className="form-control" onChange={obj => updatedetails(obj.target.value)} value={Cdetails} /></div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Category URL </div>
                                    <div class="col-lg-6"><input type="text" className="form-control" onChange={obj => updateurl(obj.target.value)} value={Curl} /></div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Category PId </div>
                                    <div class="col-lg-6"><input type="text" className="form-control" onChange={obj => updatepid(obj.target.value)} value={cpid} /></div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Type </div>
                                    <div class="col-lg-6"><select className="form-select" onChange={obj => updatetype(obj.target.value)} value={Ctype}>
                                        <option>Type</option>
                                        <option>P</option>
                                        <option>D</option>
                                        <option>L</option>
                                    </select>
                                    </div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-6"> Active </div>
                                    <div class="col-lg-6"><select className="form-select" onChange={obj => updateactive(obj.target.value)} value={Cactive}>
                                        <option>Select</option>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>
                                    </div>
                                </div>
                                <div class="mt-4 row ">
                                    <div class="col-lg-4">  </div>
                                    <div class="col-lg-7"><Link to="/cataApi/category1" onClick={UpdateCategory} className="btn btn-outline-primary mb-4"> Update </Link></div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div></div></>
)
}
export default Editcat;