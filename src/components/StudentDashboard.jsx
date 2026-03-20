import { AVATAR_COLORS, STANDARD_COLORS, SUBJECT_STYLES } from "../data/users";

function Avatar({ initials, size = 56, color }) {
  return (
    <div
      style={{ backgroundColor: color, width: size, height: size }}
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0 tracking-wide"
    >
      <span style={{ fontSize: size * 0.34 }}>{initials}</span>
    </div>
  );
}

// ======= Info card ========

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex items-start gap-3">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ======= Main component ========

export default function StudentDashboard({ user, onLogout }) {
  const colorIndex = (user.id - 1) % AVATAR_COLORS.length;
  const avatarColor = AVATAR_COLORS[colorIndex];
  const stdStyle = STANDARD_COLORS[user.standard] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ==== Navbar ==== */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg text-indigo-950 tracking-tight">
              EduPortal
            </span>
            <span
              className="text-[11px] font-bold bg-emerald-100 text-emerald-700
              px-2.5 py-0.5 rounded-full tracking-wide"
            >
              STUDENT
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200
              px-4 py-1.5 rounded-lg hover:bg-red-100 transition active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ==== Page body ==== */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* ==== Profile card ==== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          {/* Coloured banner */}
          <div
            style={{ backgroundColor: `${avatarColor}22` }}
            className="h-28 relative"
          >
            {/* Decorative circles */}
            <div
              style={{ backgroundColor: `${avatarColor}18` }}
              className="absolute -top-6 -right-6 w-36 h-36 rounded-full"
            />
            <div
              style={{ backgroundColor: `${avatarColor}12` }}
              className="absolute -bottom-4 right-20 w-24 h-24 rounded-full"
            />

            {/* Avatar sitting on the banner edge */}
            <div
              className="absolute -bottom-8 left-7
              ring-4 ring-white rounded-full shadow-md"
            >
              <Avatar initials={user.avatar} size={64} color={avatarColor} />
            </div>
          </div>

          {/* Name + badges */}
          <div className="pt-12 px-7 pb-6">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                  {user.userName}
                </h1>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full
                      ${stdStyle.bg} ${stdStyle.text}`}
                  >
                    {user.standard} Standard
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    🌐 {user.language}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    📚 {user.subjects.length} Subject
                    {user.subjects.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* User type pill */}
              <span
                className="text-xs font-bold bg-emerald-50 text-emerald-700
                border border-emerald-200 px-3 py-1 rounded-full"
              >
                🎓 Student
              </span>
            </div>
          </div>
        </div>

        {/* ==== Info grid ==== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <InfoCard icon="📧" label="Email Address" value={user.email} />
          <InfoCard icon="🌐" label="Language" value={user.language} />
          <InfoCard icon="📍" label="Address" value={user.address} />
          <InfoCard
            icon="🏫"
            label="Standard"
            value={`${user.standard} Standard`}
          />
        </div>

        {/* ==== Subjects card ==== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-7 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-gray-800">
              📚 My Subjects
            </h2>
            <span
              className="text-xs font-bold bg-indigo-50 text-indigo-600
              border border-indigo-100 px-3 py-1 rounded-full"
            >
              {user.subjects.length} total
            </span>
          </div>

          {user.subjects.length === 0 ? (
            <p className="text-sm text-gray-400">No subjects assigned yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.subjects.map((subject, idx) => (
                <span
                  key={subject}
                  className={`text-sm font-semibold px-4 py-1.5 rounded-full
                    ${SUBJECT_STYLES[idx % SUBJECT_STYLES.length]}`}
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
