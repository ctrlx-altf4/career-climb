## Business Perspective

Lets think this from business perspective..

There are lots of candidates who want to practice real-world interviews to climb their career ladder. So we , as a platform, provide them  with interviewers. So that would mean our customers will be the candidates.

So what will be the flow?
- We, as a business, onboard skilled interviewers ask them to add their skills, their time availability, and their payment.
- Candidates will register themselves, build up their profile add their CVs and register for the interview, they also set their time availability and the title for which they want to interview.
- Now, we as a system , shall provide list of  relevant /available interviewers and the amount they are asking for.
- Candidates can choose interviewers.
- Interviewers will get notification or email (for now lets focus on email). and they accept or reject the interview
- Once accepted, Candidates will now pay and the interview is scheduled.
- We , as a business, will take certain percent of the payment ( we won't implement this for now). Also, interviewers can ask for payout ( we won't implement this for now)
- Once the interview is completed. Both Candidates and interviewer can give feedback. Feedback can be personal and public.


## Database Initial Design


- https://dbdocs.io/aashish/CareerClimb  pasword: 3JCCqbqH@ud7uG3



## Constraints Set

 - No recurring schedules
 - One hour availabiliy difference and One hour Meeting by default

## Setbacks

 - Initially used typedORM, then changed to sequelize-typescript
 - Initially started with Stripe payment, later settled with Khalti
