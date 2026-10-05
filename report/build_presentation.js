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
  s.addText("A web application that makes course registration fair, reliable and simple", { placeholder: "body" });
  T(s, "Your Name  ·  Student ID  ·  English Writing & Presentation Skills", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  await iconCircle(s, fa.FaGraduationCap, 8.35, 0.55, 1.0, HEX.teal, HEX.orange);
  s.addNotes("Good morning, everyone. My name is [your name]. Today, I would like to tell you about a project that I have worked on: a course registration system for university students. I will explain why I built it, what it does, the biggest challenges I faced, and what I learned along the way.");

  // ================= 2. Agenda =================
  pres.addSection({ title: "Context" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("What I will talk about", { placeholder: "title" });
  const agenda = [
    ["01", "Why", "The problem that inspired this project"],
    ["02", "What", "What the system does and how it works"],
    ["03", "Challenges", "The two hardest problems I solved"],
    ["04", "Lessons", "How I built it and what I learned"],
  ];
  agenda.forEach(([num, head, sub], i) => {
    const x = 0.5 + i * 2.3, y = 1.5;
    card(s, x, y, 2.1, 3.1);
    T(s, num, { x: x + 0.25, y: y + 0.3, w: 1.6, h: 0.8, fontSize: 40, bold: true, color: C.accent2, fontFace: THEME.headFontFace });
    T(s, head, { x: x + 0.25, y: y + 1.2, w: 1.7, h: 0.5, fontSize: 18, bold: true, color: C.text2 });
    T(s, sub, { x: x + 0.25, y: y + 1.8, w: 1.7, h: 1.1, fontSize: 14, color: C.text1 });
  });
  s.addNotes("My presentation is divided into four parts. First, I will talk about why I chose this project. Second, I will show you what the system does and how it works. Third, I will focus on the two hardest problems I had to solve. And finally, I will share what I learned. The presentation will take about seven minutes, and I will be happy to answer your questions at the end.");

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
  s.addNotes("Let me start with the problem. I am sure many of you remember registration day. Everyone clicks at the same time, so seats disappear in minutes. It is easy to choose two classes that are at the same time. The registration period is very short. And on the other side, the academic office often manages everything in spreadsheets. I experienced this stress myself, and that is exactly why I chose this project.");

  // ================= 4. Goals + numbers =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("The project at a glance", { placeholder: "title" });
  const stats = [["2", "portals", "students & admins"], ["9", "rules", "checked on every sign-up"], ["3", "months", "January – March 2026"], ["1", "developer", "designed and built by me"]];
  stats.forEach(([big, label, sub], i) => {
    const x = 0.5 + i * 2.3;
    T(s, big, { x, y: 1.35, w: 2.1, h: 1.0, fontSize: 60, bold: true, color: C.accent2, fontFace: THEME.headFontFace });
    T(s, label, { x, y: 2.4, w: 2.1, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    T(s, sub, { x, y: 2.8, w: 2.1, h: 0.35, fontSize: 13, color: C.accent4 });
  });
  card(s, 0.5, 3.55, 9.0, 1.3, C.accent5);
  T(s, [
    { text: "My goal: ", options: { bold: true, color: C.text2 } },
    { text: "a system that is fair, reliable and easy to use, even when hundreds of students click “Register” at the same moment.", options: { color: C.text1 } },
  ], { x: 0.8, y: 3.75, w: 8.4, h: 0.95, fontSize: 16, valign: "middle" });
  s.addNotes("Here is the project at a glance. The system has two portals: one for students and one for administrators. It checks nine rules every time a student signs up for a class. I built it in about three months, from January to March 2026, and I designed and developed it by myself. My main goal was simple: the system must be fair, reliable and easy to use, even on the busiest day.");

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
  s.addNotes("Now, let's move on to what the system actually does. Students can view their information, register for or cancel a class with just one click, see their weekly timetable, and check their grades. Administrators, on the other hand, can manage courses, semesters and classes, and they can monitor how many students have registered. Each user only sees the portal that matches their role.");

  // ================= 6. How it works =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("How it works: three parts", { placeholder: "title" });
  const parts = [
    [fa.FaDesktop, "Front end", "What users see and click in the browser", "React"],
    [fa.FaServer, "Back end", "Checks who you are and applies the rules", "Node.js + Express"],
    [fa.FaDatabase, "Database", "Stores students, classes, timetables and grades", "MySQL"],
  ];
  for (let i = 0; i < parts.length; i++) {
    const [ic, h, d, tech] = parts[i];
    const x = 0.5 + i * 3.15, y = 1.35;
    card(s, x, y, 2.75, 2.75, i === 1 ? C.accent5 : C.background2);
    await iconCircle(s, ic, x + 0.95, y + 0.25, 0.85, i === 1 ? HEX.orange : HEX.teal, HEX.white);
    T(s, h, { x: x + 0.15, y: y + 1.25, w: 2.45, h: 0.4, fontSize: 19, bold: true, color: C.text2, align: "center" });
    T(s, d, { x: x + 0.2, y: y + 1.7, w: 2.35, h: 0.65, fontSize: 14, color: C.text1, align: "center" });
    T(s, tech, { x: x + 0.15, y: y + 2.35, w: 2.45, h: 0.3, fontSize: 13, italic: true, color: C.accent4, align: "center" });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 2.8, y: y + 1.37, w: 0.3, h: 0, line: { color: HEX.muted, width: 2, beginArrowType: "triangle", endArrowType: "triangle" }, objectName: name("arrow") });
  }
  card(s, 0.5, 4.3, 9.0, 0.6, C.accent5);
  await iconCircle(s, fa.FaDocker, 0.65, 4.37, 0.46, HEX.teal, HEX.white);
  T(s, "Packaged with Docker: the whole system starts with one command", { x: 1.3, y: 4.3, w: 8.0, h: 0.6, fontSize: 15, color: C.text2, valign: "middle" });
  s.addNotes("So, how does it work? Like most web applications, it has three parts. The front end is what users see in their browser; I built it with React. The back end is the 'brain': it checks who the user is and applies all the rules. And the database stores all the information. Finally, I packaged everything with a tool called Docker, so the whole system can be started with a single command.");

  pres.addSection({ title: "Hard part" });
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
    ["All or nothing", "every check and the sign-up succeed together, or nothing changes"],
    ["A short lock", "the class is locked for a moment, so Student B waits for Student A"],
    ["A safety rule", "the database itself refuses more students than seats"],
  ];
  sol.forEach(([h, d], i) => {
    const y = 2.0 + i * 0.95;
    T(s, [{ text: h, options: { bold: true, color: C.text2, breakLine: true } }, { text: d, options: { color: C.text1 } }],
      { x: 5.35, y, w: 3.95, h: 0.85, fontSize: 14 });
  });
  s.addNotes("This brings me to the most interesting part: the challenges. The first one is what I call 'the last seat'. Imagine a class with forty seats and thirty-nine students. Two students click Register at exactly the same moment. Without protection, both see one free seat, both are accepted, and the class ends up with forty-one students. To solve this, I made the sign-up 'all or nothing', and I lock the class for a very short moment, so the second student has to wait. When it is their turn, the system correctly says the class is full. As a final safety net, the database itself refuses more students than seats.");

  // ================= 11. Timetable conflict =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Hard part" });
  s.addText("Challenge 2: timetable clashes", { placeholder: "title" });
  T(s, "Two classes clash only if all three conditions are true", { x: 0.5, y: 1.2, w: 9, h: 0.4, fontSize: 16, color: C.accent4 });
  const conds = [
    [fa.FaCalendarDay, "Same day", "Both meet on, for example, Monday"],
    [fa.FaStream, "Periods overlap", "Their lesson times overlap, even by one period"],
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
  T(s, [{ text: "Result: ", options: { bold: true, color: C.text2 } }, { text: "a clear message that names the clashing class, so the student knows exactly what to change.", options: { color: C.text1 } }],
    { x: 0.75, y: 4.2, w: 8.5, h: 0.7, fontSize: 15, valign: "middle" });
  s.addNotes("The second challenge was timetable clashes. It sounds easy, but some classes only meet in odd weeks, and others only in even weeks. So I defined a clear rule: two classes clash only if all three conditions on this slide are true: the same day, overlapping periods, and compatible weeks. And when there is a clash, the system does not just say 'Error'. It tells the student exactly which class is the problem.");

  // ================= 12. Timeline =================
  pres.addSection({ title: "Journey" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("How I built it", { placeholder: "title" });
  const tl = [
    ["Jan 2026", "Analysis", "Studied the real process, wrote the 9 rules"],
    ["Mar 2026", "Back end", "Database and all the registration rules"],
    ["Mar 2026", "Reorganise", "One clean project for all the code"],
    ["Mar 2026", "Front end", "Student and admin websites, dark mode"],
    ["Mar 2026", "Release", "Docker setup and documentation"],
  ];
  s.addShape(pres.shapes.LINE, { x: 1.3, y: 2.15, w: 7.4, h: 0, line: { color: HEX.line, width: 3 }, objectName: name("timeline") });
  tl.forEach(([date, h, d], i) => {
    const cx = 1.3 + i * 1.85;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.2, y: 1.95, w: 0.4, h: 0.4, fill: { color: i === 0 ? HEX.orange : HEX.teal }, line: { color: HEX.white, width: 3 }, objectName: name("dot") });
    T(s, date, { x: cx - 0.8, y: 1.45, w: 1.6, h: 0.35, fontSize: 12, color: C.accent4, align: "center" });
    T(s, h, { x: cx - 0.8, y: 2.55, w: 1.6, h: 0.4, fontSize: 17, bold: true, color: C.text2, align: "center" });
    T(s, d, { x: cx - 0.8, y: 3.0, w: 1.6, h: 1.2, fontSize: 13, color: C.text1, align: "center" });
  });
  card(s, 0.5, 4.3, 9.0, 0.6, C.accent5);
  T(s, "Every step saved with Git, so I could always go back after a mistake", { x: 0.75, y: 4.3, w: 8.5, h: 0.6, fontSize: 14, color: C.text2, valign: "middle" });
  s.addNotes("Now, let me briefly describe how I built the project. I worked in five stages. In January, I analysed the real process and wrote down nine rules. In March, I built the database and the back end, then reorganised the code, built the two websites, and finally prepared the release with Docker and documentation. I used Git the whole time, so I could always go back if I made a mistake.");

  // ================= 13. Lessons =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("What I learned", { placeholder: "title" });
  const lessons = [
    [fa.FaPencilRuler, "Plan before acting", "Writing the nine rules first saved me a lot of time"],
    [fa.FaBookOpen, "Learn independently", "I found many answers in English documentation"],
    [fa.FaPenNib, "Write clearly", "Documentation taught me to explain ideas simply"],
    [fa.FaHourglassHalf, "Manage my time", "Small stages kept me motivated and on track"],
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
  const next = ["Automatic tests", "Waiting list with email alerts", "Automatic prerequisite check"];
  T(s, next.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < next.length - 1 } })),
    { x: 6.45, y: 1.95, w: 2.85, h: 2.8, fontSize: 15, color: C.text1, paraSpaceAfter: 10 });
  s.addNotes("Finally, what did I learn? Of course, I improved my technical skills. But more importantly, I learned four skills that are useful in any job. First, plan before acting: writing the rules first saved me a lot of time. Second, learn independently: many answers were only in English documentation. Third, write clearly: writing documentation taught me to explain ideas simply. And fourth, manage my time by working in small stages. In the future, I would like to add automatic tests, a waiting list, and a prerequisite check.");

  // ================= 14. Thank you =================
  pres.addSection({ title: "Closing" });
  s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: "Closing" });
  s.addText("Thank you!", { placeholder: "title" });
  s.addText("Questions and feedback are very welcome", { placeholder: "body" });
  await iconCircle(s, fa.FaComments, 8.35, 0.55, 1.0, HEX.teal, HEX.orange);
  T(s, "Your Name  ·  English Writing & Presentation Skills", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  s.addNotes("To sum up, this project started from a problem I experienced myself and became a complete, working system. It taught me that good software is not only about code, but about understanding people's problems. Thank you very much for listening. I would be happy to answer any questions you may have.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
