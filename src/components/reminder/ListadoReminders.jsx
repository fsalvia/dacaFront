import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND } from "../../constants/backend";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../Spinner";
import FooterTable from "../table/FooterTable";
import Reminder from "./Reminder";

const ListadoReminders = ({ cliente, user, reminders, handleRefresh, handlerPage, pagination }) => {
  const [reminder, setReminder] = useState([]);
  const { id } = useParams();

  const { data, error, loading, execute } = useAxios({
    url: `/api/reminder`,
    method: "GET",
    params: { userId: user.id, page: 0, offset: 8 },
  });

  if (loading) return <Spinner></Spinner>;

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {reminders.map((reminder) => (
          <Reminder
            key={reminder.id}
            reminder={reminder}
            handleRefresh={handleRefresh}
          />
        ))}
      </div>
      {pagination && (
        <FooterTable
          className="bg-gray-700"
          totalPage={pagination.totalPages}
          actualPage={pagination.actualPage}
          changePage={pagination.handlerChangePage}
        />
      )}
    </div>
  );
};

export default ListadoReminders;
