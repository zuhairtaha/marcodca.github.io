<h1> Homework Hack Your Future, databases module, week 3 </h1>

Tasks:

> Using an entity relationship diagram, design the data model for an application of your choice; this could be anything, but previous students have used a small business (with staff, offices, and job titles), a library (with books, genres, racks, members, and a borrowing log), or a farm (with animals, barns, and farmers). Your application must include at least one many-to-many relationship and any supporting tables (associative entities) that are needed. The entity relationship diagram must describe what tables you will need, the columns in these tables, which column is the primary key, and the relationships between tables.
Next, using the entity relationship diagram as a starting point, write all the necessary CREATE TABLE statements to create all tables and relationships (foreign key constraints) for this data model.

I decided to go with a fictional database for storing playlists of songs in an app. I tried to implement the following rules:
- Each playlist should correspond to only one user,  but a user could have many playlists.
- Each playlist could have many songs, and a song could also be in several playlists.  
- A song could be made by one or more artists, but belong only to one album.
- Each artist could have several songs and albums. but an album can belong only to one artist.

Additionally:

- Each song should belong to one, and only one, genre, but of course, each genre could have many songs.  
- Each user can put a grade to a song (even if it's not on one of his playlists), and thus, the same song can have different grades from several users. 

<h3>Concept diagram:</h3>

![concept diagram](https://github.com/marcodca/marcodca.github.io/blob/master/databases/week_3/img/diagram.png)

<h3>Final result:</h3>

![final diagram](https://github.com/marcodca/marcodca.github.io/blob/master/databases/week_3/img/final_diagram.png)

<sub> I used the term "valoration" to reffer to the grade of a song, but it turns out that is not an english word, d'ah!</sub>
