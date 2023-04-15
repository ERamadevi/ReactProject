import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
//import Header from '../header';


const EditProduct = () => {
    

    let [product,setproduct] = useState([]);

    let [name, updateName] = useState("");
    let [catId, updateCatId] = useState("");
    let [brandId, updateBrandId] = useState("");
    let [price, updatePrice] = useState("");
    let [quanity, updaeQuanity] = useState("");
    let [details, updateDetails] = useState("");
    let [vendorId, updateVendorId] = useState("");
    let [offer, updateOffer] = useState("");
    let [url, updateUrl] = useState("");
    let [active, updateActive] = useState("");
    let [soldunit, updateSoldunit] = useState("");
    let [action, updateAction] = useState("");

    

    const dataproduct = () => {
        let input = { "id": brandId };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                updatename(data.productname);
                Updatecategoryid(data.categoryid);
                updateprice(data.price);
                updatequantity(data.qty);
                updatephoto(data.photo);
                updatedetails(data.productdetails);
                updatevendorid(data.vendorid)
                updateoffer(data.offer);
                updateurl(data.url);
                updateactive(data.active);
                updatesoldunit(data.soldunit);
                updateaction(updateaction);
                
            });

    }

    const updateProduct = () => {
        let input = {
            
            brand:Pbrand,
            name: Pname,
           categoryid:Pcategoryid,
            price:Pquanity,
            photo:Pphoto,
            details:Pdetails,
            vendorid:PvendorId,
            offer:Poffer,
            url:Purl ,
            active:Pactive,
             soldunit:Psoldunit,
           action:Paction,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/update', requestOptions)
            .then(response => response.text())
            .then(data => {
              
            });

    }
    useEffect(()=>{
        dataproduct();
    },[true]);
	

	return (
  <> 
			{/* <Header/>  */}
			<div className=" container mt-4 m-0">
				<div className="row">
					

					<div className="col-lg-3 ms-0">
						<div className="shadow p-3 mb-5 bg-body-tertiary rounded">
							<h2 align="center" className="h2 mb-4">
								Add Product
							</h2>

							<div className="mb-1">
								<form align="left" cellPadding={10}>
									<div className="mb-3">
										<label className="form-label">Product Name</label>
										<input
											type="text"
											placeholder="Enter Product Name"
											value={productName}
											onChange={(e) => Pname(e.target.value)}
											className="form-control"
										/>
									</div>
                                    <div className="mb-1">
										<label className="form-label">B- Category Id</label>
										<select
											className="form-select"
											onChange={(e) => Pcategoryid,(e.target.value)}
										>
											<option>Choose</option>
											{category.map((cat, index) => {
												return (
													<option value={cat.catid} key={index}>
														{cat.categoryname}
													</option>
												);
											})}
										</select>
									</div>
									<div className="mb-1">
										<label className="form-label">Product Details</label>
										<input
											type="text"
											placeholder="Enter Product Details"
											value={details}
											onChange={(e) => Pdetails(e.target.value)}
											className="form-control"
										/>
									</div>
									
									<div className="mb-1">
										<label className="form-label">Select Brand</label>
										<select
											className="form-select"
											onChange={(e) =>Pbrand (e.target.value)}
										>
											<option>Choose</option>
											{brands.map((brand, index) => {
												return (
													<option value={brand.productid} key={index}>
														{brand.brandname}
													</option>
												);
											})}
										</select>
									</div>
									<div className="mb-1">
										<label>Price</label>
										<input className="form-control" type="text" value={price} onChange={obj => setPrice(obj.target.value)}  />
									</div>
									<div className="mb-1">
										<label className="form-label">Quantity</label>
										<input
											type="number"
											placeholder="Enter Quantity"
											value={qty}
											onChange={(e) => Pquanity(e.target.value)}
											className="form-control"
										/>
									</div>
									<div className="mb-1">
										<label className="form-label">Photo</label>
										<input
											type="Text"
											placeholder="Upload Photo"
											value={photo}
											onChange={(e) => Pphoto(e.target.value)}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<label className="form-label">Vendor Id</label>
										<input
											type="text"
											placeholder="Enter vendorID"
											value={vendorId}
											onChange={(e) => PvendorId(e.target.value)}
											className="form-control"
										/>
									</div>

									<div className="mb-1">
										<label className="form-label">Url</label>
										<input
											type="text"
											placeholder="Enter Url"
											value={url}
											onChange={(e) => Purl(e.target.value)}
											className="form-control"
										/>
									</div>
									<div className="mb-1">
										<label className="form-label">Offer</label>
										<input
											type="text"
											placeholder="Offer 10%"
											value={offer}
											onChange={(e) => Poffer(e.target.value)}
											className="form-control"
										/>
									</div>
									

									<div className="mb-1">
										<label>Active</label>
										<select
											className=" form-select"
											type="text"
											value={active}
											onChange={(e) => Pactive(e.target.value)}
										>
											<option> </option>
											<option>YES</option>
											<option>NO</option>
										</select>
									</div>
									<div className="mb-1">
										<label className="form-label">Sold Units</label>
										<input
											type="text"
											placeholder="Sold Units"
											value={soldUnit}
											onChange={(e) => Psoldunit(e.target.value)}
											className="form-control"
										/>
									</div>

									<div className="text-center">
										<button
											onClick={save}
											className="btn btn-primary me-2"
											type="submit"
										>
											Save
										</button>

										</div>
								</form>
							
						</div>
					</div>

					
			 </div>			
			</div>
            </div>
			
		</>
	);
};

export default EditProduct;