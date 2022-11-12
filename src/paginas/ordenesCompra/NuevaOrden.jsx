import { useEffect, useState } from "react";
import Pedido from "../../components/Pedido";
import { BACKEND } from "../../constants/backend";
import { useNavigate } from "react-router-dom";
import ProveedorLite from "../../components/ProveedorLite";
import ProyectoLite from "../../components/ProyectoLite";
import Item from "../../components/Item";
import useAuth from "../../hooks/useAuth";

const NuevaOrden = () => {
  const [pedidos, setPedidos] = useState([]);
  const [oCLoad, setOCLoad] = useState([]);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [saleCondition, setSaleCondition] = useState("");
  const [status, setStatus] = useState("");
  const [supplier, setSupplier] = useState("");
  const [relevance, setRelevance] = useState("");
  const [project, setProjet] = useState("");
  const [observations, setObservations] = useState("");
  const [proveedor, setProveedor] = useState([]);
  const [proyecto, setProyecto] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [orden, setOrden] = useState([]);
  const [diaPago, setDiaPago] = useState([]);
  const [metodoPago, setMetodoPago] = useState("Contado/Transferencia");
  const [diaEntrega, setDiaEntrega] = useState([]);
  const [type, setType] = useState("OC");
  const { auth, cargando } = useAuth();

  const navigate = useNavigate();
  const urlActual = location.pathname;
  useEffect(() => {
    const obtainApprovedQuotesApi = async () => {
      try {
        const url = `${BACKEND}/api/quote?status=Aprobado`;
        const response = await fetch(url);
        const resultado = await response.json();
        setPedidos(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainApprovedQuotesApi();
  }, []);
  function handlePrecarga(pedido) {
    const {
      id,
      dateOfIssue,
      saleCondition,
      status,
      relevance,
      observations,
      itemsList,
      supplier,
      project,
    } = pedido;
    const date = dateOfIssue;
    const [day, month, year] = date.split("/");
    const result = [year, month, day].join("-");
    setDateOfIssue(result);
    setSaleCondition(saleCondition);
    setStatus("Pendiente");
    setRelevance(relevance);
    setObservations(observations);
    setSupplier(supplier);
    setProjet(project);
    setItemList(itemsList);
    setDiaEntrega(dateOfIssue);
    setDiaPago(dateOfIssue);
    setOCLoad(pedido);
    const arrItem = pedido.itemsList;
    arrItem.map((item) => (item.number = 1));
    arrItem.forEach(iterate);
    setItemList(arrItem);
  }
  function iterate(item, index) {
    const myIndex = index + 1;
    item.number = myIndex;
  }

  const handleSubmit = async (pedido) => {
    oCLoad.type = type;
    oCLoad.paymentMethod = metodoPago;
    oCLoad.dateOfDelivery = diaEntrega;
    oCLoad.paymentDate = diaPago;
    oCLoad.status = status;
    oCLoad.madeBy = { id: auth.id };
    console.log(oCLoad);
    try {
      let response;
      if (pedido != null) {
        const url = `${BACKEND}/api/purchaseOrder/${pedido.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      } else {
        const url = `${BACKEND}/api/purchaseOrder`;
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(oCLoad),
          headers: {
            "Content-Type": "application/json",
            "Access-Control": "Allow-Origin",
          },
        });
      }
      const resultado = await response.json();
      navigate("/ordenes/listado");
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);
  console.log(itemList);

  function setItemPrice(item, price, currency, iva) {
    const itemPrice = parseFloat(price);
    item.price = itemPrice;
    item.currency = currency;
    item.iva = iva;
    console.log(itemList);
  }

  

  return (
    <>
      <div className="w-full pl-12 pr-8 pt-6">
        <h1 className="font-semibold text-2xl text-white">
          Generar Nueva Orden de Compra
        </h1>
        <p className="mt-2 text-xl text-gray-300">
          Pedidos Aprobados, pendientes de OC
        </p>

        <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Proveedor</th>
              <th className="p-2">Proyecto</th>
              <th className="p-2">Cant. Items</th>
              <th className="p-2">Relevancia</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Observaciones</th>
              <th className="p-2">Cond. Venta</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <Pedido
                key={pedido.id}
                pedido={pedido}
                handlePrecarga={handlePrecarga}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pl-6">
        <div className="p-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="grid grid-cols-4">
              <div className="pr-5">
                <label className="text-gray-200" htmlFor="dateOfIssue">
                  Fecha de Emisión:
                </label>
                <input
                  id="dateOfIssue"
                  type="date"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Fecha de Creación del Pedido"
                  name="dateOfIssue"
                  defaultValue={dateOfIssue}
                  onInput={(e) => setDateOfIssue(e.target.value)}
                />
              </div>
              <div className="pr-5">
                <label className="text-gray-200" htmlFor="saleCondition">
                  Condición de Compra:
                </label>
                <input
                  id="saleCondition"
                  type="text"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Condición de Compra: Ejemplo: Contado/Pago a 30 días."
                  name="saleCondition"
                  value={saleCondition}
                  onInput={(e) => setSaleCondition(e.target.value)}
                />
              </div>
              <div className="pr-5 ">
                <label className="text-gray-200" htmlFor="project">
                  Proyecto:
                </label>
                <select
                  value={project.id}
                  type="number"
                  id="project"
                  name="project"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                >
                  <option value="" label="Selecciona un Proyecto"></option>
                  {proyecto.map((proyecto) => (
                    <ProyectoLite key={proyecto.id} proyecto={proyecto} />
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-200" htmlFor="supplier">
                  Proveedor:
                </label>
                <select
                  type="number"
                  id="supplier"
                  name="supplier"
                  value={supplier.id}
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                >
                  <option value="" label="Selecciona un Proveedor"></option>
                  {proveedor.map((proveedor) => (
                    <ProveedorLite key={proveedor.id} proveedor={proveedor} />
                  ))}
                </select>
              </div>

              <div className="pr-5 pt-1.5">
                <label className="text-gray-200" htmlFor="relevance">
                  Relevancia:
                </label>
                <input
                  id="relevance"
                  type="text"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Estado del Pedido"
                  name="relevance"
                  value={relevance}
                  onInput={(e) => setRelevance(e.target.value)}
                />
              </div>
              <div className="pr-5 pt-1.5">
                <label className="text-gray-200 " htmlFor="status">
                  Estado:
                </label>
                <input
                  id="status"
                  type="text"
                  className="mt-2 text-sm block w-full p-1  bg-gray-200 rounded-md"
                  placeholder="Estado del Pedido"
                  name="status"
                  defaultValue={status}
                  onInput={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="pr-5 pt-1.5">
                <label className="text-gray-200" htmlFor="dateOfIssue">
                  Fecha de Entrega:
                </label>
                <input
                  id="dateOfDelivery"
                  type="date"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Fecha de Entrega del Pedido"
                  name="dateOfDelivery"
                  defaultValue={dateOfIssue}
                  onInput={(e) => setDiaEntrega(e.target.value)}
                />
              </div>
              <div className="pr-5 pt-1.5">
                <label className="text-gray-200" htmlFor="dateOfIssue">
                  Fecha de Pago:
                </label>
                <input
                  id="paymentDate"
                  type="date"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Fecha de Creación del Pedido"
                  name="paymentDate"
                  defaultValue={dateOfIssue}
                  onInput={(e) => setDiaPago(e.target.value)}
                />
              </div>
              <div className="pr-5 pt-1.5">
                <label className="text-gray-200 " htmlFor="status">
                  Metodo de Pago:
                </label>
                <input
                  id="paymentMethod"
                  type="text"
                  className="mt-2 text-sm block w-full p-1  bg-gray-200 rounded-md"
                  placeholder="Estado del Pedido"
                  name="paymentMethod"
                  defaultValue={metodoPago}
                  onInput={(e) => setMetodoPago(e.target.value)}
                />
              </div>
              <div className="pr-5 pt-1.5">
                <label className="text-gray-200 " htmlFor="status">
                  Tipo:
                </label>
                <input
                  id="type"
                  type="text"
                  className="mt-2 text-sm block w-full p-1  bg-gray-200 rounded-md"
                  placeholder="Estado del Pedido"
                  name="type"
                  defaultValue={type}
                  onInput={(e) => setType(e.target.value)}
                />
              </div>
              <div className="pt-1.5 col-span-2">
                <label className="text-gray-200" htmlFor="observations">
                  Observaciones:
                </label>
                <input
                  id="observations"
                  as="textarea"
                  type="text"
                  className="mt-2 text-sm block w-full p-1 bg-gray-200 rounded-md"
                  placeholder="Notas/aclaraciones del proyecto"
                  name="observations"
                  value={observations}
                  onInput={(e) => setObservations(e.target.value)}
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
                  <th className="p-2 w-24">Precio Unitario</th>
                  <th className="p-2 w-24">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item) => (
                  <Item
                    key={item.number}
                    item={item}
                    urlActual={urlActual}
                    setItemPrice={setItemPrice}
                  />
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <input
                onClick={() => handleSubmit()}
                type="submit"
                value={
                  orden?.id
                    ? "Editar Orden de Compra"
                    : "Agregar Orden de Compra"
                }
                className="mt-5 text-gray-100 font-semibold inline-block w-full py-2 pl-8 pr-4 text-sm rounded bg-green-700 hover:bg-green-400 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-green-700"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevaOrden;
