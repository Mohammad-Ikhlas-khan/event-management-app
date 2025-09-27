import React, { useState, useEffect } from "react"
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { signOut} from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom"

const locales = {
  "en-US": enUS
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})



function CalendarPage() {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
    const parsedEvents = JSON.parse(storedEvents)
    if (Array.isArray(parsedEvents)) {
      setEvents(
        parsedEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      )
    }
  } else {
    localStorage.setItem("events", JSON.stringify([]))
  }
  }, [])

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.setItem("justSignedOut", "true");
        navigate("/") // redirect to home page
      })
      .catch((err) => {
        console.error("Error signing out:", err)
      })
  }

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter event title:")
    if (title) {
      const newEvent = { start, end, title }
      setEvents([...events, newEvent])
    }
  }

  return (
    <div className="flex flex-col items-center p-4 h-screen bg-gray-50">
       <header className="flex w-full justify-between items-center p-4 bg-richblack-500 shadow">
          <h1 className="text-xl font-bold text-center">My Calendar</h1>
            <button
              onClick={handleSignOut}
              className="m-4 p-2 bg-blue-500 text-white rounded"
            >
              Sign Out
            </button>
        </header>
      
       <main className="flex-grow p-4 w-full">
     <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={['month', 'week', 'day']} // enable month, week, and day views
        defaultView="week"               // default to week view if desired
        className="bg-white shadow rounded"
      />
      </main>
    </div>
  )
}

export default CalendarPage