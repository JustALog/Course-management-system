# Presentation script

*Describe a project which I have worked on: Course Registration System*

About 8 minutes (12 slides, roughly 40 seconds each). The language is at B2 level. Replace **[your name]** before presenting.

## Slide 1: Course Management & Registration System

Good morning, everyone. My name is [your name]. Today, I would like to tell you about a project that I have worked on. It is a website that helps university students register for their classes. I will explain why I built it, what it does, the biggest problems I had, and what I have learned.

## Slide 2: What I will talk about

My presentation has four parts. First, I will talk about why I chose this project. Second, I will show you what the system does and how it works. Third, I will talk about the two most difficult problems that I had to solve. And finally, I will tell you what I have learned. My talk will take about eight minutes, and after that I will be happy to answer your questions.

## Slide 3: Registration day is stressful

Let me start with the problem. I am sure that many of you remember registration day. Everyone clicks at the same time, so the seats are gone in a few minutes. It is also easy to choose two classes at the same time by mistake. The registration period is very short, too. And for the university staff, a lot of the work is still done in Excel. I have had this stressful experience myself, and that is why I chose this project.

## Slide 4: The project at a glance

Here is a quick look at the project. The system has two portals: one for students and one for staff. It checks nine rules every time a student registers for a class. I built it in about three months, from January to March this year, and I did all the work by myself. My main goal was simple: the system must be fair, it must work well, and it must be easy to use, even on the busiest day.

## Slide 5: The student portal

Now, let's move on to what the system can do. Instead of just describing it, I would like to show you some real screenshots. This is the student portal. On the left, you can see the registration page. Students can see every class, its timetable and how many seats are left, and they can register or cancel with just one click. On the right, there is the weekly timetable, which is made automatically, and the page where students can check their grades and GPA.

## Slide 6: The administrator portal

And this is the portal for the staff. Here, they can open new classes and choose the lecturer and the room for each class. They can also set the registration period for each semester, and they can see the timetable of every room on one page. Each user can only see the portal which matches their role.

## Slide 7: How it works: three parts

So, how does it work? Like most websites, it has three parts. The front end is what users see in their browser. I built it with React. The back end is like the brain of the system. It checks who the user is and follows all the rules. And the database keeps all the information. Finally, I used a tool called Docker, so the whole system can be started with just one command.

## Slide 8: Challenge 1: the last seat

This brings me to the most interesting part: the problems I had to solve. The first one is what I call 'the last seat'. Imagine a class with forty seats, and thirty-nine students have already registered. Then two students click Register at exactly the same time. Without any protection, both of them see one free seat, both of them are accepted, and the class ends up with forty-one students. To fix this, I made the system lock the class for a very short moment, so the second student has to wait. When it is their turn, the system can see that the class is full. As an extra safety rule, the database never allows more students than seats.

## Slide 9: Challenge 2: timetable clashes

The second problem was timetable clashes. It sounds easy, but some classes only meet in odd weeks, and others only meet in even weeks. So I decided on a clear rule: two classes clash only if all three things on this slide are true. They are on the same day, their lesson times overlap, and their weeks match. When there is a clash, the system does not just say 'Error'. It tells the student which class is causing the problem.

## Slide 10: How I built it

Now, let me quickly explain how I built the project. I divided the work into five stages. In January, I looked at how registration works at my university, and I wrote down nine rules. In March, I built the database and the back end. Then I reorganised the code, built the two websites, and finally I set up Docker and wrote the guides. I used Git during the whole project, so I could always go back if I made a mistake.

## Slide 11: What I learned

Finally, what have I learned? Of course, my technical skills have improved a lot. But I think the most useful things are four skills that I can use in any job. First, plan before doing: writing the rules first saved me a lot of time. Second, learn by myself: I found many answers in English guides. Third, write clearly: writing guides taught me to explain ideas in a simple way. And fourth, manage my time by working in small stages. In the future, I would like to add automatic tests, a waiting list and a check for required courses.

## Slide 12: Thank you!

To sum up, this project started from a problem that I had as a student, and it became a complete system that really works. It has taught me that good software is not only about code. It is also about understanding people's problems. Thank you very much for listening. I would be happy to answer any questions you have.

## Useful phrases for presenting

- **Starting:** *Today, I would like to tell you about…* / *My presentation has four parts.*
- **Moving on:** *Let me start with…* / *Now, let's move on to…* / *This brings me to…*
- **Showing pictures:** *Instead of just describing it, I would like to show you…* / *On the left, you can see…*
- **Giving examples:** *Imagine…* / *For example,…*
- **Finishing:** *To sum up,…* / *Thank you very much for listening. I would be happy to answer any questions.*
