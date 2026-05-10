import { useApp } from '../lib/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();

  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-navy-500' };

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${colors[toast.type]} text-ivory-100 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] pointer-events-auto toast show`}
        >
          <i className={`fas ${icons[toast.type]}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
