import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import ProyectoLite from "./ProyectoLite";
import ProveedorLite from "./ProveedorLite";
import Item from "./Item";
import { BACKEND } from "../constants/backend";
import useAuth from "../hooks/useAuth";

const FormNuevoPedido = ({ pedido }) => {
  const [proyecto, setProyecto] = useState([]);
  const [code, setCode] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState([]);
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [number, setNumber] = useState(1);
  const [item, setItem] = useState(0);
  const { auth, cargando } = useAuth();
  const urlActual = location.pathname;

  useEffect(() => {
    const obtainProjectsApi = async () => {
      try {
        const url = `${BACKEND}/api/project`;
        const response = await fetch(url);
        const resultado = await response.json();

        setProyecto(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainProjectsApi();
    const obtainSuppliersApi = async () => {
      try {
        const url = `${BACKEND}/api/supplier`;
        const response = await fetch(url);
        const resultado = await response.json();

        setProveedor(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainSuppliersApi();
    if (pedido?.id > 0) {
      const arrItem = pedido.itemsList;
      arrItem.map((item) => (item.number = 1));
      arrItem.forEach(iterate);
      setItemList(arrItem);
      itemList.forEach(iterate);
    }
  }, []);

  const navigate = useNavigate();

  const newPedidosSchema = Yup.object().shape({
    dateOfIssue: Yup.date("Formato incorrecto."),
    saleCondition: Yup.string().required("La condición de venta es requerida."),
    status: Yup.string().required("El estado es requerido."),
    relevance: Yup.string().required("La relevancia es requerida."),
    //observations: pedido?.observations ?? "",
    //itemsList: pedido?.itemsList ?? "",
    supplier: Yup.number().required("El proveedor es requerido."),
    project: Yup.number().required("El proyecto es requerido."),
  });

  const handleSubmit = async (values) => {
    const varPro = parseInt(values.project);
    const proyectoOk = { id: varPro };
    values.project = proyectoOk;
    values.madeBy = { id: auth.id };
    const varSup = parseInt(values.supplier);
    const supplierOk = { id: varSup };
    values.supplier = supplierOk;
    values.itemsList = itemList;

    console.log(values);

    try {
      let response;
      if (pedido != null) {
        const url = `${BACKEND}/api/quote/${pedido.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = `${BACKEND}/api/quote`;
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
      navigate("/pedidos/listado");
    } catch (error) {
      console.log(itemList);
    }
  };

  function iterate(item, index) {
    const myIndex = index + 1;
    item.number = myIndex;
  }
  const agregarItem = () => {
    itemList.forEach(iterate);
    const item = {
      code,
      number,
      category,
      description,
      size,
      quantity,
    };
    if (itemList.length === 0) {
      setItemList([item]);
      setNumber(number + 1);
    } else {
      setItemList((arr) => [...arr, item]);
      setNumber(number + 1);
    }
    setSize("");
    setDescription("");
    setCategory("");
    setCode("");
    setQuantity("");
  };

  const handleEliminar = (relPos) => {
    const restItem = itemList;
    const pos = relPos - 1;
    restItem.splice(pos, 1);
    console.log(restItem.length);
    setItemList([...restItem]);
    setNumber(restItem.length + 1);
    console.log(number);
    itemList.forEach(iterate);
  };
  const searchItem = async (code) => {
    try {
      const url = `${BACKEND}/api/item?`;
      const response = await fetch(
        url +
          new URLSearchParams({
            "item-code": code,
          })
      );

      const resultado = await response.json();

      setItem(resultado);
      setCategory(resultado.category);
      setDescription(resultado.description);
      setSize(resultado.size);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-6">
      <Formik
        initialValues={{
          dateOfIssue: pedido?.dateOfIssue ?? "",
          saleCondition: pedido?.saleCondition ?? "",
          status: pedido?.status ?? "",
          relevance: pedido?.relevance ?? "",
          observations: pedido?.observations ?? "",
          itemsList: pedido?.itemsList ?? "",
          supplier: pedido?.supplier.id ?? "",
          project: pedido?.project.id ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={newPedidosSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="p-6">
                <div className="bg-gray-700 p-4 rounded-md">
                  <div className="grid grid-cols-2">
                    <div className="pr-3">
                      <label className="text-gray-200" htmlFor="dateOfIssue">
                        Fecha de Emisión:
                      </label>
                      <Field
                        id="dateOfIssue"
                        type="date"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Fecha de Creación del Pedido"
                        name="dateOfIssue"
                      />
                      {errors.dateOfIssue && touched.dateOfIssue ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.dateOfIssue}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3">
                      <label className="text-gray-200" htmlFor="saleCondition">
                        Condición de Compra:
                      </label>
                      <Field
                        id="saleCondition"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Condición de Compra: Ejemplo: Contado/Pago a 30 días."
                        name="saleCondition"
                      />
                      {errors.saleCondition && touched.saleCondition ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.saleCondition}
                        </div>
                      ) : null}
                    </div>
                    <div className="pr-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="status">
                        Estado:
                      </label>
                      <Field
                        id="status"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Estado del Pedido"
                        name="status"
                      />
                      {errors.status && touched.status ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.status}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-3 pt-1.5">
                      <label className="text-gray-200" htmlFor="supplier">
                        Proveedor:
                      </label>
                      <Field
                        as="select"
                        type="number"
                        id="supplier"
                        name="supplier"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                      >
                        <option
                          value=""
                          label="Selecciona un Proveedor"
                        ></option>
                        {proveedor.map((proveedor) => (
                          <ProveedorLite
                            key={proveedor.id}
                            proveedor={proveedor}
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
                      <label className="text-gray-200" htmlFor="relevance">
                        Relevancia:
                      </label>
                      <Field
                        id="relevance"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                        placeholder="Estado del Pedido"
                        name="relevance"
                      />
                      {errors.relevance && touched.relevance ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.relevance}
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
                        {proyecto.map((proyecto) => (
                          <ProyectoLite key={proyecto.id} proyecto={proyecto} />
                        ))}
                      </Field>
                      {errors.project && touched.project ? (
                        <div className="text-red-500 text-sm pt-1">
                          {errors.project}
                        </div>
                      ) : null}
                    </div>
                    <div className="pt-1.5 col-span-2">
                      <label className="text-gray-200" htmlFor="observations">
                        Observaciones:
                      </label>
                      <Field
                        id="observations"
                        as="textarea"
                        type="text"
                        className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md h-24"
                        placeholder="Notas/aclaraciones del proyecto"
                        name="observations"
                      />
                    </div>
                  </div>
                  <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-gray-300">
                      <tr>
                        <th className="p-2 w-20">Item</th>
                        <th className="p-2 w-28">Código</th>
                        <th className="p-2 w-36">Categoria</th>
                        <th className="p-2">Descripción</th>
                        <th className="p-2 w-32">Medida [mm]</th>
                        <th className="p-2 w-24">Cantidad</th>
                        <th className="p-2 w-24">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList.map((item) => (
                        <Item
                          key={item.number}
                          item={item}
                          handleEliminar={handleEliminar}
                          urlActual={urlActual}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-gray-600 pb-2 mt-5 rounded-lg">
                    <div className="grid xl:grid-cols-12 md:grid-cols-4 pr-4">
                      <label
                        className="text-gray-200 text-center pt-3.5"
                        htmlFor="name"
                      >
                        Código:
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          onInput={(e) => setCode(e.target.value)}
                          className="w-full mt-2 text-sm p-1 bg-gray-200 rounded-md"
                          value={code}
                        />
                        <button
                          className="text-white pt-3.5 pl-2"
                          type="button"
                          onClick={() => searchItem(code)}
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
                              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                            />
                          </svg>
                        </button>
                      </div>
                      <label
                        className="text-gray-200 text-center pt-3.5"
                        htmlFor="name"
                      >
                        Categoria:
                      </label>
                      <input
                        type="text"
                        onInput={(e) => setCategory(e.target.value)}
                        className="mt-2 text-sm p-1 bg-gray-200 rounded-md"
                        value={category}
                      />

                      <label className="text-gray-200 text-center pt-3.5">
                        Descripción:
                      </label>
                      <input
                        type="text"
                        onInput={(e) => setDescription(e.target.value)}
                        className="xl:col-span-2 md:col-span-3 mt-2 text-sm block p-1 bg-gray-200 rounded-md"
                        value={description}
                      />
                      <label
                        className="text-gray-200 text-center lg:pt-3.5 md:pt-1"
                        htmlFor="name"
                      >
                        Medida:
                      </label>
                      <input
                        type="text"
                        onInput={(e) => setSize(e.target.value)}
                        className="mt-2 text-center text-sm block p-1 bg-gray-200 rounded-md"
                        value={size}
                      />
                      <label
                        className="text-gray-200 text-center pt-3.5"
                        htmlFor="name"
                      >
                        Cantidad:
                      </label>
                      <input
                        type="number"
                        onInput={(e) => setQuantity(e.target.value)}
                        className="mt-2 text-center text-sm block p-1 bg-gray-200 rounded-md"
                        value={quantity}
                      />
                      <button
                        type="button"
                        onClick={() => agregarItem()}
                        className="ml-2 mt-2 pl-2 md:col-span-4 xl:col-span-1 text-gray-100 font-semibold inline-block w-full py-2 pr-4 text-sm rounded bg-green-700 hover:bg-green-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-green-700"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value={pedido?.id ? "Editar Pedido" : "Agregar Pedido"}
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

export default FormNuevoPedido;
