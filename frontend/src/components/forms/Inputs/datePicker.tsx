import { useState, ReactElement, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "../../Icons/calendar";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface DateProps {
  title?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  defaultValue?: Date; // Nueva prop opcional para el valor por defecto
}

export const DateInput: React.FC<DateProps> = ({
  title,
  placeholder,
  register,
  name,
  defaultValue, 
}): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || null); // Usa defaultValue si está disponible
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Efecto para actualizar la fecha seleccionada si cambia el defaultValue
  useEffect(() => {
    if (defaultValue) {
      setSelectedDate(defaultValue);
    }
  }, [defaultValue]);

  // Manejo del cambio de fecha
  const handleDateChange = (
    value: Date | Date[] | null,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
    setShowDatePicker(false); // Cierra el calendario después de seleccionar una fecha
  };

  const toggleDatePicker = (): void => {
    setShowDatePicker(!showDatePicker);
  };

  // Efecto para manejar clics fuera del calendario
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (calendarRef.current && !calendarRef.current.contains(target)) {
        setShowDatePicker(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-[320px] mx-auto">
      <h3 className="text-lg font-bold text-custom_white font-almarai">
        {title}
      </h3>

      <div className="relative w-full max-w-md mx-auto" ref={calendarRef}>
        <input
          type="text"
          {...register(name, {
            required: "La fecha es requerida",
            validate: (val) => !!val || "Debe seleccionar una fecha",
          })}
          className="w-full p-3 transition duration-300 bg-overlay_2 rounded-xl text-custom_white focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary"
          placeholder={placeholder}
          onClick={toggleDatePicker}
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
          readOnly
        />

        {showDatePicker && (
          <div className="absolute left-0 right-0 z-10 mt-2 top-full">
            <Calendar
              value={selectedDate || undefined}
              onChange={(value) => handleDateChange(value as Date | Date[] | null)}
              className="rounded-xl"
            />
          </div>
        )}

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button type="button" onClick={toggleDatePicker}>
            <CalendarIcon size={25} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};
