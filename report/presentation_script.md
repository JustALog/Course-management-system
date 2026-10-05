# Presentation script

*Describe a project which I have worked on: Course Registration System*

About 7 minutes (11 slides, roughly 40 seconds each). Replace **[your name]** before presenting.

## Slide 1: Course Management & Registration System

Good morning, everyone. My name is [your name]. Today, I would like to tell you about a project that I have worked on: a course registration system for university students. I will explain why I built it, what it does, the biggest challenges I faced, and what I learned along the way.

## Slide 2: What I will talk about

My presentation is divided into four parts. First, I will talk about why I chose this project. Second, I will show you what the system does and how it works. Third, I will focus on the two hardest problems I had to solve. And finally, I will share what I learned. The presentation will take about seven minutes, and I will be happy to answer your questions at the end.

## Slide 3: Registration day is stressful

Let me start with the problem. I am sure many of you remember registration day. Everyone clicks at the same time, so seats disappear in minutes. It is easy to choose two classes that are at the same time. The registration period is very short. And on the other side, the academic office often manages everything in spreadsheets. I experienced this stress myself, and that is exactly why I chose this project.

## Slide 4: The project at a glance

Here is the project at a glance. The system has two portals: one for students and one for administrators. It checks nine rules every time a student signs up for a class. I built it in about three months, from January to March 2026, and I designed and developed it by myself. My main goal was simple: the system must be fair, reliable and easy to use, even on the busiest day.

## Slide 5: Two portals, one system

Now, let's move on to what the system actually does. Students can view their information, register for or cancel a class with just one click, see their weekly timetable, and check their grades. Administrators, on the other hand, can manage courses, semesters and classes, and they can monitor how many students have registered. Each user only sees the portal that matches their role.

## Slide 6: How it works: three parts

So, how does it work? Like most web applications, it has three parts. The front end is what users see in their browser; I built it with React. The back end is the 'brain': it checks who the user is and applies all the rules. And the database stores all the information. Finally, I packaged everything with a tool called Docker, so the whole system can be started with a single command.

## Slide 7: Challenge 1: the last seat

This brings me to the most interesting part: the challenges. The first one is what I call 'the last seat'. Imagine a class with forty seats and thirty-nine students. Two students click Register at exactly the same moment. Without protection, both see one free seat, both are accepted, and the class ends up with forty-one students. To solve this, I made the sign-up 'all or nothing', and I lock the class for a very short moment, so the second student has to wait. When it is their turn, the system correctly says the class is full. As a final safety net, the database itself refuses more students than seats.

## Slide 8: Challenge 2: timetable clashes

The second challenge was timetable clashes. It sounds easy, but some classes only meet in odd weeks, and others only in even weeks. So I defined a clear rule: two classes clash only if all three conditions on this slide are true: the same day, overlapping periods, and compatible weeks. And when there is a clash, the system does not just say 'Error'. It tells the student exactly which class is the problem.

## Slide 9: How I built it

Now, let me briefly describe how I built the project. I worked in five stages. In January, I analysed the real process and wrote down nine rules. In March, I built the database and the back end, then reorganised the code, built the two websites, and finally prepared the release with Docker and documentation. I used Git the whole time, so I could always go back if I made a mistake.

## Slide 10: What I learned

Finally, what did I learn? Of course, I improved my technical skills. But more importantly, I learned four skills that are useful in any job. First, plan before acting: writing the rules first saved me a lot of time. Second, learn independently: many answers were only in English documentation. Third, write clearly: writing documentation taught me to explain ideas simply. And fourth, manage my time by working in small stages. In the future, I would like to add automatic tests, a waiting list, and a prerequisite check.

## Slide 11: Thank you!

To sum up, this project started from a problem I experienced myself and became a complete, working system. It taught me that good software is not only about code, but about understanding people's problems. Thank you very much for listening. I would be happy to answer any questions you may have.

## Useful signposting phrases

- **Opening:** *Today, I would like to tell you about…* / *My presentation is divided into four parts.*
- **Moving on:** *Let me start with…* / *Now, let's move on to…* / *This brings me to…*
- **Giving examples:** *Imagine…* / *For example,…*
- **Concluding:** *To sum up,…* / *Thank you for listening. I'd be happy to answer any questions.*
