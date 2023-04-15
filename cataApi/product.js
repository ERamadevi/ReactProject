import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header';


const Productpage = () => {
	let [allProduct, setAllProduct] = useState([]);
	let [brands, setBrands] = useState([]);
	let [category, setCategory] = useState([]);
	let [productName, setProductName] = useState('');
	let [catId, setCatId] = useState('');
	let [brandId, setBrandId] = useState('');
	let [price, setPrice] = useState(0);
	let [qty, setQty] = useState(0);
	let [photo, setPhoto] = useState('');
	let [details, setDetails] = useState('');
	let [vendorId, setVendorId] = useState('');
	let [offer, setOffer] = useState(0);
	let [url, setUrl] = useState('');
	let [active, setActive] = useState('');
	let [soldUnit, setSoldUnit] = useState('');

	//let [pcatid, setPCatId] = useState(0);

	let [keyword, setKeyword] = useState('');

	//!Brand
	const getBrand = () => {
		let input = { productid: brandId };
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input),
		};
		fetch('https://www.medicalplanet.in/webapi/Brand/getall', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setBrands(data);
			});
	};

	//!Category
	const getCategory = () => {
		let input = { productid: catId };
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input),
		};
		fetch('https://www.medicalplanet.in/webapi/Category/getall', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setCategory(data);
			});
	};

	//!Product
	const getProductData = () => {
		const url = 'https://www.medicalplanet.in/webapi/Product/getall';
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setAllProduct(data);
			});
	};

	// const getParent = () => {
	// 	const url = 'https://www.medicalplanet.in/webapi/Product/getparent';
	// 	fetch(url)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setParents(data);
	// 			setPCatId(data[10].catId);
	// 		});
	// };

	//SAVE USER
	const save = (e) => {
		e.preventDefault();

		let input = {
			productname: productName,
			categoryid: catId,
			brandid: brandId,
			price: price,
			quantity: qty,
			photo: photo,
			details: details,
			vendorid: vendorId,
			offer: offer,
			active: active,
			soldunit: soldUnit,
		};
		const requestOptions = {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(input),
		};
		fetch('https://www.medicalplanet.in/webapi/Product/save', requestOptions)
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				getProductData();
				setProductName('');
				setCatId('');
				setBrands('');
				setPrice('');
				setQty('');
				setDetails('');
				setVendorId('');
				setOffer('');
				setActive('');
				setUrl('');
				setSoldUnit('');
			});
		toast.success(`${productName} Saved successfully`, {
			position: 'top-center',
		});
	};

	//DELETE Brand
	const deleteProduct = (productid) => {
		let input = { id: productid };
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input),
		};
		fetch(
			'https://www.medicalplanet.in/webapi/Product/deleteone',
			requestOptions
		)
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				getProductData();
			});

		toast.error(`${productName} Deleted successfully`, {
			position: 'top-center',
		});
	};

	useEffect(() => {
		getProductData();
		getBrand();
		getCategory();
	}, []);

	//for pagination
	const PER_PAGE = 7;
	const [currentPage, setCurrentPage] = useState(0);
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}
	const offset = currentPage * PER_PAGE;
	const pageCount = Math.ceil(allProduct.length / PER_PAGE);

	// const handleChange = (e) => {
	// 	alert(e);
	// };

	return (
		<div>
			<Header/>
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
											onChange={(e) => setProductName(e.target.value)}
											className="form-control"
										/>
									</div>
                                    <div className="mb-1">
										<label className="form-label">B- Category Id</label>
										<select
											className="form-select"
											onChange={(e) => setCatId(e.target.value)}
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
											onChange={(e) => setDetails(e.target.value)}
											className="form-control"
										/>
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
											onChange={(e) => setQty(e.target.value)}
											className="form-control"
										/>
									</div>
									<div className="mb-1">
										<label className="form-label">Photo</label>
										<input
											type="Text"
											placeholder="Upload Photo"
											value={photo}
											onChange={(e) => setPhoto(e.target.value)}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<label className="form-label">Vendor Id</label>
										<input
											type="text"
											placeholder="Enter vendorID"
											value={vendorId}
											onChange={(e) => setVendorId(e.target.value)}
											className="form-control"
										/>
									</div>

									
									<div className="mb-1">
										<label className="form-label">Offer</label>
										<input
											type="text"
											placeholder="Offer 10%"
											value={offer}
											onChange={(e) => setOffer(e.target.value)}
											className="form-control"
										/>
									</div>
									

									<div className="mb-1">
										<label>Active</label>
										<select
											className=" form-select"
											type="text"
											value={active}
											onChange={(e) => setActive(e.target.value)}
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
											onChange={(e) => setSoldUnit(e.target.value)}
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

					<div className="col-lg-8">
						<div className="row m-0">
							<div className="col-lg-3">
								<div className="input-group">
									<select className="form-select" onChange={(e) => setCatId(e.target.value)} >
										<option>Parent Product</option>
										{allProduct.map((product, index) => {
											return (
												<option value={product.CatId} key={index}>
													{product.Productname}
												</option>
											);
										})}
									</select>
									
								</div>
							</div>
		
						</div>
                        <div align="center">
						<h2>Available Products - {allProduct.length}</h2>
					</div>

						<table  className="table  border-none">
							<thead className="text-light bg-warning">
								<tr>
									<th>Product id</th>
                                    <th>Brand Id</th>
									<th>Product Name</th>
									<th>Category Id</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Photo</th>
									<th>Details</th>
									<th>Vendor ID</th>
									<th>Offer</th>
									<th>Url</th>
									<th>Active</th>
									<th>Sold Unit</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{allProduct
									
									.slice(offset, offset + PER_PAGE)
									.map((product, index) => {
										return (
											<tr key={index}>
												<td>{product.productid}</td>
												<td>{product.productname}</td>
                                                <td>{product.brandid}</td>
												<td>{product.categoryid}</td>
												
												<td>{product.price}</td>
												<td>{product.quantity}</td>
												
                                                <td>
                                                <img src={product.photo}
                                                    height="60" width="80"/>
                                                </td>
												<td>{product.details}</td>
												<td>{product.vendorid}</td>
												<td>{product.offer}</td>
												<td>{product.url}</td>
												<td>{product.active}</td>
												<td>{product.soldunit}</td>

                                                <td>  <div className="btn btn mb-4 text-white">  
                                                 <Link to="/cataApi/edit"> Edit </Link>
                                                 <div className="btn btn mb-4 bg-info">
                                          <i className="fa fa-trash"> delete </i> 
                                         </div>
                                         </div>
                                         </td>
                                        
												
											</tr>
										);
									})}
							</tbody>
						</table>
						<div className="row">
							<div className="col-lg-12">
								<div className="mb-4 mt-4 text-center p-3 ">
									<ReactPaginate
										previousLabel={'Previous'}
										nextLabel={'Next'}
										breakLabel={'...'}
										pageCount={pageCount}
										marginPagesDisplayed={2}
										pageRangeDisplayed={3}
										onPageChange={handlePageClick}
										containerClassName={'pagination justify-content-center'}
										pageClassName={'page-item'}
										pageLinkClassName={'page-link'}
										previousClassName={'page-item'}
										previousLinkClassName={'page-link'}
										nextClassName={'page-item'}
										nextLinkClassName={'page-link'}
										breakClassName={'page-item'}
										breakLinkClassName={'page-link'}
										activeClassName={'active primary'}
									/>
								</div>
							</div>
						</div>
					</div>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default Productpage;