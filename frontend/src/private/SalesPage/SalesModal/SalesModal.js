import React, { useRef, useState, useEffect } from "react";
import { saveProduct } from "../../../services/ProductsService";


/**
 * props:
 * - data
 * - onSubmit
 */
function SaleModal(props) {
  const DEFAULT_SALE = {
    id: 0,
    productName: "",
    code: "",
    sellPrice: "",
    units: "",
    buyPrice: "",
    ncm: "",
    category: "",
    obs: ""
  };

  const [error, setError] = useState("");

  const [product, setProduct] = useState(DEFAULT_SALE);

  const btnClose = useRef("");
  const btnSave = useRef("");

  function onSubmit(event) {
    const token = localStorage.getItem("token");
    saveProduct(product.id, product, token)
      .then((result) => {
        btnClose.current.click();
        if (props.onSubmit) props.onSubmit(result);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
        setError(err.message);
      });
  }

  function onInputChange(event) {
    setProduct((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  useEffect(() => {
    setProduct(props.data);
  }, [props.data.id]);


  useEffect(() => {
    const modal = document.getElementById("modalProduct");
    modal.addEventListener("hidden.bs.modal", (event) => {
      setProduct({ ...DEFAULT_SALE});
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="modalProduct"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title" id="modalTitleNotify">
              {props.data.id ? "Edit " : "New "}Product
            </p>
            <button
              ref={btnClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="productName">
                          Product Name:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Product Name"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="productName"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.productName}
                          placeholder="Insert the product name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="code">
                          Grid Code:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Grid Code"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="code"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.code}
                          placeholder="Insert the grid code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="sellPrice">
                          Sell Price:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Sell Price"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="sellPrice"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.sellPrice}
                          placeholder="Insert the sell price"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="buyPrice">
                          Buy Price:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Buy Price"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="buyPrice"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.buyPrice}
                          placeholder="Insert the buy price"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="units">
                          Units:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Units"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="units"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.units}
                          placeholder="Insert the number of units"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="ncm">
                          NCM:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="NCM"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="ncm"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.ncm}
                          placeholder="Insert the Product NCM"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="category">
                        Product Category:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Product Category"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="category"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.category}
                          placeholder="Insert the Product Category"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="obs">
                          Observations:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Product Observations"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="obs"
                          className="form-control"
                          onChange={onInputChange}
                          value={product.obs}
                          placeholder="Insert the Product Observations"
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
            </div>
          </div>
          <div className="modal-footer">
            {error ? (
              <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <button
              ref={btnSave}
              type="button"
              className="btn btn-sm btn-primary"
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleModal;
