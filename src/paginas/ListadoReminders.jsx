import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reminder from "../components/Reminder"

const ListadoReminders = ({ cliente }) => {
  const [reminder, setReminder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const obtainRemindersApi = async () => {
      try {
        const url = "http://localhost:8080/api/reminder?";
        const response = await fetch(
          url +
            new URLSearchParams({
              customer: id,
            })
        );

        const resultado = await response.json();

        setReminder(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtainRemindersApi();
  }, []);
  console.log(reminder);
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {reminder.map((reminder) => (
          <Reminder key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
};

export default ListadoReminders;
