import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Formuario = ({ cliente }) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    businessName: Yup.string().required("El nombre es requerido."),
    cuit: Yup.number("El CUIT debe ser numerico.").required(
      "El CUIT es requerido."
    ),
    contactName: Yup.string().required("Al menos un contacto es requerido"),
    telephone: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido")
      .required("El teléfono es requerido."),
    address: Yup.string().required("La dirección es requerida."),
    location: Yup.string().required("La localidad es requerida."),
    email: Yup.string()
      .email("Email no válido.")
      .required("El E-mail es requerido"),
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (cliente.id) {
        const url = `http://localhost:8080/api/customer/${cliente.id}`;

        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = "http://localhost:8080/api/customer";

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
      navigate("/clientes/nomina");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-6">
      <Formik
        initialValues={{
          businessName: cliente?.businessName ?? "",
          cuit: cliente?.cuit ?? "",
          contactName: cliente?.contactName ?? "",
          telephone: cliente?.telephone ?? "",
          address: cliente?.address ?? "",
          whatsApp: cliente?.whatsApp ?? "",
          location: cliente?.location ?? "",
          email: cliente?.email ?? "",
          notes: cliente?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="p-6">
                <div className="bg-gray-700 p-4 rounded-md">
                  <div className="grid grid-cols-2 md:grid-rows-4">
                    <div className="pr-3">
                      <label className="text-gray-200" htmlFor="businessName">
                        Razon Social
                      </label>
                      <Field
                        id="businessName"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Razon Social del Cliente"
                        name="businessName"
                      />
                      {errors.businessName && touched.businessName ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.businessName}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3">
                      <label className="text-gray-200" htmlFor="cuit">
                        C.U.I.T.:
                      </label>
                      <Field
                        id="cuit"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="CUIT del Cliente"
                        name="cuit"
                      />
                      {errors.cuit && touched.cuit ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.cuit}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="contactName">
                        Contacto de Referencia:
                      </label>
                      <Field
                        id="contactName"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Contacto/representante de la firma"
                        name="contactName"
                      />
                      {errors.contactName && touched.contactName ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.contactName}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="telephone">
                        Teléfono:
                      </label>
                      <Field
                        id="telephone"
                        type="tel"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Teléfono del Cliente"
                        name="telephone"
                      />
                      {errors.telephone && touched.telephone ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.telephone}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="address">
                        Dirección:
                      </label>
                      <Field
                        id="address"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Dirección del Cliente"
                        name="address"
                      />
                      {errors.address && touched.address ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="whatsApp">
                        whatsApp:
                      </label>
                      <Field
                        id="whatsApp"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="WhatsApp del Cliente"
                        name="whatsApp"
                      />
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="email">
                        E-mail:
                      </label>
                      <Field
                        id="email"
                        type="email"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Dirección de Email del Cliente"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="location">
                        Localidad:
                      </label>
                      <Field
                        id="location"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Localidad del Cliente"
                        name="location"
                      />
                      {errors.location && touched.location ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.location}
                        </div>
                      ) : null}
                    </div>
                    <div className="pt-1.5 col-span-2">
                      <label className="text-gray-200" htmlFor="notes">
                        Notas:
                      </label>
                      <Field
                        id="notes"
                        as="textarea"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md h-40"
                        placeholder="Localidad del Cliente"
                        name="notes"
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value={
                      cliente?.businessName
                        ? "Editar Cliente"
                        : "Agregar Cliente"
                    }
                    className="mt-5 text-gray-100 font-semibold inline-block w-full py-2 pl-8 pr-4 text-sm rounded bg-green-700 hover:bg-green-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-green-700"
                  />
                  <div></div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formuario.defaultProps = {
  cliente: {},
};

export default Formuario;
