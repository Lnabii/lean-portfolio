// All portfolio content lives here. Projects, awards and numbers are mock data for the class project.

export const profile = {
  first: "LEAN",
  last: "NAIVE",
  logo: ["LN", "NV"],
  age: 20,
  location: "Poblacion, Candijay, Bohol",
  role: "Web & Mobile Developer",
  status: "BSCS 3B Student",
  email: "your.email@example.com", // change before submitting
  bio: "I build web applications from front to back — crafting clean interfaces with React & Next.js and powering them with Laravel and MySQL on the server side. I'm a 20-year-old BSCS 3B student from Poblacion, Candijay, Bohol, and since 2023 I've been turning ideas into working products, from barangay e-services to apps for local businesses. I care about scalable code, smooth user experiences, and solutions that actually help people. Currently exploring mobile development with Flutter.",
};

export const socials = [
  { name: "Instagram", href: "https://instagram.com/" },
  { name: "LinkedIn", href: "https://linkedin.com/" },
  { name: "GitHub", href: "https://github.com/" },
  { name: "Facebook", href: "https://facebook.com/" },
];

const icon = (n: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${n}/${n}-original.svg`;

export const skills = {
  engineer: ["html5", "css3", "javascript", "typescript", "react", "nextjs", "tailwindcss", "php", "laravel", "mysql", "java", "python", "flutter", "firebase"].map(
    (n) => ({ n, src: icon(n) }),
  ),
  tools: ["git", "github", "vscode", "figma", "linux", "vercel", "androidstudio"].map((n) => ({ n, src: icon(n) })),
  soft: ["Problem Solving", "Teamwork", "Communication", "Fast Learner"],
};

export const marquee = ["CLEAN CODE", "SCALABLE SYSTEM", "RESPONSIVE UI", "PROBLEM SOLVER", "FULL-STACK", "MADE IN BOHOL"];

export type Project = {
  title: string;
  kind: "landing" | "dashboard" | "mobile" | "table";
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  result: string;
};

export const projects: Project[] = [
  {
    title: "BARANGAY CONNECT",
    kind: "landing",
    tagline: "Online barangay services for Poblacion",
    description:
      "Residents request barangay clearances, indigency certificates and business permits online, then get a text when the document is ready for pickup.",
    stack: ["Next.js", "Laravel", "MySQL", "Tailwind CSS"],
    role: "Full-stack developer",
    result: "Cut walk-in requests in half during the pilot month.",
  },
  {
    title: "SARI-SARI POS",
    kind: "dashboard",
    tagline: "Sales & inventory dashboard",
    description:
      "A point-of-sale and inventory dashboard for small stores: daily sales, low-stock alerts and customer credit (utang) tracking in one place.",
    stack: ["React", "Firebase", "Chart.js"],
    role: "Frontend developer & UI designer",
    result: "End-of-day counting went from an hour to ten minutes.",
  },
  {
    title: "TIDEWATCH BOHOL",
    kind: "mobile",
    tagline: "Tide & weather app for fishers",
    description:
      "A Flutter app that shows tide tables, wind and weather warnings for the coast of Candijay, made for fishers who go out before sunrise.",
    stack: ["Flutter", "Dart", "OpenWeather API"],
    role: "Mobile developer",
    result: "Tested with fishers in Poblacion and nearby coastal barangays.",
  },
  {
    title: "LIBRA LIBRARY SYSTEM",
    kind: "table",
    tagline: "School library management",
    description:
      "Book catalog, borrowing and returns with barcode scanning and overdue reminders, built as a group project for the school library.",
    stack: ["PHP", "MySQL", "Bootstrap"],
    role: "Team lead & backend developer",
    result: "Replaced the paper logbook for 2,000+ books.",
  },
];

export type Award = { type: "AWARD" | "CERTIFICATE"; title: string; issuer: string; year: string };

export const awards: Award[] = [
  { type: "AWARD", title: "Dean's Lister", issuer: "BSCS · 1st Semester", year: "2025" },
  { type: "AWARD", title: "1st Place — Web Design Contest", issuer: "CS Days 2025", year: "2025" },
  { type: "CERTIFICATE", title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2024" },
  { type: "AWARD", title: "Hackathon Finalist", issuer: "Bohol Youth Innovation Hackathon", year: "2025" },
  { type: "CERTIFICATE", title: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", year: "2025" },
  { type: "CERTIFICATE", title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "2024" },
  { type: "AWARD", title: "Best Systems Project", issuer: "Systems Analysis & Design", year: "2026" },
];
