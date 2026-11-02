import type { Project } from "../data";

/** Fake app screenshots drawn with divs, so project cards need no image files. */
export default function Mock({ kind }: { kind: Project["kind"] }) {
  if (kind === "landing")
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-[#eef3ff] to-white p-[6%] text-[#1e3a8a]">
        <div className="flex items-center justify-between text-[9px] font-semibold opacity-70">
          <span>Barangay Connect</span>
          <span className="flex gap-3"><i>Services</i><i>Track</i><i>About</i></span>
        </div>
        <div className="mt-[8%] grid flex-1 grid-cols-[1.3fr_1fr] gap-4">
          <div>
            <p className="text-[clamp(14px,2vw,24px)] font-bold leading-tight">Serbisyo sa barangay, bisan asa ka.</p>
            <p className="mt-2 text-[9px] opacity-60">Request clearances and permits online, pick up when ready.</p>
            <span className="mt-3 inline-block rounded-full bg-[#2563eb] px-3 py-1 text-[9px] text-white">Request now</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Clearance", "Indigency", "Permit", "Residency"].map((t) => (
              <div key={t} className="rounded-lg bg-white p-2 text-[8px] shadow-sm">
                <div className="mb-1 h-4 w-4 rounded bg-[#dbeafe]" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (kind === "dashboard")
    return (
      <div className="flex h-full bg-[#f6f7f9] text-[#111]">
        <div className="w-[18%] bg-white p-3 text-[8px] leading-6 text-black/50">
          <b className="text-black">POS</b>
          <br />Dashboard<br />Sales<br />Stock<br />Utang
        </div>
        <div className="flex-1 p-4">
          <p className="text-[11px] font-bold">Dashboard</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[["Sales", "₱4,820"], ["Items", "126"], ["Low stock", "7"], ["Utang", "₱1,350"]].map(([k, v]) => (
              <div key={k} className="rounded-md bg-white p-2 shadow-sm">
                <p className="text-[7px] text-black/50">{k}</p>
                <p className="text-[11px] font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-[45%] items-end gap-1.5 rounded-md bg-white p-3 shadow-sm">
            {[40, 65, 50, 80, 60, 95, 70, 55, 85, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-[#e3242b]/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );

  if (kind === "mobile")
    return (
      <div className="flex h-full items-center justify-center gap-5 bg-gradient-to-br from-[#0c4a6e] to-[#0e7490]">
        {[0, 1].map((p) => (
          <div key={p} className="h-[82%] w-[24%] rounded-[18px] border-4 border-black/70 bg-white p-2 text-[7px] text-[#0c4a6e] shadow-2xl">
            <p className="font-bold">{p ? "Wind & Waves" : "Tides · Candijay"}</p>
            <svg viewBox="0 0 100 40" className="mt-2 w-full">
              <path d="M0 25 Q 12 5 25 20 T 50 20 T 75 20 T 100 15" fill="none" stroke="#0891b2" strokeWidth="3" />
            </svg>
            {["5:12 AM  High 1.4m", "11:40 AM  Low 0.3m", "6:05 PM  High 1.2m"].map((t) => (
              <p key={t} className="mt-1 rounded bg-[#ecfeff] px-1 py-0.5">{t}</p>
            ))}
          </div>
        ))}
      </div>
    );

  return (
    <div className="h-full bg-white p-4 text-[#111]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold">Libra · Borrowed Books</p>
        <span className="rounded bg-[#16a34a] px-2 py-0.5 text-[8px] text-white">+ Borrow</span>
      </div>
      <table className="mt-3 w-full text-left text-[8px]">
        <thead className="text-black/40">
          <tr><th>Title</th><th>Student</th><th>Due</th><th>Status</th></tr>
        </thead>
        <tbody>
          {[
            ["Noli Me Tangere", "J. Dela Cruz", "Nov 4", "On time"],
            ["Data Structures", "M. Santos", "Nov 1", "Overdue"],
            ["Philippine History", "A. Reyes", "Nov 8", "On time"],
            ["Intro to Java", "K. Lim", "Nov 6", "On time"],
            ["Discrete Math", "R. Tan", "Oct 30", "Overdue"],
          ].map((r) => (
            <tr key={r[0]} className="border-t border-black/5">
              {r.map((c, i) => (
                <td key={i} className={`py-1.5 ${c === "Overdue" ? "text-[#e3242b]" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
