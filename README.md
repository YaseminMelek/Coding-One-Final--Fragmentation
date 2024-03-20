Fragmentation is a short generative abstract game that consists of two levels 
focusing on our relationship technology. I wanted to explore the fragmented nature of 
the body in relation to technology and ask questions such as whether our phones or 
computers are extensions of our body, and how technology dependency plays a role in 
changing our bodies. I am also interested in creating experimental games where 
instructions are not necessary. I therefore created a design where the viewer 
experiments with the canvas and objects without having to read any instructions. I have 
been inspired by other abstract games I played such as Journey. 
I made two levels, the first one includes interacting with a generative organic 
shape. I mostly used Bezier curves and cellular patterns to create the first level. I created 
a few tiles with curves to generate an organic pattern. I then used a Voronoi pattern 
with the help of the d3.js library to create a cellular look. I used noise to give a natural 
movement to the pattern almost as if the shape is breathing. However, I would like to 
work more on the placement of the individual tiles. For this project, the placement of 
the tiles was all random. In the future, I want to use algorithms like wave function 
collapse to generate more cohesive patterns. I have been inspired by both circuit 
patterns and molecular patterns while I was working on this project. I chose the Voronoi 
cells to layer on top of the pattern to show fragmentation. The user gets to interact with 
the pattern and find a way to move on to the next level. 
The second level is inspired by a circuit where quite a few signals move, and the 
user interacts with them to make the circuit work. I experimented with creating a circuit 
pattern without using tiles and instead used points and ellipses for the most part. To 
create a visually striking design I worked with color values using transparency and lerp. I 
managed the collision handling with p5.collide library. However, the collisions still have 
a few bugs and working with moving particles that have directions and speed was a 
challenge to me. 
I studied Computer Science for my undergraduate degree. Therefore, I am 
familiar with Object Oriented Programming. The most important part of my code was to 
make sure the game ran smoothly. Therefore, using too many objects and 
overcomplicating the patterns would worsen the gameplay experience. Furthermore, 
handling the data was difficult, since there were different objects to keep track of that 
interacted with each other. Creating shapes with Bezier curves and creating movement 
with noise or sine waves required some math and geometry that I found somewhat 
challenging. I hope to use more mathematical concepts in my future works. Overall, I 
really enjoyed making an experimental game and hope to tackle similar concepts in my 
other projects.