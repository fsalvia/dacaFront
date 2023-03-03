import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";

import * as Yup from "yup";
import { BACKEND } from "../constants/backend";
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

const NuevaFacturaModal = ({ invoice, reload }) => {
  const [projects, setProjects] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [show, setShow] = useState(false);

  const newInvoiceSchema = Yup.object().shape({
    dateOfIssue: Yup.date().required("La fecha es requerida"),
    type: Yup.string().required("El tipo es requerido."),
    sellPoint: Yup.number().required("El punto de venta es requerido."),
    invoiceNumber: Yup.string().required(
      "El numero de comprobante es requerido."
    ),
    docNum: Yup.string().required("El numero de documento es requerido."),
    denomination: Yup.string().required("La denominacion es requerida."),
    changeType: Yup.number().required("El tipo de cambio es requerido."),
    currency: Yup.string().required("La modaneda es requerida."),
    noTaxesAmount: Yup.number().required(
      "El monto antes de impuestos es requerido."
    ),
    iva: Yup.number().required("El iva es requerido."),
    invoiceAmount: Yup.number().required("El monto final es requerido."),
    saleCondition: Yup.string().required("La condicion de venta es requerida."),
    status: Yup.string().required("El estado es requerido."),
    customer: Yup.number().required("El cliente es requerido."),
    project: Yup.number().required("El proyecto es requerido."),
  });
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
    console.log("asd");
    const varPro = parseInt(values.project);
    const proyectoOk = { id: varPro };
    values.project = proyectoOk;
    const varCus = parseInt(values.customer);
    const customerOk = { id: varCus };
    values.customer = customerOk;
    console.log(values);
    try {
      let response;
      if (invoice != undefined) {
        const url = `${BACKEND}/api/invoice/${invoice.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = `${BACKEND}/api/invoice`;
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      }
      const resultado = await response.json();
      console.log(resultado);
      setShow(false);
      reload();
    } catch (error) {}
  };

  function openButton(condition) {
    if (condition) {
      return (
        <>
          <button
            className="hover:text-yellow-600"
            onClick={() => setShow(true)}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className="hover:text-gray-500 hover:bg-green-300 text-gray-300 bg-green-600 rounded-md"
            onClick={() => setShow(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </>
      );
    }
  }
  return (
    <div>
      {openButton(invoice?.id)}
      <Modal
        isOpen={show}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            invoiceNumber: invoice?.invoiceNumber ?? "",
            dateOfIssue: invoice?.dateOfIssue ?? "",
            type: invoice?.type ?? "",
            sellPoint: invoice?.sellPoint ?? "",
            customer: invoice?.customer ?? "",
            project: invoice?.project ?? "",
            docType: invoice?.docType ?? "",
            docNum: invoice?.docNum ?? "",
            denomination: invoice?.denomination ?? "",
            changeType: invoice?.changeType ?? "",
            currency: invoice?.currency ?? "",
            noTaxesAmount: invoice?.noTaxesAmount ?? "",
            saleCondition: invoice?.saleCondition ?? "",
            status: invoice?.status ?? "",
            purchaseOrder: invoice?.purchaseOrder ?? "",
            invoiceAmount: invoice?.invoiceAmount ?? "",
            iva: invoice?.iva ?? "",
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          validationSchema={newInvoiceSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="p-1">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <div className="grid grid-cols-2 md:grid-rows-8">
                      <div className="pr-3 pt-1.5">
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

                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="lastname">
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
                        <label
                          className="text-gray-200"
                          htmlFor="invoiceNumber"
                        >
                          Número de Comprobante:
                        </label>
                        <Field
                          id="invoiceNumber"
                          type="text"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el número de comprobante"
                          name="invoiceNumber"
                        />
                        {errors.invoiceNumber && touched.invoiceNumber ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.invoiceNumber}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="type">
                          Indique El Tipo:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="type"
                          name="type"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Indique el tipo de Comprobante"
                          ></option>
                          <option
                            value="1 - Factura A"
                            label="Factura A"
                          ></option>
                          <option
                            value="N - Nota de Crédito A"
                            label="Nota de Crédito A"
                          ></option>
                          <option
                            value="6 - Factura B"
                            label="Factura B"
                          ></option>
                          <option
                            value="N - Nota de Crédito B"
                            label="Nota de Crédito B"
                          ></option>
                          <option
                            value="201 - Factura de Crédito Electrónica MyPyMEs (FCE) A"
                            label="Factura de Crédito Electrónica MyPyMEs (FCE) A"
                          ></option>
                          <option
                            value="203 - Nota de Crédito Electrónica MyPyMEs (FCE) A"
                            label="Nota de Crédito Electrónica MyPyMEs (FCE) A"
                          ></option>
                        </Field>
                        {errors.type && touched.type ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.type}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="sellPoint">
                          Punto de Venta:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="type"
                          name="type"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value="1"
                            label="Le Corbusier 3169, B7500 Area de Promoción El Triángulo"
                          ></option>
                        </Field>
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="docType">
                          Documento del Receptor:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="docType"
                          name="docType"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Seleccione el tipo de documento del Receptor"
                          ></option>
                          <option value="CUIT" label="C.U.I.T"></option>
                          <option value="CUIL" label="C.U.I.L"></option>
                          <option value="DNI" label="D.N.I"></option>
                        </Field>
                        {errors.docType && touched.docType ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.docType}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="docNum">
                          Número de Documento:
                        </label>
                        <Field
                          id="docNum"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el numero de CUIT, CUIL o DNI"
                          name="docNum"
                        />
                        {errors.docNum && touched.docNum ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.docNum}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="currency">
                          Moneda:
                        </label>
                        <Field
                          as="select"
                          type="text"
                          id="currency"
                          name="currency"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Seleccione el tipo de documento del Receptor"
                          ></option>
                          <option value="$" label="$ - Pesos"></option>
                          <option value="USD" label="U$D - Dolares"></option>
                        </Field>
                        {errors.currency && touched.currency ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.currency}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="changeType">
                          Tipo de Cambio:
                        </label>
                        <Field
                          id="changeType"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Tipo de cambio para facturas emitidas en USD"
                          name="changeType"
                        />
                        {errors.changeType && touched.changeType ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.changeType}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label
                          className="text-gray-200"
                          htmlFor="noTaxesAmount"
                        >
                          Monto sin Impuestos:
                        </label>
                        <Field
                          id="noTaxesAmount"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el Monto sin impuestos"
                          name="noTaxesAmount"
                        />
                        {errors.noTaxesAmount && touched.noTaxesAmount ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.noTaxesAmount}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label
                          className="text-gray-200"
                          htmlFor="saleCondition"
                        >
                          Condición de Venta:
                        </label>
                        <Field
                          as="select"
                          type="text"
                          id="saleCondition"
                          name="saleCondition"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Seleccione el tipo de documento del Receptor"
                          ></option>
                          <option value="contado" label="Contado"></option>
                          <option
                            value="tarjetaDeDebito"
                            label="Tarjeta de Débito"
                          ></option>
                          <option
                            value="tarjetaDeCredito"
                            label="Tarjeta de Crédito"
                          ></option>
                          <option
                            value="cuentaCorriente"
                            label="Cuenta Corriente"
                          ></option>
                          <option value="cheque" label="Cheque"></option>
                          <option value="ticket" label="Ticket"></option>
                          <option value="otra" label="Otra"></option>
                        </Field>
                        {errors.saleCondition && touched.saleCondition ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.saleCondition}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="status">
                          Monto sin Impuestos:
                        </label>
                        <Field
                          as="select"
                          type="text"
                          id="status"
                          name="status"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Seleccione el estado del comprobante"
                          ></option>
                          <option value="pendiente" label="Pendiente"></option>
                          <option value="paga" label="Paga"></option>
                          <option value="cancelada" label="Cancelada"></option>
                        </Field>
                        {errors.status && touched.status ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.status}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label
                          className="text-gray-200"
                          htmlFor="purchaseOrder"
                        >
                          Orden de Compra:
                        </label>
                        <Field
                          id="purchaseOrder"
                          type="text"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique la Orden de Compra"
                          name="purchaseOrder"
                        />
                        {errors.purchaseOrder && touched.purchaseOrder ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.purchaseOrder}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="iva">
                          Monto IVA:
                        </label>
                        <Field
                          id="iva"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el Monto puro de IVA"
                          name="iva"
                        />
                        {errors.iva && touched.iva ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.iva}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label
                          className="text-gray-200"
                          htmlFor="invoiceAmount"
                        >
                          Monto final del Comprobante:
                        </label>
                        <Field
                          id="invoiceAmount"
                          type="number"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el monton final (IVA incluido)"
                          name="invoiceAmount"
                        />
                        {errors.invoiceAmount && touched.invoiceAmount ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.invoiceAmount}
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
                      value={invoice?.id ? "Editar Factura" : "Agregar Factura"}
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

export default NuevaFacturaModal;
