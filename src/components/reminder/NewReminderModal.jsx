import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { useAxios } from "../../hooks/useAxios";
import * as Yup from "yup";
import { BACKEND } from "../../constants/backend";
import ProyectoLite from "../ProyectoLite";
import CustomerLite from "../CustomerLite";
import useAuth from "../../hooks/useAuth";

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

const NewReminderModal = ({ reminder, reload }) => {
  const { auth, cargando } = useAuth();
  const [projects, setProjects] = useState([]);
  const [customer, setCustomer] = useState([]);

  const newReminderSchema = Yup.object().shape({
    project: Yup.string().required("El proyecto es requerido."),
    customer: Yup.number().required("El cliente es requerido."),
    addedDate: Yup.date().required("La fecha de creación es requerida."),
    reminderDate: Yup.date().required("La fecha de recordatorio es requerida."),
    relevance: Yup.string().required("La relevancia es requerida."),
    status: Yup.string().required("El estado es requerido."),
    message: Yup.string().required("El mensaje es requerido."),
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

  const [show, setShow] = useState(false);

  const handleSubmit = async (values) => {
    values.userEntity = { id: auth.id };
    const varPro = parseInt(values.project);
    const proyectoOk = { id: varPro };
    values.project = proyectoOk;
    const varCus = parseInt(values.customer);
    const customerOk = { id: varCus };
    values.customer = customerOk;
    console.log(values);
    try {
      let response;
      if (reminder != undefined) {
        const url = `${BACKEND}/api/reminder/${reminder.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = `${BACKEND}/api/reminder`;
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
      {openButton(reminder?.id)}
      <Modal
        isOpen={show}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            project: reminder?.project.id ?? "",
            customer: reminder?.customer.id ?? "",
            addedDate: reminder?.addedDate ?? "",
            reminderDate: reminder?.reminderDate ?? "",
            relevance: reminder?.relevance ?? "",
            status: reminder?.status ?? "",
            message: reminder?.message ?? "",
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          validationSchema={newReminderSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="p-1">
                  <div className="bg-gray-700 p-4 rounded-md">
                    <div className="grid grid-cols-2 md:grid-rows-4">
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
                        <label className="text-gray-200" htmlFor="addedDate">
                          Fecha de Creación:
                        </label>
                        <Field
                          id="addedDate"
                          type="date"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique la fecha de creación"
                          name="addedDate"
                        />
                        {errors.addedDate && touched.addedDate ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.addedDate}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="reminderDate">
                          Fecha de Aviso:
                        </label>
                        <Field
                          id="reminderDate"
                          type="date"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique la fecha en que desea ser notificado"
                          name="reminderDate"
                        />
                        {errors.reminderDate && touched.reminderDate ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.reminderDate}
                          </div>
                        ) : null}
                      </div>
                      <div className="pr-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="relevance">
                          Indique la Relevancia:
                        </label>
                        <Field
                          as="select"
                          type="number"
                          id="relevance"
                          name="relevance"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        >
                          <option
                            value=""
                            label="Indique la Relevancia"
                          ></option>
                          <option value="baja" label="Baja"></option>
                          <option value="media" label="Media"></option>
                          <option value="alta" label="Alta"></option>
                        </Field>
                        {errors.relevance && touched.relevance ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.relevance}
                          </div>
                        ) : null}
                      </div>
                      <div className="pl-3 pt-1.5">
                        <label className="text-gray-200" htmlFor="status">
                          Estado:
                        </label>
                        <Field
                          id="status"
                          type="text"
                          className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Indique el estado"
                          name="status"
                        />
                        {errors.status && touched.status ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.status}
                          </div>
                        ) : null}
                      </div>
                      <div className=" pt-1.5 col-span-2">
                        <label className="text-gray-200" htmlFor="message">
                          Mensaje:
                        </label>
                        <Field
                          id="message"
                          type="message"
                          className="mt-2 text-sm  block w-full p-1 bg-gray-200 rounded-md"
                          placeholder="Mensaje del aviso"
                          name="message"
                        />
                        {errors.message && touched.message ? (
                          <div className="text-red-500 text-sm pt-1">
                            {errors.message}
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
                      value={
                        reminder?.id
                          ? "Editar Recordatorio"
                          : "Agregar Recordatorio"
                      }
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

export default NewReminderModal;
