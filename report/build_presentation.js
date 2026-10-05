const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/8f473586-b13f-41d1-b870-3ec6293e1fd7_b9f040c8-64e7-445e-88b2-80c0bf8bdb62/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "deck.pptx";

const HEX = {
  dark: "17323D", teal: "1F4E5F", light: "F3F6F7", white: "FFFFFF",
  orange: "E07A2F", muted: "5B6B73", tealSoft: "DCE8EB", line: "C9D6DA",
};
const THEME = {
  name: "Course Registration",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2328", lt1: "FFFFFF", dk2: HEX.teal, lt2: HEX.light,
    accent1: HEX.teal, accent2: HEX.orange, accent3: "3A8C8C", accent4: HEX.muted,
    accent5: HEX.tealSoft, accent6: HEX.dark, hlink: HEX.teal, folHlink: HEX.muted,
  },
};

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.title = "Course Management & Registration System";
  pres.author = "Student";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  // ---------- Layouts ----------
  pres.defineSlideMaster({
    title: "DARK_TITLE",
    background: { color: HEX.dark },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.55, w: 8.8, h: 1.5, fontSize: 40, bold: true, color: C.background1, valign: "top", align: "left", fontFace: THEME.headFontFace }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.1, w: 8.8, h: 0.9, fontSize: 18, color: C.accent5, valign: "top" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: HEX.white },
    margin: [0.5, 0.5, 0.5, 0.5],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9.0, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: "middle", align: "left", margin: 0, fontFace: THEME.headFontFace }, text: "" } },
      { text: { text: "Course Management & Registration System", options: { x: 0.5, y: 5.2, w: 6, h: 0.3, fontSize: 10, color: C.accent4, margin: 0 } } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 10, color: HEX.muted, align: "right" },
  });

  const shadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 90, color: "000000", opacity: 0.12 });
  let n = 0;
  const name = (s) => `${s}_${++n}`;

  // Card with an icon in a coloured circle
  async function iconCircle(slide, Comp, x, y, d, bg, fg) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" }, objectName: name("icon-bg") });
    const pad = d * 0.25;
    slide.addImage({ data: await icon(Comp, fg), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, objectName: name("icon") });
  }
  function card(slide, x, y, w, h, fill = C.background2) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { type: "none" }, objectName: name("card") });
  }
  const T = (slide, text, o) => slide.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", objectName: name("text") }, o));

  // ================= 1. Title =================
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: "Opening" });
  T(s, "DESCRIBE A PROJECT WHICH I HAVE WORKED ON", { x: 0.7, y: 1.0, w: 8.7, h: 0.4, fontSize: 13, bold: true, color: C.accent2, charSpacing: 2 });
  s.addText("Course Management & Registration System", { placeholder: "title" });
  s.addText("A full-stack web app that helps students register for classes, and helps the academic office run them", { placeholder: "body" });
  T(s, "Your Name  ·  Student ID  ·  Course Name", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  await iconCircle(s, fa.FaGraduationCap, 8.35, 0.55, 1.0, HEX.teal, HEX.orange);
  s.addNotes("Good morning everyone. Today I'd like to describe a project I have worked on: a Course Management and Registration System. It is a full-stack web application that lets students register for their classes online, and lets the academic office manage courses, semesters and class sections.");

  // ================= 2. Agenda =================
  pres.addSection({ title: "Context" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("What I will talk about", { placeholder: "title" });
  const agenda = [
    ["01", "The problem", "Why course registration is harder than it looks"],
    ["02", "The solution", "Features, technology and architecture"],
    ["03", "The hard part", "Business rules, race conditions and timetable clashes"],
    ["04", "The journey", "How I built it, challenges and lessons learned"],
  ];
  agenda.forEach(([num, head, sub], i) => {
    const x = 0.5 + i * 2.3, y = 1.5;
    card(s, x, y, 2.1, 3.1);
    T(s, num, { x: x + 0.25, y: y + 0.3, w: 1.6, h: 0.8, fontSize: 40, bold: true, color: C.accent2, fontFace: THEME.headFontFace });
    T(s, head, { x: x + 0.25, y: y + 1.2, w: 1.7, h: 0.5, fontSize: 18, bold: true, color: C.text2 });
    T(s, sub, { x: x + 0.25, y: y + 1.8, w: 1.7, h: 1.1, fontSize: 14, color: C.text1 });
  });
  s.addNotes("My presentation has four parts. First, the problem. Second, the solution: the features, the technologies and the architecture. Third, the most interesting technical part, the business rules. And finally, how I built it and what I learned.");

  // ================= 3. Problem =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("Registration day is stressful", { placeholder: "title" });
  const probs = [
    [fa.FaUsers, "Limited seats", "Hundreds of students compete for the last seats in the same minute"],
    [fa.FaCalendarTimes, "Timetable clashes", "Two classes at the same time are easy to miss"],
    [fa.FaClock, "Strict time windows", "Registration and cancellation are only open for a few days"],
    [fa.FaClipboardList, "Manual admin work", "Courses, rooms and sections are often managed in spreadsheets"],
  ];
  for (let i = 0; i < probs.length; i++) {
    const [ic, head, sub] = probs[i];
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6, y = 1.35 + row * 1.85;
    card(s, x, y, 4.4, 1.6);
    await iconCircle(s, ic, x + 0.3, y + 0.4, 0.8, HEX.teal, HEX.white);
    T(s, head, { x: x + 1.35, y: y + 0.3, w: 2.85, h: 0.4, fontSize: 18, bold: true, color: C.text2 });
    T(s, sub, { x: x + 1.35, y: y + 0.75, w: 2.85, h: 0.75, fontSize: 14, color: C.text1 });
  }
  s.addNotes("Why did I choose this project? Every semester, students rush to register when the window opens. Seats are limited, so many students try to take the last seat at the same time. It is easy to choose two classes that clash. The time window is short. And on the other side, staff often manage everything with spreadsheets. I wanted to build a system that solves these problems properly.");

  // ================= 4. Goals + numbers =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("The project at a glance", { placeholder: "title" });
  const stats = [["2", "portals", "student & admin"], ["8", "database tables", "MySQL 8"], ["9", "business rules", "BR01 – BR09"], ["3", "containers", "Docker, one command"]];
  stats.forEach(([big, label, sub], i) => {
    const x = 0.5 + i * 2.3;
    T(s, big, { x, y: 1.35, w: 2.1, h: 1.0, fontSize: 60, bold: true, color: C.accent2, fontFace: THEME.headFontFace });
    T(s, label, { x, y: 2.4, w: 2.1, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    T(s, sub, { x, y: 2.8, w: 2.1, h: 0.35, fontSize: 13, color: C.accent4 });
  });
  card(s, 0.5, 3.55, 9.0, 1.3, C.accent5);
  T(s, [
    { text: "My goal: ", options: { bold: true, color: C.text2 } },
    { text: "a working system where registration rules are enforced on the server, so the data stays correct even when many students click “Register” at the same moment.", options: { color: C.text1 } },
  ], { x: 0.8, y: 3.75, w: 8.4, h: 0.95, fontSize: 16, valign: "middle" });
  s.addNotes("Here is the project at a glance. There are two portals, one for students and one for administrators. The database has eight tables. I defined nine business rules for registration and cancellation. And the whole system runs in three Docker containers. My main goal was correctness: the server must enforce the rules, even when many students register at the same moment.");

  // ================= 5. Features =================
  pres.addSection({ title: "Solution" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("Two portals, one system", { placeholder: "title" });
  const portals = [
    [fa.FaUserGraduate, "Student portal", ["Personal information", "One-click course registration and cancellation", "Weekly timetable (odd / even weeks)", "Grade lookup and GPA"], HEX.teal],
    [fa.FaUserCog, "Admin portal", ["Course management and prerequisites", "Semesters and registration windows", "Class sections, lecturers and rooms", "Schedules and registration tracking"], HEX.orange],
  ];
  for (let i = 0; i < 2; i++) {
    const [ic, head, items, col] = portals[i];
    const x = 0.5 + i * 4.6, y = 1.3;
    card(s, x, y, 4.4, 3.6);
    await iconCircle(s, ic, x + 0.3, y + 0.3, 0.75, col, HEX.white);
    T(s, head, { x: x + 1.25, y: y + 0.45, w: 2.9, h: 0.45, fontSize: 20, bold: true, color: C.text2 });
    T(s, items.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < items.length - 1 } })),
      { x: x + 0.35, y: y + 1.3, w: 3.8, h: 2.1, fontSize: 15, color: C.text1, paraSpaceAfter: 8 });
  }
  s.addNotes("The system has two portals. Students can see their information, register for or cancel classes with one click, view a weekly timetable, and check their grades. Administrators manage courses, semesters, class sections and schedules, and they can track registrations. Both portals share one login, and the token decides which portal opens. I also added a dark mode.");

  // ================= 6. Tech stack =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("Technology stack", { placeholder: "title" });
  const stack = [
    [fa.FaReact, "Frontend", "React 19\nVite\nReact Router\nCustom CSS + dark mode"],
    [fa.FaNodeJs, "Backend", "Node.js + Express\nSequelize ORM\nexpress-validator"],
    [fa.FaDatabase, "Database", "MySQL 8\nutf8mb4 for Vietnamese\nIndexes + constraints"],
    [fa.FaDocker, "DevOps", "Docker Compose\nNginx\nnpm workspaces"],
  ];
  for (let i = 0; i < stack.length; i++) {
    const [ic, head, body] = stack[i];
    const x = 0.5 + i * 2.3, y = 1.35;
    card(s, x, y, 2.1, 3.5);
    await iconCircle(s, ic, x + 0.6, y + 0.3, 0.9, HEX.teal, HEX.white);
    T(s, head, { x: x + 0.15, y: y + 1.35, w: 1.8, h: 0.4, fontSize: 18, bold: true, color: C.text2, align: "center" });
    T(s, body, { x: x + 0.2, y: y + 1.85, w: 1.7, h: 1.5, fontSize: 14, color: C.text1, align: "center", paraSpaceAfter: 4 });
  }
  s.addNotes("For the technology: the frontend uses React with Vite and React Router. The backend is Node.js with Express, and I used the Sequelize ORM to talk to a MySQL 8 database. For security I used JWT tokens and bcrypt password hashing. And everything is packaged with Docker Compose, with Nginx serving the frontend.");

  // ================= 7. Architecture =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("Layered architecture", { placeholder: "title" });
  // client
  const box = (x, y, w, h, fill, txt, color, size = 15) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { type: "none" }, shadow: shadow(), objectName: name("box") });
    T(s, txt, { x, y, w, h, fontSize: size, bold: true, color, align: "center", valign: "middle" });
  };
  box(0.5, 2.45, 1.9, 1.0, HEX.teal, "React Client", C.background1, 16);
  box(7.6, 2.45, 1.9, 1.0, HEX.teal, "MySQL 8", C.background1, 16);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.2, y: 1.25, w: 3.6, h: 3.75, rectRadius: 0.1, fill: { color: HEX.light }, line: { color: HEX.line, width: 1, dashType: "dash" }, objectName: name("api-frame") });
  T(s, "Express API", { x: 3.2, y: 1.32, w: 3.6, h: 0.35, fontSize: 14, bold: true, color: C.text2, align: "center" });
  const layers = [["Routes", "map URLs to controllers"], ["Middleware", "JWT · roles · validation"], ["Controllers", "read request, send response"], ["Services", "business rules BR01–BR09"], ["Models", "Sequelize ↔ MySQL tables"]];
  layers.forEach(([h, d], i) => {
    const y = 1.75 + i * 0.63;
    const isSvc = h === "Services";
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.4, y, w: 3.2, h: 0.53, rectRadius: 0.06, fill: { color: isSvc ? HEX.orange : HEX.white }, line: { color: isSvc ? HEX.orange : HEX.line, width: 1 }, objectName: name("layer") });
    T(s, [{ text: h + "  ", options: { bold: true } }, { text: d, options: { fontSize: 12 } }],
      { x: 3.55, y, w: 3.0, h: 0.53, fontSize: 14, color: isSvc ? C.background1 : C.text2, valign: "middle" });
  });
  s.addShape(pres.shapes.LINE, { x: 2.45, y: 2.95, w: 0.7, h: 0, line: { color: HEX.muted, width: 2, endArrowType: "triangle" }, objectName: name("arrow") });
  s.addShape(pres.shapes.LINE, { x: 6.85, y: 2.95, w: 0.7, h: 0, line: { color: HEX.muted, width: 2, endArrowType: "triangle" }, objectName: name("arrow") });
  T(s, "JSON + JWT", { x: 0.5, y: 3.6, w: 1.9, h: 0.3, fontSize: 12, color: C.accent4, align: "center" });
  T(s, "SQL", { x: 7.6, y: 3.6, w: 1.9, h: 0.3, fontSize: 12, color: C.accent4, align: "center" });
  s.addNotes("This is the architecture. The React client sends JSON requests with a JWT token to the Express API. Inside the API there are five layers, and each layer has one job. Routes map URLs to controllers. Middleware checks the token, the user's role and the input. Controllers handle the request and response. Services, highlighted in orange, contain the business rules. And models map objects to MySQL tables. This separation made the code much easier to change.");

  // ================= 8. Database =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("Database design: 8 tables", { placeholder: "title" });
  const ent = (x, y, label, hi) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 1.45, h: 0.55, rectRadius: 0.06, fill: { color: hi ? HEX.orange : HEX.teal }, line: { type: "none" }, objectName: name("entity") });
    T(s, label, { x, y, w: 1.45, h: 0.55, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle" });
  };
  const ln = (x, y, w, h, flipV) => s.addShape(pres.shapes.LINE, { x, y, w, h, flipV: !!flipV, line: { color: HEX.muted, width: 1.5 }, objectName: name("rel") });
  ent(0.5, 1.4, "courses"); ent(0.5, 3.4, "semesters"); ent(2.6, 2.4, "sections", true);
  ent(4.6, 1.4, "schedules"); ent(4.6, 3.4, "enrollments", true); ent(4.6, 4.3, "students");
  ln(1.95, 1.68, 0.65, 0.95); ln(1.95, 2.95, 0.65, 0.73, true);
  ln(4.05, 1.68, 0.55, 0.95, true); ln(4.05, 2.68, 0.55, 1.0);
  ln(5.32, 3.95, 0, 0.35);
  T(s, "+ admins, results", { x: 0.5, y: 4.4, w: 3.6, h: 0.35, fontSize: 12, color: C.accent4, italic: true });
  card(s, 6.5, 1.3, 3.0, 3.6);
  T(s, "Safety nets in the database", { x: 6.7, y: 1.45, w: 2.65, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
  const nets = ["UNIQUE (student, section) stops duplicate sign-ups", "CHECK current ≤ max students", "Scores must be 0 – 10", "Indexes on foreign keys and status"];
  T(s, nets.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < nets.length - 1 } })),
    { x: 6.7, y: 2.0, w: 2.65, h: 2.75, fontSize: 14, color: C.text1, paraSpaceAfter: 8 });
  s.addNotes("The database has eight tables. A course can be opened as several sections in a semester. Each section has schedules, meaning the day and periods it meets. Students register for sections through the enrollments table. I didn't rely only on code: the database also has safety nets. A unique index prevents duplicate registrations, and a check constraint ensures a class never has more students than seats.");

  // ================= 9. Business rules =================
  pres.addSection({ title: "Hard part" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Hard part" });
  s.addText("Nine rules behind every registration", { placeholder: "title" });
  const rules = [
    ["BR01", "No duplicate registration"], ["BR02", "Section must have seats"], ["BR03", "Only inside the registration window"],
    ["BR04", "No timetable clashes"], ["BR05", "Suspended students are blocked"], ["BR06", "Section must be open"],
    ["BR07", "Cancel only inside the window"], ["BR08", "Seat counter updates automatically"], ["BR09", "Cancellations are kept (soft delete)"],
  ];
  rules.forEach(([code, txt], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05, y = 1.3 + row * 1.2;
    const hi = code === "BR02" || code === "BR04";
    card(s, x, y, 2.9, 1.0, hi ? C.accent5 : C.background2);
    T(s, code, { x: x + 0.2, y: y + 0.12, w: 2.5, h: 0.35, fontSize: 14, bold: true, color: hi ? C.accent2 : C.text2 });
    T(s, txt, { x: x + 0.2, y: y + 0.47, w: 2.6, h: 0.45, fontSize: 14, color: C.text1 });
  });
  s.addNotes("Before writing code, I wrote down nine business rules. Rules one to six apply when a student registers: no duplicates, the class must have seats, it must be inside the registration window, there must be no timetable clash, the student must not be suspended, and the class must be open. Rules seven to nine apply to cancellation. The two highlighted rules, two and four, were the hardest, so let me explain them.");

  // ================= 10. Race condition =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Hard part" });
  s.addText("Challenge 1: the last seat", { placeholder: "title" });
  // left: problem
  card(s, 0.5, 1.3, 4.4, 3.6);
  T(s, "Without protection", { x: 0.75, y: 1.45, w: 3.9, h: 0.4, fontSize: 18, bold: true, color: C.accent2 });
  const steps1 = ["Student A reads: 1 seat left", "Student B reads: 1 seat left", "Both are registered", "Class is over-full: 41 / 40"];
  steps1.forEach((t, i) => {
    const y = 2.0 + i * 0.68;
    s.addShape(pres.shapes.OVAL, { x: 0.75, y, w: 0.45, h: 0.45, fill: { color: i === 3 ? HEX.orange : HEX.muted }, line: { type: "none" }, objectName: name("step") });
    T(s, String(i + 1), { x: 0.75, y, w: 0.45, h: 0.45, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle" });
    T(s, t, { x: 1.4, y, w: 3.3, h: 0.45, fontSize: 15, color: C.text1, valign: "middle", bold: i === 3 });
  });
  // right: solution
  card(s, 5.1, 1.3, 4.4, 3.6, C.accent5);
  T(s, "My solution", { x: 5.35, y: 1.45, w: 3.9, h: 0.4, fontSize: 18, bold: true, color: C.text2 });
  const sol = [
    ["Transaction", "all checks and the insert succeed together, or nothing changes"],
    ["Row lock", "SELECT … FOR UPDATE makes Student B wait for Student A"],
    ["Atomic counter", "seat count is incremented inside the database"],
  ];
  sol.forEach(([h, d], i) => {
    const y = 2.0 + i * 0.95;
    T(s, [{ text: h, options: { bold: true, color: C.text2, breakLine: true } }, { text: d, options: { color: C.text1 } }],
      { x: 5.35, y, w: 3.95, h: 0.85, fontSize: 14 });
  });
  s.addNotes("The first challenge is the last seat. Imagine a class with forty seats and thirty-nine students. Student A and Student B click Register at the same moment. Both read 'one seat left', both get registered, and now the class has forty-one students. To fix this, I run the whole registration inside a database transaction, and I lock the section's row. Student B has to wait until Student A finishes, and then B correctly sees that the class is full.");

  // ================= 11. Timetable conflict =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Hard part" });
  s.addText("Challenge 2: timetable clashes", { placeholder: "title" });
  T(s, "Two classes clash only if all three conditions are true", { x: 0.5, y: 1.2, w: 9, h: 0.4, fontSize: 16, color: C.accent4 });
  const conds = [
    [fa.FaCalendarDay, "Same day", "Both meet on, for example, Monday"],
    [fa.FaStream, "Periods overlap", "start A ≤ end B  and  end A ≥ start B"],
    [fa.FaExchangeAlt, "Weeks match", "An odd-week class never clashes with an even-week class"],
  ];
  for (let i = 0; i < 3; i++) {
    const [ic, h, d] = conds[i];
    const x = 0.5 + i * 3.05;
    card(s, x, 1.8, 2.9, 2.2);
    await iconCircle(s, ic, x + 0.25, 2.05, 0.7, HEX.teal, HEX.white);
    T(s, h, { x: x + 0.25, y: 2.9, w: 2.5, h: 0.4, fontSize: 17, bold: true, color: C.text2 });
    T(s, d, { x: x + 0.25, y: 3.3, w: 2.5, h: 0.65, fontSize: 13, color: C.text1 });
  }
  card(s, 0.5, 4.2, 9.0, 0.7, C.accent5);
  T(s, [{ text: "Result: ", options: { bold: true, color: C.text2 } }, { text: "HTTP 409 Conflict plus the name of the clashing class, so the student knows exactly what to change.", options: { color: C.text1 } }],
    { x: 0.75, y: 4.2, w: 8.5, h: 0.7, fontSize: 15, valign: "middle" });
  s.addNotes("The second challenge is timetable clashes. When a student registers, the system compares the new class with every class the student already has in that semester. Two classes clash only when three things are true: same day, overlapping periods, and compatible weeks. For example, a class held only in odd weeks never clashes with one held only in even weeks. If there is a clash, the server returns error 409 with the name of the conflicting class.");

  // ================= 12. Timeline =================
  pres.addSection({ title: "Journey" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("How I built it", { placeholder: "title" });
  const tl = [
    ["Jan 2026", "Analysis", "Studied the real process, wrote the 9 rules"],
    ["Mar 2026", "Backend", "Database schema, seed data, REST API"],
    ["Mar 2026", "Monorepo", "Client + server workspaces, one dev command"],
    ["Mar 2026", "Frontend", "Student and admin sites, dark mode"],
    ["Mar 2026", "Docker", "MySQL, API, Nginx with health checks + docs"],
  ];
  s.addShape(pres.shapes.LINE, { x: 0.9, y: 2.15, w: 8.2, h: 0, line: { color: HEX.line, width: 3 }, objectName: name("timeline") });
  tl.forEach(([date, h, d], i) => {
    const cx = 0.9 + i * 2.05;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.2, y: 1.95, w: 0.4, h: 0.4, fill: { color: i === 0 ? HEX.orange : HEX.teal }, line: { color: HEX.white, width: 3 }, objectName: name("dot") });
    T(s, date, { x: cx - 0.85, y: 1.45, w: 1.7, h: 0.35, fontSize: 12, color: C.accent4, align: "center" });
    T(s, h, { x: cx - 0.85, y: 2.55, w: 1.7, h: 0.4, fontSize: 17, bold: true, color: C.text2, align: "center" });
    T(s, d, { x: cx - 0.85, y: 3.0, w: 1.7, h: 1.2, fontSize: 13, color: C.text1, align: "center" });
  });
  card(s, 0.5, 4.3, 9.0, 0.6, C.accent5);
  T(s, "Everything tracked with Git, from the first README to the Docker setup", { x: 0.75, y: 4.3, w: 8.5, h: 0.6, fontSize: 14, color: C.text2, valign: "middle" });
  s.addNotes("I built the project in five stages. In January I analysed the real registration process and wrote the rules. In March I built the database and the backend API, then reorganised the project into a monorepo so I could start everything with one command. Next I built the student and admin websites, and finally I packaged everything with Docker and wrote the documentation. I used Git the whole time.");

  // ================= 13. Lessons =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("What I learned", { placeholder: "title" });
  const lessons = [
    [fa.FaLock, "Transactions matter", "Transactions and locks are what keep data right under load"],
    [fa.FaPencilRuler, "Think before coding", "Writing the rules first made the code clear and easy to check"],
    [fa.FaLayerGroup, "Clean layers pay off", "I could change one layer without breaking the others"],
    [fa.FaTools, "Professional habits", "Git, documentation and Docker from day one"],
  ];
  for (let i = 0; i < lessons.length; i++) {
    const [ic, h, d] = lessons[i];
    const y = 1.25 + i * 0.92;
    await iconCircle(s, ic, 0.5, y, 0.7, HEX.teal, HEX.white);
    T(s, h, { x: 1.4, y: y + 0.02, w: 4.0, h: 0.35, fontSize: 17, bold: true, color: C.text2 });
    T(s, d, { x: 1.4, y: y + 0.37, w: 4.4, h: 0.35, fontSize: 14, color: C.text1 });
  }
  card(s, 6.2, 1.25, 3.3, 3.65, C.accent5);
  T(s, "Next steps", { x: 6.45, y: 1.4, w: 2.8, h: 0.4, fontSize: 18, bold: true, color: C.text2 });
  const next = ["Check prerequisites automatically", "Automated tests with Jest", "Waiting list + email alerts", "Caching for peak load"];
  T(s, next.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < next.length - 1 } })),
    { x: 6.45, y: 1.95, w: 2.85, h: 2.8, fontSize: 15, color: C.text1, paraSpaceAfter: 10 });
  s.addNotes("This project taught me a lot. First, correctness needs the database: transactions and locks really matter. Second, thinking before coding: writing the rules first made the code much clearer. Third, a clean layered architecture makes changes safe. And fourth, professional habits like Git, documentation and Docker. In the future, I want to check prerequisites automatically, add automated tests, add a waiting list with email alerts, and add caching for peak load.");

  // ================= 14. Thank you =================
  pres.addSection({ title: "Closing" });
  s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: "Closing" });
  s.addText("Thank you!", { placeholder: "title" });
  s.addText("Questions and feedback are very welcome", { placeholder: "body" });
  await iconCircle(s, fa.FaComments, 8.35, 0.55, 1.0, HEX.teal, HEX.orange);
  T(s, "React · Express · MySQL · Docker", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  s.addNotes("To sum up, this project solves a real problem that every student knows, and it works from end to end. It is the project I am most proud of so far. Thank you for listening. I'm happy to answer any questions.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
