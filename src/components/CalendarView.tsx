import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import type { CalendarEvent } from '../types/event';

interface CalendarViewProps {
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
    onDateClick?: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onEventClick, onDateClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const renderCells = () => {
        const cells = [];
        const today = new Date();

        // Empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            cells.push(<div key={`empty-${i}`} className="h-32 bg-gray-50/50 border-r border-b border-gray-100"></div>);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday = today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

            // Filter events for this day
            const dayEvents = events.filter(e => {
                const eDate = new Date(e.start_time);
                return eDate.getDate() === day && eDate.getMonth() === currentDate.getMonth() && eDate.getFullYear() === currentDate.getFullYear();
            });

            cells.push(
                <div
                    key={day}
                    className={`h-32 border-r border-b border-gray-100 p-2 overflow-y-auto hover:bg-gray-50 transition-colors cursor-pointer group ${isToday ? 'bg-blue-50/30' : ''}`}
                    onClick={() => onDateClick && onDateClick(date)}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-crm-navy text-white' : 'text-gray-700 group-hover:text-crm-navy'}`}>
                            {day}
                        </span>
                        {dayEvents.length > 0 && <span className="text-xs text-gray-400 font-medium">{dayEvents.length}</span>}
                    </div>
                    <div className="space-y-1">
                        {dayEvents.map(e => (
                            <div
                                key={e.id}
                                onClick={(ev) => { ev.stopPropagation(); onEventClick(e); }}
                                className={`text-xs p-1.5 rounded border border-l-2 cursor-pointer transition-all hover:scale-[1.02] shadow-sm truncate
                                ${e.type === 'audiencia' ? 'bg-red-50 border-red-200 border-l-red-500 text-red-700' :
                                        e.type === 'reunion' ? 'bg-blue-50 border-blue-200 border-l-blue-500 text-blue-700' :
                                            e.type === 'vencimiento' ? 'bg-amber-50 border-amber-200 border-l-amber-500 text-amber-700' :
                                                'bg-gray-50 border-gray-200 border-l-gray-400 text-gray-700'
                                    }
                            `}
                            >
                                <div className="font-medium truncate">{e.title}</div>
                                <div className="flex items-center text-[10px] opacity-75 mt-0.5">
                                    <Clock size={10} className="mr-0.5" />
                                    {new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return cells;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-crm-navy capitalize">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {renderCells()}
            </div>
        </div>
    );
};

export default CalendarView;
