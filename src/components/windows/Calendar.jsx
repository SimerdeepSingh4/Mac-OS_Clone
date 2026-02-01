import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  eachDayOfInterval,
  addDays,
  addMonths,
  subMonths,
  isToday,
  isSameMonth,
  isSameDay,
  isAfter,
} from "date-fns";
import MacWindow from "./MacWindow";
import "./calendar.scss";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ windowName, setWindowState, windowProps }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = addDays(calendarStart, 41); // always 6 weeks = 42 days
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const goPrevMonth = () => setViewDate((d) => subMonths(d, 1));
  const goNextMonth = () => setViewDate((d) => addMonths(d, 1));
  const goToday = () => setViewDate(new Date());

  return (
    <MacWindow
      windowName={windowName}
      setWindowState={setWindowState}
      windowProps={windowProps}
      width="380px"
      height="420px"
    >
      <div className="calendar-window">
        <header className="calendar-header">
          <button
            type="button"
            className="calendar-nav"
            onClick={goPrevMonth}
            aria-label="Previous month"
          >
            ‹
          </button>
          <h2 className="calendar-title">{format(viewDate, "MMMM yyyy")}</h2>
          <button
            type="button"
            className="calendar-nav"
            onClick={goNextMonth}
            aria-label="Next month"
          >
            ›
          </button>
        </header>
        <div className="calendar-toolbar">
          <button type="button" className="calendar-today" onClick={goToday}>
            Today
          </button>
        </div>
        <div className="calendar-grid">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className="calendar-weekday">
              {label}
            </div>
          ))}
          {days.map((day) => {
            const isCurrentMonth = isSameMonth(day, viewDate);
            const isNextMonth = isAfter(day, monthEnd);
            const isTodayDate = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            return (
              <button
                key={day.toISOString()}
                type="button"
                className={`calendar-day ${!isCurrentMonth ? (isNextMonth ? "next-month" : "other-month") : ""} ${isTodayDate ? "today" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
        {selectedDate && (
          <footer className="calendar-footer">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </footer>
        )}
      </div>
    </MacWindow>
  );
};

export default Calendar;
