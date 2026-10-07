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
    title: "DARK_TITLE_IMAGE",
    background: { color: HEX.dark },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.3, w: 4.5, h: 1.75, fontSize: 34, bold: true, color: C.background1, valign: "top", align: "left", fontFace: THEME.headFontFace }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.1, w: 4.4, h: 1.0, fontSize: 16, color: C.accent5, valign: "top" }, text: "" } },
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
  const SHOTS = require("path").join(__dirname, "screenshots") + "/";
  const RATIO = 1600 / 956;
  function shot(slide, file, x, y, w, caption) {
    const h = w / RATIO;
    slide.addShape(pres.shapes.RECTANGLE, { x: x - 0.02, y: y - 0.02, w: w + 0.04, h: h + 0.04, fill: { color: HEX.white }, line: { color: HEX.line, width: 0.75 }, shadow: shadow(), objectName: name("shot-frame") });
    slide.addImage({ path: SHOTS + file, x, y, w, h, objectName: name("screenshot"), altText: caption || "Screenshot of the system" });
    if (caption) {
      const cw = Math.min(w - 0.2, 0.12 + caption.length * 0.085);
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.1, y: y + h - 0.42, w: cw, h: 0.32, rectRadius: 0.06, fill: { color: HEX.dark }, line: { type: "none" }, objectName: name("caption-bg") });
      slide.addText(caption, { x: x + 0.1, y: y + h - 0.42, w: cw, h: 0.32, fontSize: 12, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: name("caption") });
    }
    return h;
  }
  const T = (slide, text, o) => slide.addText(text, Object.assign({ isTextBox: true, margin: 0, valign: "top", objectName: name("text") }, o));

  // ================= 1. Title =================
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK_TITLE_IMAGE", sectionTitle: "Opening" });
  T(s, "DESCRIBE A PROJECT WHICH I HAVE WORKED ON", { x: 0.7, y: 0.75, w: 4.4, h: 0.4, fontSize: 11, bold: true, color: C.accent2, charSpacing: 1 });
  shot(s, "student-registration-dark.jpg", 5.3, 1.35, 4.2);
  s.addText("Course Management & Registration System", { placeholder: "title" });
  s.addText("A web application that makes course registration fair, reliable and simple", { placeholder: "body" });
  T(s, "Your Name  ·  Student ID  ·  English Writing & Presentation Skills", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  s.addNotes("Good morning, everyone. My name is [your name]. Today, I would like to tell you about a project that I have worked on. It is a website that helps university students register for their classes. I will explain why I built it, what it does, the biggest problems I had, and what I have learned.");

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
  s.addNotes("My presentation has four parts. First, I will talk about why I chose this project. Second, I will show you what the system does and how it works. Third, I will talk about the two most difficult problems that I had to solve. And finally, I will tell you what I have learned. My talk will take about eight minutes, and after that I will be happy to answer your questions.");

  // ================= 3. Problem =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Context" });
  s.addText("Registration day is stressful", { placeholder: "title" });
  const probs = [
    [fa.FaUsers, "Limited seats", "Hundreds of students compete for the last seats in the same minute"],
    [fa.FaCalendarTimes, "Timetable clashes", "Two classes at the same time are easy to miss"],
    [fa.FaClock, "Strict time windows", "Registration and cancellation are only open for a few days"],
    [fa.FaClipboardList, "Manual admin work", "Staff often manage courses, rooms and classes in Excel"],
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
  s.addNotes("Let me start with the problem. I am sure that many of you remember registration day. Everyone clicks at the same time, so the seats are gone in a few minutes. It is also easy to choose two classes at the same time by mistake. The registration period is very short, too. And for the university staff, a lot of the work is still done in Excel. I have had this stressful experience myself, and that is why I chose this project.");

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
  s.addNotes("Here is a quick look at the project. The system has two portals: one for students and one for staff. It checks nine rules every time a student registers for a class. I built it in about three months, from January to March this year, and I did all the work by myself. My main goal was simple: the system must be fair, it must work well, and it must be easy to use, even on the busiest day.");

  // ================= 5. Student portal =================
  pres.addSection({ title: "Solution" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("The student portal", { placeholder: "title" });
  shot(s, "student-registration.jpg", 0.5, 1.25, 5.75, "Register or cancel with one click");
  shot(s, "student-timetable.jpg", 6.6, 1.25, 2.9, "Weekly timetable");
  shot(s, "student-grades.jpg", 6.6, 1.25 + 2.9 / RATIO + 0.25, 2.9, "Grades and GPA");
  T(s, "Real screenshots of the running system", { x: 0.5, y: 4.8, w: 5.75, h: 0.3, fontSize: 12, italic: true, color: C.accent4 });
  s.addNotes("Now, let's move on to what the system can do. Instead of just describing it, I would like to show you some real screenshots. This is the student portal. On the left, you can see the registration page. Students can see every class, its timetable and how many seats are left, and they can register or cancel with just one click. On the right, there is the weekly timetable, which is made automatically, and the page where students can check their grades and GPA.");

  // ================= 5b. Admin portal =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Solution" });
  s.addText("The administrator portal", { placeholder: "title" });
  shot(s, "admin-sections.jpg", 0.5, 1.25, 5.75, "Open classes, assign lecturers and rooms");
  shot(s, "admin-semesters.jpg", 6.6, 1.25, 2.9, "Registration periods");
  shot(s, "admin-schedule.jpg", 6.6, 1.25 + 2.9 / RATIO + 0.25, 2.9, "Room schedule");
  T(s, "Real screenshots of the running system", { x: 0.5, y: 4.8, w: 5.75, h: 0.3, fontSize: 12, italic: true, color: C.accent4 });
  s.addNotes("And this is the portal for the staff. Here, they can open new classes and choose the lecturer and the room for each class. They can also set the registration period for each semester, and they can see the timetable of every room on one page. Each user can only see the portal which matches their role.");

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
  s.addNotes("So, how does it work? Like most websites, it has three parts. The front end is what users see in their browser. I built it with React. The back end is like the brain of the system. It checks who the user is and follows all the rules. And the database keeps all the information. Finally, I used a tool called Docker, so the whole system can be started with just one command.");

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
    ["All or nothing", "all checks and the sign-up happen together, or nothing is saved"],
    ["A short lock", "the class is locked for a moment, so Student B waits for Student A"],
    ["A safety rule", "the database never allows more students than seats"],
  ];
  sol.forEach(([h, d], i) => {
    const y = 2.0 + i * 0.95;
    T(s, [{ text: h, options: { bold: true, color: C.text2, breakLine: true } }, { text: d, options: { color: C.text1 } }],
      { x: 5.35, y, w: 3.95, h: 0.85, fontSize: 14 });
  });
  s.addNotes("This brings me to the most interesting part: the problems I had to solve. The first one is what I call 'the last seat'. Imagine a class with forty seats, and thirty-nine students have already registered. Then two students click Register at exactly the same time. Without any protection, both of them see one free seat, both of them are accepted, and the class ends up with forty-one students. To fix this, I made the system lock the class for a very short moment, so the second student has to wait. When it is their turn, the system can see that the class is full. As an extra safety rule, the database never allows more students than seats.");

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
  s.addNotes("The second problem was timetable clashes. It sounds easy, but some classes only meet in odd weeks, and others only meet in even weeks. So I decided on a clear rule: two classes clash only if all three things on this slide are true. They are on the same day, their lesson times overlap, and their weeks match. When there is a clash, the system does not just say 'Error'. It tells the student which class is causing the problem.");

  // ================= 12. Timeline =================
  pres.addSection({ title: "Journey" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("How I built it", { placeholder: "title" });
  const tl = [
    ["Jan 2026", "Planning", "Looked at the real process, wrote 9 rules"],
    ["Mar 2026", "Back end", "Database and all the registration rules"],
    ["Mar 2026", "Reorganising", "One clean project for all the code"],
    ["Mar 2026", "Front end", "Student and admin websites, dark mode"],
    ["Mar 2026", "Sharing", "Docker setup and guides"],
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
  s.addNotes("Now, let me quickly explain how I built the project. I divided the work into five stages. In January, I looked at how registration works at my university, and I wrote down nine rules. In March, I built the database and the back end. Then I reorganised the code, built the two websites, and finally I set up Docker and wrote the guides. I used Git during the whole project, so I could always go back if I made a mistake.");

  // ================= 13. Lessons =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Journey" });
  s.addText("What I learned", { placeholder: "title" });
  const lessons = [
    [fa.FaPencilRuler, "Plan before doing", "Writing the nine rules first saved me a lot of time"],
    [fa.FaBookOpen, "Learn by myself", "I found many answers in English guides"],
    [fa.FaPenNib, "Write clearly", "Writing guides taught me to explain ideas simply"],
    [fa.FaHourglassHalf, "Manage my time", "Small stages kept me motivated every week"],
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
  const next = ["Automatic tests", "Waiting list with email alerts", "Check for required courses"];
  T(s, next.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < next.length - 1 } })),
    { x: 6.45, y: 1.95, w: 2.85, h: 2.8, fontSize: 15, color: C.text1, paraSpaceAfter: 10 });
  s.addNotes("Finally, what have I learned? Of course, my technical skills have improved a lot. But I think the most useful things are four skills that I can use in any job. First, plan before doing: writing the rules first saved me a lot of time. Second, learn by myself: I found many answers in English guides. Third, write clearly: writing guides taught me to explain ideas in a simple way. And fourth, manage my time by working in small stages. In the future, I would like to add automatic tests, a waiting list and a check for required courses.");

  // ================= 14. Thank you =================
  pres.addSection({ title: "Closing" });
  s = pres.addSlide({ masterName: "DARK_TITLE", sectionTitle: "Closing" });
  s.addText("Thank you!", { placeholder: "title" });
  s.addText("Questions and feedback are very welcome", { placeholder: "body" });
  await iconCircle(s, fa.FaComments, 8.35, 0.55, 1.0, HEX.teal, HEX.orange);
  T(s, "Your Name  ·  English Writing & Presentation Skills", { x: 0.7, y: 4.65, w: 8.7, h: 0.4, fontSize: 14, color: C.background1 });
  s.addNotes("To sum up, this project started from a problem that I had as a student, and it became a complete system that really works. It has taught me that good software is not only about code. It is also about understanding people's problems. Thank you very much for listening. I would be happy to answer any questions you have.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
