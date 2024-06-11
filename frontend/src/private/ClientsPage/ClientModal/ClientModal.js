import React, { useRef, useState, useEffect } from "react";
import { saveClient } from "../../../services/ClientsService";


/**
 * props:
 * - data
 * - onSubmit
 */
function ClientModal(props) {
  const DEFAULT_CLIENT = {
    id: 0,
    name: "",
    address: "",
    cpf: "",
    rg: "",
    phone: "",
    birth: "",
    email: "",
  };

  const [error, setError] = useState("");

  const [client, setClient] = useState(DEFAULT_CLIENT);

  const btnClose = useRef("");
  const btnSave = useRef("");

  function onSubmit(event) {
    const token = localStorage.getItem("token");
    saveClient(client.id, client, token)
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
    setClient((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  useEffect(() => {
    setClient(props.data);
  }, [props.data.id]);


  useEffect(() => {
    const modal = document.getElementById("modalClient");
    modal.addEventListener("hidden.bs.modal", (event) => {
      setClient({ ...DEFAULT_CLIENT});
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="modalClient"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitleNotify"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title" id="modalTitleNotify">
              {props.data.id ? "Edit " : "New "}Client
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
                        <label htmlFor="name">
                          Client name:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client name"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.name}
                          placeholder="Insert the client name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="address">
                          Client Address:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client Addresss"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.address}
                          placeholder="Insert the client address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="cpf">
                          Client CPF:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client CPF"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="cpf"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.cpf}
                          placeholder="Insert the client CPF"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="rg">
                          Client RG:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client RG"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="text"
                          id="rg"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.rg}
                          placeholder="Insert the client RG"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="phone">
                          Client PHONE:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client PHONE"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.phone}
                          placeholder="Insert the client Phone: +5519123456789"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="birth">
                          Client birth:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client Birth"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="date"
                          id="birth"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.birth}
                          placeholder="Insert the client birth"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="email">
                          Client Email:{" "}
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Client Email"
                            className="badge bg-warning py-1"
                          >
                            ?
                          </span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          onChange={onInputChange}
                          value={client.email}
                          placeholder="Insert the client email"
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

export default ClientModal;
