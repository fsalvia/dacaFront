import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FormNuevoUsuario = ({ usuario }) => {
  const navigate = useNavigate();

  const newUserSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido."),
    lastname: Yup.string().required("El apellido es requerido."),
    email: Yup.string()
      .email("Email no válido.")
      .required("El E-mail es requerido"),
    username: Yup.string().required("El usuario es requerido."),
    password: Yup.string().required("El usuario es requerido."),
    rol: Yup.string().required("El rol es requerido."),
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (usuario.id) {
        const url =
          import.meta.env.VITE_BACKEND_URL + `/api/users/${usuario.id}`;

        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = import.meta.env.VITE_BACKEND_URL + "/api/users";

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
      navigate("/usuarios/nomina");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-6">
      <Formik
        initialValues={{
          username: usuario?.username ?? "",
          name: usuario?.name ?? "",
          lastname: usuario?.lastname ?? "",
          email: usuario?.email ?? "",
          password: usuario?.password ?? "",
          rol: usuario?.rol ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={newUserSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="p-6">
                <div className="bg-gray-700 p-4 rounded-md">
                  <div className="grid grid-cols-2 md:grid-rows-4">
                    <div className="pr-3">
                      <label className="text-gray-200" htmlFor="name">
                        Nombre:
                      </label>
                      <Field
                        id="name"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Nombre del Usuario"
                        name="name"
                      />
                      {errors.name && touched.name ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3">
                      <label className="text-gray-200" htmlFor="lastname">
                        Apellido:
                      </label>
                      <Field
                        id="lastname"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Apellido del Usuario"
                        name="lastname"
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.lastname}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="username">
                        Usuario:
                      </label>
                      <Field
                        id="username"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Usuario"
                        name="username"
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.username}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="rol">
                        Rol:
                      </label>
                      <Field
                        id="rol"
                        type="tel"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Rol del Usuario"
                        name="rol"
                      />
                      {errors.rol && touched.rol ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.rol}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="password">
                        Password:
                      </label>
                      <Field
                        id="password"
                        type="password"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Indique su Password"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="repPassword">
                        Repite el Password:
                      </label>
                      <Field
                        id="repPassword"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Repita el Password"
                        name="password"
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
                        placeholder="Dirección de Email del Usuario"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value={
                      usuario?.name
                        ? "Editar Usuario"
                        : "Agregar Usuario"
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

export default FormNuevoUsuario;
