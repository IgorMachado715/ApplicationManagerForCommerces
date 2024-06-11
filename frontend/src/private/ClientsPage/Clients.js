import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import ClientsRow from "./ClientsRow";
import {
  getClients,
  deleteClient,
} from "../../services/ClientsService";
import Pagination from "../../components/Pagination/Pagination";
import ClientModal from "./ClientModal/ClientModal";
import Toast from "../../components/Toast/Toast";
import NewClientButton from "./NewClientButton";
import Search from "../../components/Search/Search";


function Clients() {
  const defaultLocation = useLocation();

  const history = useHistory();

  const { name } = useParams();

  const [search, setSearch] = useState(name ? name : "");

  const [clients, setClients] = useState([]);

  const [count, setCount] = useState(0);

  const [page, setPage] = useState(parseInt(getPage()));

  const [notification, setNotification] = useState({ type: "", text: "" });

  const DEFAULT_CLIENT = {
    name: "",
    address: "",
    cpf: "",
    rg: "",
    phone: "",
    birth: "",
    email: "",
  };

  const [editClient, setEditClient] = useState(DEFAULT_CLIENT);

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

  function getClientsCall(token) {
    getClients(search, page || 1, token)
      .then((result) => {
        setClients(result.rows);
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
    getClientsCall(token);
  }, [page, search]);

  function onEditClick(event) {
    const id = event.currentTarget.id.replace("edit", "");
    console.log(id);
    setEditClient(clients.find((c) => c.id == id));
  }

  function onDeleteClick(event) {
    const id = event.currentTarget.id.replace("delete", "");
    console.log(id);
    const token = localStorage.getItem("token");
    deleteClient(id, token)
      .then((client) => {
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

    function onClientSubmit(order) {
        history.go(0);
      }

    function onNewClientClick(event) {
      setEditClient(DEFAULT_CLIENT);
      }

    


  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h2 className="h4">Clients</h2>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <NewClientButton onClick={onNewClientClick} />
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
                <th className="border-gray-200">Name</th>
                <th className="border-gray-200">RG</th>
                <th className="border-gray-200">CPF</th>
                <th className="border-gray-200">Phone</th>
                <th className="border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients && clients.length ? (
                clients.map((client) => (
                  <ClientsRow
                    key={client.id}
                    data={client}
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
      <ClientModal data={editClient} onSubmit={onClientSubmit} />
      <Toast type={notification.type} text={notification.text} />
    </React.Fragment>
  );
}

export default Clients;
