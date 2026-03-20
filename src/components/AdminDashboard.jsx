import { useState, useMemo } from "react";
import {
  USERS,
  AVATAR_COLORS,
  STANDARD_COLORS,
  SUBJECT_STYLES,
} from "../data/users";
import StudentDetailModal from "./StudentDetailModal";

// ── Avatar circle ────────────────────────────────────────
function Avatar({ initials, size = 36, color }) {
  return (
    <div
      style={{ backgroundColor: color, width: size, height: size }}
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
    >
      <span style={{ fontSize: size * 0.34 }}>{initials}</span>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────
function StatCard({ icon, label, value, bg, text }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${bg}`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-extrabold ${text}`}>{value}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────
export default function AdminDashboard({ user, onLogout }) {
  const students = USERS.filter((u) => u.userType === "student");

  const [searchName, setSearchName] = useState("");
  const [searchSubject, setSearchSubject] = useState("");
  const [selected, setSelected] = useState(null);

  // ── All unique subjects for dropdown ────────────────────
  const allSubjects = useMemo(() => {
    const set = new Set();
    students.forEach((s) => s.subjects.forEach((sub) => set.add(sub)));
    return Array.from(set).sort();
  }, [students]);

  // ========== Filtered list ==========
  const filtered = useMemo(
    () =>
      students.filter((s) => {
        const nameMatch = s.userName
          .toLowerCase()
          .includes(searchName.toLowerCase());
        const subMatch =
          !searchSubject ||
          s.subjects.some((sub) =>
            sub.toLowerCase().includes(searchSubject.toLowerCase()),
          );
        return nameMatch && subMatch;
      }),
    [searchName, searchSubject, students],
  );

  const clearFilters = () => {
    setSearchName("");
    setSearchSubject("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ==== Navbar ==== */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg text-indigo-950 tracking-tight">
              EduPortal
            </span>
            <span
              className="text-[11px] font-bold bg-indigo-100 text-indigo-700
              px-2.5 py-0.5 rounded-full tracking-wide"
            >
              ADMIN
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Avatar
              initials={user.avatar}
              size={34}
              color={AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length]}
            />
            <span className="text-sm font-semibold text-gray-700 hidden sm:block">
              {user.userName}
            </span>
            <button
              onClick={onLogout}
              className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200
                px-4 py-1.5 rounded-lg hover:bg-red-100 transition active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ==== Page body ==== */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ==== Stat cards ==== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="🎓"
            label="Total Students"
            value={students.length}
            bg="bg-indigo-50"
            text="text-indigo-600"
          />
          <StatCard
            icon="📚"
            label="Active Subjects"
            value={allSubjects.length}
            bg="bg-emerald-50"
            text="text-emerald-600"
          />
          <StatCard
            icon="🏫"
            label="Standards Covered"
            value={[...new Set(students.map((s) => s.standard))].length}
            bg="bg-amber-50"
            text="text-amber-600"
          />
        </div>

        {/* ==== Search & filter bar ==== */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100
          px-5 py-4 mb-5 flex flex-wrap gap-3 items-center"
        >
          {/* Search by name */}
          <div className="relative flex-1 min-w-45">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300
                focus:border-indigo-400 transition hover:border-gray-300"
            />
          </div>

          {/* Filter by subject */}
          <div className="relative flex-1 min-w-45">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              📖
            </span>
            <select
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300
                focus:border-indigo-400 transition hover:border-gray-300
                appearance-none cursor-pointer"
            >
              <option value="">All Subjects</option>
              {allSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {(searchName || searchSubject) && (
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-gray-500 bg-gray-100 border border-gray-200
                px-4 py-2.5 rounded-xl hover:bg-gray-200 transition active:scale-95"
            >
              Clear ✕
            </button>
          )}

          {/* Result count */}
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} student{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* ==== Table ==== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table header */}
          <div
            className="grid grid-cols-[2fr_2fr_3fr_1fr_auto] gap-4 px-6 py-3
            bg-slate-50 border-b border-gray-100"
          >
            {["Student", "Email", "Subjects", "Std.", "Action"].map((h) => (
              <span
                key={h}
                className="text-[11px] font-bold uppercase tracking-widest text-gray-400"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-gray-500">No students found</p>
              <p className="text-sm mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            filtered.map((student, idx) => {
              const colorIndex = (student.id - 1) % AVATAR_COLORS.length;
              const avatarColor = AVATAR_COLORS[colorIndex];
              const stdStyle = STANDARD_COLORS[student.standard] ?? {
                bg: "bg-gray-100",
                text: "text-gray-600",
              };

              return (
                <div
                  key={student.id}
                  className={`grid grid-cols-[2fr_2fr_3fr_1fr_auto] gap-4 px-6 py-4
                    items-center transition hover:bg-indigo-50/40
                    ${idx < filtered.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  {/* Name + avatar */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      initials={student.avatar}
                      size={36}
                      color={avatarColor}
                    />
                    <span className="text-sm font-semibold text-gray-800 truncate">
                      {student.userName}
                    </span>
                  </div>

                  {/* Email */}
                  <span className="text-sm text-gray-500 truncate">
                    {student.email}
                  </span>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.slice(0, 3).map((sub, i) => (
                      <span
                        key={sub}
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full
                          ${SUBJECT_STYLES[i % SUBJECT_STYLES.length]}`}
                      >
                        {sub}
                      </span>
                    ))}
                    {student.subjects.length > 3 && (
                      <span className="text-[11px] text-gray-400 font-medium self-center">
                        +{student.subjects.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Standard badge */}
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full
                      ${stdStyle.bg} ${stdStyle.text}`}
                  >
                    {student.standard}
                  </span>

                  {/* Details button */}
                  <button
                    onClick={() => setSelected(student)}
                    className="text-sm font-semibold text-indigo-600 bg-indigo-50
                      border border-indigo-200 px-4 py-1.5 rounded-lg
                      hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                      transition-all active:scale-95 whitespace-nowrap"
                  >
                    Details →
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ==== Detail modal ==== */}
      <StudentDetailModal
        student={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
