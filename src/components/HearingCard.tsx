import Icon from './common/Icon';
import type { Hearing } from '../types/dashboard';

const HearingCard: React.FC<{ hearing: Hearing }> = ({ hearing }) => {
    return (
        <div className={`p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 border-l-4 ${hearing.isToday ? 'border-l-primary' : 'border-l-slate-500'
            } hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group shadow-sm`}>
            <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {hearing.fecha} • {hearing.hora}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${hearing.isToday ? 'text-primary bg-primary/10' : 'text-slate-500 bg-slate-500/10'
                    }`}>
                    {hearing.sala}
                </span>
            </div>
            <h4 className="font-bold text-sm mb-1 truncate text-slate-900 dark:text-white">{hearing.titulo}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">{hearing.unidadJudicial}</p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img alt={hearing.juez} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover" src={hearing.juezAvatar} />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate text-slate-900 dark:text-white">{hearing.juez}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{hearing.juezCargo}</p>
                </div>
                <button className={`${hearing.tipo === 'presencial' ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    } p-2 rounded-lg transition-colors group-hover:scale-105 flex items-center justify-center`}>
                    <Icon
                        name={hearing.tipo === 'presencial' ? 'location_on' : 'videocam'}
                        size={18}
                    />
                </button>
            </div>
        </div>
    );
};

export default HearingCard;
