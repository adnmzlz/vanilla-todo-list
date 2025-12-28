First time using TypeScript.

<hr>

<strong>Current features:</strong>
- Add a task
- Mark a task as completed
- Delete a task
- Restore a deleted task
- All tasks saved to local storage

*v1.1.0 release*
- Change task order

*v1.2.0 release*
- Filter by completed

*v1.2.1*
- Support for enter key to submit new task

*v1.2.2*
- Styling changes
- Added a way to purge deleted tasks

*v1.2.3*
- Added check to prevent empty tasks being created

*v1.3.0*
- Added mobile touch support for re-ordering the list.  It doesn't look great yet, but it works.

*v1.3.2*
- Improved drag/drop UI across both desktop and mobile
- Changed restore icon in deletes page
- Added hamburger icon on main page

*v1.3.3*
- Updated footer

<hr>

I'll be leaving this one for the moment so I can move onto other stuff, but here are a list of known issues and features I'd like to address at some point in the future.

<strong>Known issues:</strong>
- Checkbox and delete buttons don't always work on first tap in mobile mode, due to the drag/drop functionality being applied to the whole row.
- Bottom border styling change on target row doesn't apply to Chrome in desktop mode.  (Ie it's hard to tell where the task you're moving will go to.)

<strong>Upcoming features:</strong>
- Make hamburger icon only show up when more than one active task on the main list and improve positioning.
- Package/build as a standalone app

<strong>Other features I will probably not include for this particular iteration:</strong>
- Logins/users/auth
- Saving tasks to a database

<strong>Offshoots I want to try at some point based on this project:</strong>
- Save to a database, but no individual users.  Everyone has to share the same list (Asana gone wild).
- Ways to view/share tasks with others.