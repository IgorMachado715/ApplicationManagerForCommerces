import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import ProductsRow from "./ProductsRow";
import {
  getProducts,
  deleteProduct,
} from "../../services/ProductsService";
import Pagination from "../../components/Pagination/Pagination";
import ProductModal from "./ProductModal/ProductModal";
import Toast from "../../components/Toast/Toast";
import NewProductButton from "./NewProductButton";
import Search from "../../components/Search/Search";


function Products() {
  const defaultLocation = useLocation();

  const history = useHistory();

  const { productName } = useParams();

  const [search, setSearch] = useState(productName ? productName : "");

  const [products, setProducts] = useState([]);

  const [count, setCount] = useState(0);

  const [page, setPage] = useState(parseInt(getPage()));

  const [notification, setNotification] = useState({ type: "", text: "" });

  const DEFAULT_PRODUCT = {
    productName: "",
    code: "",
    sellPrice: "",
    units: "",
    buyPrice: "",
    ncm: "",
    category: "",
    obs: ""
  };

  const [editProduct, setEditProduct] = useState(DEFAULT_PRODUCT);

  function getPage(location) {
    if (!location) location = defaultLocation;
    return new URLSearchParams(location.search).get("page");
  }

  useEffect(() => {
    return history.listen((location) => {
      setPage(getPage(location));
    });
  }, [history]);

  function onSearchChange(event) {
    setSearch(event.target.value);
  }

  function getProductsCall(token) {
    getProducts(search, page || 1, token)
      .then((result) => {
        setProducts(result.rows);
        setCount(result.count);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
        setNotification({
          type: "error",
          text: err.response ? err.response.data : err.message,
        });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getProductsCall(token);
  }, [page, search]);

  function onEditClick(event) {
    const id = event.currentTarget.id.replace("edit", "");
    console.log(id);
    setEditProduct(products.find((c) => c.id == id));
  }

  function onDeleteClick(event) {
    const id = event.currentTarget.id.replace("delete", "");
    console.log(id);
    const token = localStorage.getItem("token");
    deleteProduct(id, token)
      .then((product) => {
        history.go(0);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
        setNotification({
          type: "error",
          text: err.response ? err.response.data : err.message,
        });
      });
    }

    function onProductSubmit(order) {
        history.go(0);
      }

    function onNewProductClick(event) {
      setEditProduct(DEFAULT_PRODUCT);
      }

    


  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h2 className="h4">Products</h2>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <NewProductButton onClick={onNewProductClick} />
            </div>
            <div className="btn-group ms-2 ms-lg-3">
              <Search onChange={onSearchChange} placeholder={search} />
            </div>
          </div>
        </div>
        <div className="card card-body border-0 shadow table-wrapper table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="border-gray-200">Grid Code</th>
                <th className="border-gray-200">Size</th>
                <th className="border-gray-200">Qty</th>
                <th className="border-gray-200">Sell Price</th>
                <th className="border-gray-200">Obs</th>
                <th className="border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length ? (
                products.map((product) => (
                  <ProductsRow
                    key={product.id}
                    data={product}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                ))
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </tbody>
          </table>
          <Pagination count={count} />
        </div>
        <Footer />
      </main>
      <ProductModal data={editProduct} onSubmit={onProductSubmit} />
      <Toast type={notification.type} text={notification.text} />
    </React.Fragment>
  );
}

export default Products;
