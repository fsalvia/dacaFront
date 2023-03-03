import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { BACKEND } from "../constants/backend";
import { useAxios } from "../hooks/useAxios";
import CustomerLite from "./CustomerLite";
import ProyectoLite from "./ProyectoLite";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#353434",
    borderRadius: "12px",
    width: "40%",
  },
};

const FacturaFilterModal = ({ reload, execute }) => {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [projects, setProjects] = useState([]);
  const [params, setParams] = useState([])

  useEffect(() => {
    const obtainProjectsApi = async () => {
        try {
          const url = `${BACKEND}/api/project?`;
          const response = await fetch(
            url +
              new URLSearchParams({
                page: 0,
                offset: 1000,
              })
          );
          const resultado = await response.json();
  
          setProjects(resultado.items);
        } catch (error) {
          console.log(error);
        }
      };
      obtainProjectsApi();
    const obtainCustomersApi = async () => {
      try {
        const url = `${BACKEND}/api/customer?`;
        const response = await fetch(
          url +
            new URLSearchParams({
              page: 0,
              offset: 1000,
            })
        );
        const resultado = await response.json();

        setCustomer(resultado.items);
      } catch (error) {
        console.log(error);
      }
    };
    obtainCustomersApi();
  }, []);

  const handleSubmit = async (values) => {
    const varCus = parseInt(values.customer);
    if(Number.isNaN(varCus)){
      values.customer = ''
    }else{
      values.customer = varCus
    }
    
    //const varProject = parseInt(values.project);
    //values.project = varProject
    console.log(values);

    execute({
      params: {
        invoiceNumber: values.invoiceNumber,
        customerId: values.customer,
        dateOfIssue: values.dateOfIssue,
        projectId: values.project,
        status: values.status,
        page: 0,
        offset: 15,
      },
    });


    setShow(false);

  };
  return (
    <div>
      <button
        className="hover:text-white bg-yellow-600 rounded-md p-1"
        onClick={() => setShow(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </button>
      <Modal
        isOpen={show}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Formik
        initialValues={{
            invoiceNumber: '',
            customer: '',
            dateOfIssue: '',
            project: '',
            status: '',
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="p-1">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <div className="grid grid-cols-2 md:grid-rows-3">
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="invoiceNumber">
                          Número de Comprobante:
                        </label>
                        <Field
                          id="invoiceNumber"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el numero de comprobante"
                          name="invoiceNumber"
                        />
                        {errors.invoiceNumber && touched.invoiceNumber ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.invoiceNumber}
                          </div>
                        ) : null}
                      </div>

                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="customer">
                          Cliente:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="customer"
                          name="customer"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Selecciona un Cliente"
                          ></option>
                          {customer.map((customer) => (
                            <CustomerLite
                              key={customer.id}
                              customer={customer}
                            />
                          ))}
                        </Field>
                        {errors.customer && touched.customer ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.customer}
                          </div>
                        ) : null}
                      </div>

                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="dateOfIssue">
                          Fecha de Creación:
                        </label>
                        <Field
                          id="dateOfIssue"
                          type="date"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique la fecha de creación"
                          name="dateOfIssue"
                        />
                        {errors.dateOfIssue && touched.dateOfIssue ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.dateOfIssue}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="project">
                          Proyecto:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="project"
                          name="project"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Selecciona un Proyecto"
                          ></option>
                          {projects.map((proyecto) => (
                            <ProyectoLite
                              key={proyecto.id}
                              proyecto={proyecto}
                            />
                          ))}
                        </Field>
                        {errors.project && touched.project ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.project}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="status">
                          Indique el Estado:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="status"
                          name="status"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option value="" label="Indique el Estado"></option>
                          <option value="pendiente" label="Pendiente"></option>
                          <option value="paga" label="Paga"></option>
                        </Field>
                        {errors.status && touched.status ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.status}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly ">
                  <div>
                    <input
                      type="submit"
                      value="Aplicar Filtros"
                      className="mt-5 text-gray-100 font-semibold inline-block w-full py-2 pl-4 pr-4 text-sm rounded bg-green-700 hover:bg-green-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-green-700"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => setShow(false)}
                      className="mt-5 text-gray-100 font-semibold py-2 pl-8 pr-8 text-sm rounded bg-red-600 hover:bg-red-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-red-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default FacturaFilterModal;
