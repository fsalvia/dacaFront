import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ClienteLite from "./ClienteLite";

const FormuarioNuevoProyecto = ({ proyecto }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtainCustomersApi = async () => {
      try {
        const url = "http://localhost:8080/api/customer";
        const response = await fetch(url);
        const resultado = await response.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainCustomersApi();
  }, []);

  const navigate = useNavigate();

  const newProyectoSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido."),
    address: Yup.string().required("La dirección es requerida."),
    location: Yup.string().required("La localidad es requerida."),
    customer: Yup.number().required("El cliente es requerido."),
    purchaseOrderAmount: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido")
      .required("Al menos un contacto es requerido"),
    mts2: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido"),
    numberOfModules: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido"),
    amountOfAluminum: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido"),
    percentageOfCompletion: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("Formato invalido"),
    purchaseOrderDate: Yup.date("Formato incorrecto.").required(
      "La fecha de OC/Contrato es requerida."
    ),
    startDate: Yup.date("Formato incorrecto."),
    lastCertificationDate: Yup.date("Formato incorrecto."),
  });

  const handleSubmit = async (values) => {
    const varCli = parseInt(values.customer);
    const clienteOk = { id: varCli };
    values.customer = clienteOk;
    try {
      let response;
      if (proyecto != null) {
        const url = `http://localhost:8080/api/project/${proyecto.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = "http://localhost:8080/api/project";
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
      navigate("/Proyectos/listado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-6">
      <Formik
        initialValues={{
          name: proyecto?.name ?? "",
          address: proyecto?.address ?? "",
          location: proyecto?.location ?? "",
          customer: proyecto?.customer.id ?? "",
          purchaseOrderAmount: proyecto?.purchaseOrderAmount ?? "",
          mts2: proyecto?.mts2 ?? "",
          numberOfModules: proyecto?.numberOfModules ?? "",
          amountOfAluminum: proyecto?.amountOfAluminum ?? "",
          percentageOfCompletion: proyecto?.percentageOfCompletion ?? "",
          purchaseOrderDate: proyecto?.purchaseOrderDate ?? "",
          startDate: proyecto?.startDate ?? "",
          lastCertificationDate: proyecto?.lastCertificationDate ?? "",
          notes: proyecto?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={newProyectoSchema}
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
                        placeholder="Nombre del Proyecto"
                        name="name"
                      />
                      {errors.name && touched.name ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3">
                      <label className="text-gray-200" htmlFor="address">
                        Dirección:
                      </label>
                      <Field
                        id="address"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Dirección del Proyecto"
                        name="address"
                      />
                      {errors.address && touched.address ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="location">
                        Localidad:
                      </label>
                      <Field
                        id="location"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Localidad"
                        name="location"
                      />
                      {errors.location && touched.location ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.location}
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
                        <option value="" label="Selecciona un cliente"></option>
                        {clientes.map((cliente) => (
                          <ClienteLite key={cliente.id} cliente={cliente} />
                        ))}
                      </Field>
                      {errors.customer && touched.customer ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.customer}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="purchaseOrderAmount"
                      >
                        Monto OC/Contrato:
                      </label>
                      <Field
                        id="purchaseOrderAmount"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Monto total del contrato/OC"
                        name="purchaseOrderAmount"
                      />
                      {errors.purchaseOrderAmount &&
                      touched.purchaseOrderAmount ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.purchaseOrderAmount}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="mts2">
                        Metros Cuadrados:
                      </label>
                      <Field
                        id="mts2"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Metros cuadrados del Proyecto"
                        name="mts2"
                      />
                      {errors.mts2 && touched.mts2 ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.mts2}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="numberOfModules"
                      >
                        Número de Módulos:
                      </label>
                      <Field
                        id="numberOfModules"
                        type="number"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Cantidad de módulos a fabricar"
                        name="numberOfModules"
                      />
                      {errors.numberOfModules && touched.numberOfModules ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.numberOfModules}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="amountOfAluminum"
                      >
                        Cantidad Aluminio [Tn]:
                      </label>
                      <Field
                        id="amountOfAluminum"
                        type="number"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Total de aluminio a utilizar"
                        name="amountOfAluminum"
                      />
                      {errors.amountOfAluminum && touched.amountOfAluminum ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.amountOfAluminum}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="percentageOfCompletion"
                      >
                        Porcentaje de avance total:
                      </label>
                      <Field
                        id="percentageOfCompletion"
                        type="number"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Porcentaje acumulado de avance"
                        name="percentageOfCompletion"
                      />
                      {errors.percentageOfCompletion &&
                      touched.percentageOfCompletion ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.percentageOfCompletion}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="purchaseOrderDate"
                      >
                        Fecha de OC/Contrato:
                      </label>
                      <Field
                        id="purchaseOrderDate"
                        type="date"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        name="purchaseOrderDate"
                      />
                      {errors.purchaseOrderDate && touched.purchaseOrderDate ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.purchaseOrderDate}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="startDate">
                        Fecha de Inicio:
                      </label>
                      <Field
                        id="startDate"
                        type="date"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        name="startDate"
                      />
                      {errors.startDate && touched.startDate ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.startDate}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label
                        className="text-gray-200"
                        htmlFor="lastCertificationDate"
                      >
                        Fecha de última certificación:
                      </label>
                      <Field
                        id="lastCertificationDate"
                        type="date"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Localidad del Proyecto"
                        name="lastCertificationDate"
                      />
                      {errors.lastCertificationDate &&
                      touched.lastCertificationDate ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.lastCertificationDate}
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
                        placeholder="Notas/aclaraciones del proyecto"
                        name="notes"
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value={
                      proyecto?.name
                        ? "Editar Proyecto"
                        : "Agregar Proyecto"
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

export default FormuarioNuevoProyecto;
