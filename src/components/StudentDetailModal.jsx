import { AVATAR_COLORS, STANDARD_COLORS, SUBJECT_STYLES } from "../data/users";

// ========== Avatar circle ==========
function Avatar({ initials, size = 56, color }) {
  return (
    <div
      style={{ backgroundColor: color, width: size, height: size }}
      className="rounded-full flex items-center justify-center text-white font-bold tracking-wide shrink-0"
    >
      <span style={{ fontSize: size * 0.34 }}>{initials}</span>
    </div>
  );
}

// ========== Single info row ==========
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

// ========== Main modal ==========
export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  const colorIndex = (student.id - 1) % AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIndex];
  const stdStyle = STANDARD_COLORS[student.standard] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  return (
    // ==== Backdrop ====
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-4
        bg-black/50 backdrop-blur-sm"
    >
      {/* ==== Modal card ==== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl
          overflow-hidden animate-popIn"
      >
        {/* ==== Coloured header band ==== */}
        <div
          style={{ backgroundColor: `${avatarColor}18` }}
          className="px-7 pt-7 pb-5 border-b border-gray-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100
              hover:bg-gray-200 flex items-center justify-center text-gray-500
              hover:text-gray-700 transition text-sm font-bold"
          >
            ✕
          </button>

          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <Avatar initials={student.avatar} size={60} color={avatarColor} />
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                {student.userName}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full
                    ${stdStyle.bg} ${stdStyle.text}`}
                >
                  {student.standard} Standard
                </span>
                <span className="text-xs text-gray-400">
                  🌐 {student.language}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==== Detail rows ==== */}
        <div className="px-7 py-5 flex flex-col gap-3">
          <InfoRow icon="📧" label="Email" value={student.email} />
          <InfoRow icon="📍" label="Address" value={student.address} />

          {/* Subjects */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              📚 Subjects
            </p>
            <div className="flex flex-wrap gap-1.5">
              {student.subjects.map((subject, idx) => (
                <span
                  key={subject}
                  className={`text-xs font-semibold px-3 py-1 rounded-full
                    ${SUBJECT_STYLES[idx % SUBJECT_STYLES.length]}`}
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ==== Footer close button ==== */}
        <div className="px-7 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm
              font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700
              transition active:scale-95"
          >
            Close
          </button>
        </div>
      </div>

      {/* ==== Pop-in animation ==== */}
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.88); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .animate-popIn {
          animation: popIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
