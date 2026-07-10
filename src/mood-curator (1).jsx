import { useState, useEffect, useRef, useCallback } from "react";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060810; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #ffffff22; border-radius: 4px; }
  input::placeholder { color: #444; }
  select option { background: #141824; color: #fff; }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes spin     { to { transform: rotate(360deg); } }
  @keyframes pulse    { 0%,100%{opacity:.4;} 50%{opacity:1;} }
  @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
  @keyframes popIn    { 0%{transform:scale(.75);opacity:0;} 80%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }
  @keyframes slideIn  { from{transform:translateX(110%);opacity:0;} to{transform:translateX(0);opacity:1;} }
`;

const MOODS = [
  { emoji:"😢", label:"Melancholic", color:"#4a90d9", desc:"Emotional & reflective" },
  { emoji:"😂", label:"Playful",     color:"#f5a623", desc:"Fun & lighthearted" },
  { emoji:"😱", label:"Thrilled",    color:"#e74c3c", desc:"Edge-of-seat tension" },
  { emoji:"🤔", label:"Curious",     color:"#2ecc71", desc:"Mind-expanding" },
  { emoji:"😍", label:"Romantic",    color:"#e91e8c", desc:"Love & connection" },
  { emoji:"🌌", label:"Inspired",    color:"#9b59b6", desc:"Epic & awe-inspiring" },
  { emoji:"😌", label:"Cozy",        color:"#e67e22", desc:"Warm & comforting" },
  { emoji:"💀", label:"Dark",        color:"#7f8c8d", desc:"Gritty & intense" },
];

const DB = {
  Melancholic: {
    movies: [
      { id:"m1", title:"Eternal Sunshine of the Spotless Mind", year:2004, genre:"Romance/Sci-Fi", rating:8.3, match:98, tags:["Mind-bending","Emotional","Romance"], synopsis:"A couple undergo a procedure to erase each other from their memories after a painful breakup, only to rediscover their love in fragments.", streaming:"HBO Max", duration:"108 min", director:"Michel Gondry", cast:"Jim Carrey, Kate Winslet" },
      { id:"m2", title:"Manchester by the Sea",  year:2016, genre:"Drama",          rating:7.8, match:94, tags:["Grief","Family","Raw"],        synopsis:"A grief-stricken handyman is appointed guardian of his teenage nephew after his brother's death, forcing him to return to a painful past.", streaming:"Amazon Prime", duration:"137 min", director:"Kenneth Lonergan", cast:"Casey Affleck, Michelle Williams" },
      { id:"m3", title:"Her",                    year:2013, genre:"Romance/Sci-Fi",  rating:8.0, match:91, tags:["Loneliness","AI","Dreamy"],    synopsis:"A lonely writer develops an unlikely relationship with an AI operating system, exploring connection and love in near-future Los Angeles.", streaming:"Netflix", duration:"126 min", director:"Spike Jonze", cast:"Joaquin Phoenix, Scarlett Johansson" },
      { id:"m25", title:"The Tree of Life",      year:2011, genre:"Drama",          rating:6.8, match:88, tags:["Spiritual","Visual","Deep"],       synopsis:"A family in 1950s Texas navigates life's meaning while cosmic sequences explore the universe's origins and human existence.", streaming:"Paramount+", duration:"139 min", director:"Terrence Malick", cast:"Brad Pitt, Jessica Chastain" },
      { id:"m26", title:"Lost in Translation",  year:2003, genre:"Drama/Romance",  rating:7.7, match:86, tags:["Isolation","Tokyo","Connection"], synopsis:"Two Americans form an unlikely bond in Tokyo, finding solace in each other's company while feeling lost in their lives.", streaming:"Starz", duration:"102 min", director:"Sofia Coppola", cast:"Bill Murray, Scarlett Johansson" },
      { id:"m27", title:"Moonlight",            year:2016, genre:"Drama",          rating:7.4, match:85, tags:["Identity","Coming of Age","Poetic"], synopsis:"A young African-American man struggles with identity and sexuality across three defining chapters of his life in Miami.", streaming:"Netflix", duration:"111 min", director:"Barry Jenkins", cast:"Trevante Rhodes, André Holland" },
    ],
    books: [
      { id:"b1", title:"A Little Life",   author:"Hanya Yanagihara", year:2015, genre:"Literary Fiction",    rating:4.2, match:97, tags:["Devastating","Friendship","Trauma"],  synopsis:"An emotionally devastating portrait of four friends navigating trauma, love, and survival in New York City over decades.", pages:720 },
      { id:"b2", title:"The Hours",       author:"Michael Cunningham", year:1998, genre:"Literary Fiction", rating:3.9, match:92, tags:["Virginia Woolf","Time","Identity"],    synopsis:"Three women across different eras are connected by Virginia Woolf's Mrs Dalloway in this Pulitzer Prize-winning novel.", pages:229 },
      { id:"b3", title:"Never Let Me Go", author:"Kazuo Ishiguro",   year:2005, genre:"Dystopian",           rating:3.8, match:89, tags:["Haunting","Fate","Quiet"],            synopsis:"A haunting story of childhood friends who slowly discover the disturbing truth about their existence and predetermined fate.", pages:288 },
    ],
  },
  Thrilled: {
    movies: [
      { id:"m4", title:"Parasite",   year:2019, genre:"Thriller/Drama",   rating:8.5, match:99, tags:["Class War","Twist","Brilliant"], synopsis:"A poor family schemes to infiltrate a wealthy household until an unexpected discovery turns their plan dangerously dark.", streaming:"Hulu", duration:"132 min", director:"Bong Joon-ho", cast:"Song Kang-ho, Lee Sun-kyun" },
      { id:"m5", title:"Oldboy",     year:2003, genre:"Mystery/Thriller",  rating:8.4, match:95, tags:["Revenge","Shocking","Korean"],   synopsis:"Imprisoned for 15 years with no explanation, a man is suddenly released and has five days to uncover the truth about his captor.", streaming:"Shudder", duration:"120 min", director:"Park Chan-wook", cast:"Choi Min-sik, Yoo Ji-tae" },
      { id:"m6", title:"Prisoners",  year:2013, genre:"Crime/Thriller",    rating:8.1, match:93, tags:["Missing","Desperation","Moral"], synopsis:"A desperate father takes matters into his own hands when his young daughter goes missing, blurring justice and revenge.", streaming:"HBO Max", duration:"153 min", director:"Denis Villeneuve", cast:"Hugh Jackman, Jake Gyllenhaal" },
      { id:"m28", title:"The Silence of the Lambs", year:1991, genre:"Crime/Thriller", rating:8.6, match:97, tags:["Psychological","Serial Killer","Classic"], synopsis:"An FBI trainee seeks help from a brilliant but imprisoned cannibalistic serial killer to catch another killer on the loose.", streaming:"HBO Max", duration:"118 min", director:"Jonathan Demme", cast:"Jodie Foster, Anthony Hopkins" },
      { id:"m29", title:"Get Out",    year:2017, genre:"Horror/Thriller",  rating:7.7, match:91, tags:["Social Commentary","Tension","Twist"], synopsis:"A young African-American visits his white girlfriend's parents for the weekend, where a series of disturbing discoveries await.", streaming:"Amazon Prime", duration:"104 min", director:"Jordan Peele", cast:"Daniel Kaluuya, Allison Williams" },
      { id:"m30", title:"Gone Girl",  year:2014, genre:"Thriller/Mystery",  rating:8.1, match:89, tags:["Marriage","Media","Dark"],       synopsis:"When his wife disappears on their fifth anniversary, a man becomes the prime suspect as media frenzy and secrets unravel.", streaming:"HBO Max", duration:"149 min", director:"David Fincher", cast:"Ben Affleck, Rosamund Pike" },
    ],
    books: [
      { id:"b4", title:"Gone Girl",                       author:"Gillian Flynn",  year:2012, genre:"Psychological Thriller", rating:4.0, match:96, tags:["Marriage","Twist","Unreliable"], synopsis:"When Nick Dunne's wife Amy goes missing on their fifth anniversary, the investigation exposes dark secrets about their marriage.", pages:422 },
      { id:"b5", title:"The Girl with the Dragon Tattoo", author:"Stieg Larsson",  year:2005, genre:"Crime Thriller",          rating:4.1, match:93, tags:["Hacker","Mystery","Sweden"],     synopsis:"A disgraced journalist and brilliant hacker investigate a decades-old disappearance in a powerful Swedish family.", pages:672 },
      { id:"b6", title:"Sharp Objects",                   author:"Gillian Flynn",  year:2006, genre:"Psychological Thriller", rating:3.9, match:90, tags:["Family","Dark","Reporter"],      synopsis:"A journalist with a troubled past returns to her hometown to cover the murders of two young girls, confronting her own demons.", pages:254 },
    ],
  },
  Curious: {
    movies: [
      { id:"m7", title:"Interstellar",          year:2014, genre:"Sci-Fi/Adventure", rating:8.6, match:99, tags:["Space","Time","Emotional"],      synopsis:"A team of astronauts travel through a wormhole near Saturn to find a new home for humanity as Earth's ecosystem collapses.", streaming:"Paramount+", duration:"169 min", director:"Christopher Nolan", cast:"Matthew McConaughey, Anne Hathaway" },
      { id:"m8", title:"2001: A Space Odyssey", year:1968, genre:"Sci-Fi",            rating:8.3, match:95, tags:["Philosophical","HAL","Visionary"], synopsis:"A mysterious monolith found beneath the moon's surface triggers a voyage to Jupiter that may change human evolution forever.", streaming:"Max", duration:"149 min", director:"Stanley Kubrick", cast:"Keir Dullea, Gary Lockwood" },
      { id:"m9", title:"Arrival",               year:2016, genre:"Sci-Fi/Drama",      rating:7.9, match:92, tags:["Language","Time","Alien"],         synopsis:"A linguist is recruited to communicate with alien lifeforms after mysterious spacecraft appear simultaneously worldwide.", streaming:"Netflix", duration:"116 min", director:"Denis Villeneuve", cast:"Amy Adams, Jeremy Renner" },
      { id:"m31", title:"Inception",            year:2010, genre:"Sci-Fi/Thriller",   rating:8.8, match:96, tags:["Dreams","Mind-bending","Visuals"], synopsis:"A thief who steals corporate secrets through dream-sharing technology is given a task to plant an idea in a CEO's mind.", streaming:"HBO Max", duration:"148 min", director:"Christopher Nolan", cast:"Leonardo DiCaprio, Marion Cotillard" },
      { id:"m32", title:"The Matrix",           year:1999, genre:"Sci-Fi/Action",     rating:8.7, match:94, tags:["Reality","Philosophy","Action"],    synopsis:"A computer hacker learns about the true nature of reality and his role in the war against its controllers.", streaming:"Max", duration:"136 min", director:"The Wachowskis", cast:"Keanu Reeves, Laurence Fishburne" },
      { id:"m33", title:"Blade Runner 2049",    year:2017, genre:"Sci-Fi/Noir",       rating:8.0, match:90, tags:["AI","Dystopian","Visual"],       synopsis:"A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.", streaming:"HBO Max", duration:"164 min", director:"Denis Villeneuve", cast:"Ryan Gosling, Harrison Ford" },
    ],
    books: [
      { id:"b7", title:"Sapiens",                              author:"Yuval Noah Harari", year:2011, genre:"Non-Fiction",    rating:4.4, match:98, tags:["History","Humanity","Big Picture"], synopsis:"A sweeping intellectual narrative of human history from the Stone Age through the Scientific Revolution to the present day.", pages:443 },
      { id:"b8", title:"The Hitchhiker's Guide to the Galaxy", author:"Douglas Adams",    year:1979, genre:"Sci-Fi/Comedy",  rating:4.2, match:94, tags:["Absurd","Funny","Space"],          synopsis:"When Earth is demolished for a hyperspace bypass, an ordinary man is whisked into the most improbable adventure in the universe.", pages:193 },
      { id:"b9", title:"Thinking, Fast and Slow",              author:"Daniel Kahneman",  year:2011, genre:"Psychology",     rating:4.1, match:90, tags:["Mind","Bias","Nobel Prize"],        synopsis:"A Nobel laureate explores the two cognitive systems that drive human thought, revealing how we really make decisions.", pages:499 },
    ],
  },
  Playful: {
    movies: [
      { id:"m10", title:"The Grand Budapest Hotel", year:2014, genre:"Comedy/Adventure", rating:8.1, match:97, tags:["Wes Anderson","Quirky","Stylish"], synopsis:"A legendary concierge and his young protégé become entangled in a murder mystery across a whimsical European empire.", streaming:"Disney+", duration:"99 min", director:"Wes Anderson", cast:"Ralph Fiennes, Tony Revolori" },
      { id:"m11", title:"Knives Out",               year:2019, genre:"Mystery/Comedy",   rating:7.9, match:94, tags:["Whodunit","Sharp","Fun"],          synopsis:"A detective investigates the death of a wealthy crime novelist after his entire dysfunctional family gathers for his birthday.", streaming:"Netflix", duration:"130 min", director:"Rian Johnson", cast:"Daniel Craig, Chris Evans" },
      { id:"m12", title:"Paddington 2",             year:2017, genre:"Family/Comedy",     rating:7.8, match:91, tags:["Wholesome","Charming","London"],   synopsis:"The lovable Paddington Bear is framed for theft of a rare pop-up book and must clear his name from prison.", streaming:"Max", duration:"103 min", director:"Paul King", cast:"Ben Whishaw, Hugh Grant" },
      { id:"m34", title:"The Lego Movie",          year:2014, genre:"Animation/Comedy",  rating:7.7, match:89, tags:["Creative","Fun","Surprising"],    synopsis:"An ordinary Lego mini-figure is mistaken for the extraordinary Master Builder and joins a quest to stop an evil tyrant.", streaming:"HBO Max", duration:"100 min", director:"Phil Lord, Chris Miller", cast:"Chris Pratt, Elizabeth Banks" },
      { id:"m35", title:"Spider-Man: Into the Spider-Verse", year:2018, genre:"Animation/Action", rating:8.4, match:92, tags:["Animated","Multiverse","Stylish"], synopsis:"Teen Miles Morales becomes the Spider-Man of his universe and joins forces with spider-powered counterparts from other dimensions.", streaming:"Netflix", duration:"117 min", director:"Bob Persichetti, Peter Ramsey", cast:"Shameik Moore, Jake Johnson" },
      { id:"m36", title:"Airplane!",               year:1980, genre:"Comedy",            rating:7.7, match:87, tags:["Spoof","Absurd","Classic"],       synopsis:"A parody of disaster movies where passengers and crew fall ill and a man with a fear of flying must land the plane.", streaming:"Paramount+", duration:"88 min", director:"Jim Abrahams, David Zucker", cast:"Robert Hays, Leslie Nielsen" },
    ],
    books: [
      { id:"b10", title:"Good Omens",                            author:"Terry Pratchett & Neil Gaiman", year:1990, genre:"Fantasy/Comedy",   rating:4.2, match:96, tags:["Angels","Demons","Hilarious"], synopsis:"An angel and a demon who've grown fond of Earth must team up to prevent the apocalypse in this brilliantly funny novel.", pages:432 },
      { id:"b11", title:"The Hitchhiker's Guide to the Galaxy",  author:"Douglas Adams",                year:1979, genre:"Sci-Fi/Comedy",    rating:4.2, match:93, tags:["Absurd","Space","Classic"],     synopsis:"After Earth is demolished for a hyperspace bypass, Arthur Dent begins the most improbable adventure in the universe.", pages:193 },
      { id:"b12", title:"Catch-22",                              author:"Joseph Heller",                year:1961, genre:"Satirical Fiction", rating:3.9, match:89, tags:["War","Satire","Circular"],      synopsis:"A WWII bombardier tries to be declared insane to avoid flying missions, only to find the bureaucracy is even more insane.", pages:453 },
    ],
  },
  Romantic: {
    movies: [
      { id:"m13", title:"Before Sunrise",    year:1995, genre:"Romance/Drama",   rating:8.1, match:99, tags:["Conversation","Europe","Magic"],   synopsis:"Two strangers meet on a train and spend one perfect night exploring Vienna together, knowing it may be their only chance.", streaming:"HBO Max", duration:"101 min", director:"Richard Linklater", cast:"Ethan Hawke, Julie Delpy" },
      { id:"m14", title:"Pride & Prejudice", year:2005, genre:"Period Romance",  rating:7.8, match:95, tags:["Austen","Period","Witty"],          synopsis:"The spirited Elizabeth Bennet navigates the treacherous landscape of love, class, and pride in Georgian-era England.", streaming:"Netflix", duration:"129 min", director:"Joe Wright", cast:"Keira Knightley, Matthew Macfadyen" },
      { id:"m15", title:"La La Land",        year:2016, genre:"Musical/Romance", rating:8.0, match:92, tags:["Musical","Dreams","Bittersweet"],   synopsis:"A jazz musician and an aspiring actress fall in love while chasing their dreams in modern-day Los Angeles.", streaming:"Netflix", duration:"128 min", director:"Damien Chazelle", cast:"Ryan Gosling, Emma Stone" },
      { id:"m37", title:"The Notebook",      year:2004, genre:"Romance/Drama",   rating:7.8, match:93, tags:["Classic","Emotional","Epic"],       synopsis:"A poor young man falls in love with a wealthy girl in 1940s South Carolina, and their love is tested across decades.", streaming:"Netflix", duration:"123 min", director:"Nick Cassavetes", cast:"Ryan Gosling, Rachel McAdams" },
      { id:"m38", title:"When Harry Met Sally", year:1989, genre:"Romance/Comedy", rating:7.7, match:90, tags:["Friendship","New York","Classic"], synopsis:"Two friends question whether men and women can truly be just friends as their relationship evolves over years.", streaming:"Starz", duration:"96 min", director:"Rob Reiner", cast:"Billy Crystal, Meg Ryan" },
      { id:"m39", title:"Crazy Rich Asians", year:2018, genre:"Romance/Comedy",  rating:6.9, match:88, tags:["Modern","Family","Luxury"],         synopsis:"An American professor travels to Singapore to meet her boyfriend's family and discovers they're incredibly wealthy.", streaming:"HBO Max", duration:"120 min", director:"Jon M. Chu", cast:"Constance Wu, Henry Golding" },
    ],
    books: [
      { id:"b13", title:"Normal People",  author:"Sally Rooney",   year:2018, genre:"Literary Romance",  rating:3.9, match:97, tags:["Modern","Complex","Real"],         synopsis:"Two Irish students from opposite social worlds navigate an intense, on-again-off-again love story over several years.", pages:273 },
      { id:"b14", title:"The Notebook",   author:"Nicholas Sparks", year:1996, genre:"Romance",           rating:3.7, match:93, tags:["Classic","Touching","Simple"],     synopsis:"A poor young man falls in love with a wealthy girl in 1940s South Carolina, and their love is tested across decades.", pages:214 },
      { id:"b15", title:"Outlander",      author:"Diana Gabaldon",  year:1991, genre:"Historical Romance", rating:4.3, match:90, tags:["Time Travel","Scotland","Epic"],   synopsis:"A WWII nurse is mysteriously transported to 18th-century Scotland, falling in love with a Highland warrior.", pages:850 },
    ],
  },
  Inspired: {
    movies: [
      { id:"m16", title:"Dune: Part Two",       year:2024, genre:"Sci-Fi/Epic",  rating:8.5, match:99, tags:["Epic","Destiny","Visuals"],       synopsis:"Paul Atreides unites with Chani and the Fremen on a path of revenge against the conspirators who destroyed his family.", streaming:"Max", duration:"166 min", director:"Denis Villeneuve", cast:"Timothée Chalamet, Zendaya" },
      { id:"m17", title:"Lawrence of Arabia",   year:1962, genre:"Epic/Drama",   rating:8.3, match:95, tags:["Heroism","Desert","Legend"],      synopsis:"The epic true story of T.E. Lawrence, who united Arab tribes in a revolt against the Ottoman Empire during WWI.", streaming:"Amazon Prime", duration:"227 min", director:"David Lean", cast:"Peter O'Toole, Omar Sharif" },
      { id:"m18", title:"2001: A Space Odyssey",year:1968, genre:"Sci-Fi/Epic",  rating:8.3, match:91, tags:["Philosophical","HAL","Visionary"], synopsis:"Kubrick's transcendent vision of humanity's past, present, and cosmic future — from prehistoric bone to the infinite.", streaming:"Max", duration:"149 min", director:"Stanley Kubrick", cast:"Keir Dullea, Gary Lockwood" },
      { id:"m40", title:"The Lord of the Rings: The Return of the King", year:2003, genre:"Fantasy/Epic", rating:9.0, match:98, tags:["Fantasy","Epic","Emotional"], synopsis:"The final chapter of the epic trilogy as the Fellowship faces their ultimate battle against the forces of Sauron.", streaming:"Max", duration:"201 min", director:"Peter Jackson", cast:"Elijah Wood, Viggo Mortensen" },
      { id:"m41", title:"Gladiator",            year:2000, genre:"Action/Epic",   rating:8.5, match:94, tags:["Ancient Rome","Revenge","Honor"],    synopsis:"A Roman general becomes a gladiator and seeks revenge against the corrupt emperor who murdered his family.", streaming:"Paramount+", duration:"155 min", director:"Ridley Scott", cast:"Russell Crowe, Joaquin Phoenix" },
      { id:"m42", title:"Apocalypse Now",       year:1979, genre:"War/Drama",    rating:8.5, match:92, tags:["War","Psychological","Journey"],    synopsis:"During the Vietnam War, a captain is sent on a dangerous mission to assassinate a renegade colonel who has gone insane.", streaming:"Paramount+", duration:"147 min", director:"Francis Ford Coppola", cast:"Martin Sheen, Marlon Brando" },
    ],
    books: [
      { id:"b16", title:"Dune",               author:"Frank Herbert",    year:1965, genre:"Sci-Fi Epic",     rating:4.4, match:98, tags:["Politics","Desert","Destiny"],    synopsis:"A young nobleman navigates politics, religion, ecology, and destiny on a harsh desert planet in this genre-defining masterwork.", pages:688 },
      { id:"b17", title:"The Name of the Wind", author:"Patrick Rothfuss", year:2007, genre:"Fantasy Epic",  rating:4.5, match:94, tags:["Legend","Magic","Scholar"],        synopsis:"The legendary Kvothe recounts his extraordinary life — from homeless child to the most feared wizard of his age.", pages:662 },
      { id:"b18", title:"East of Eden",        author:"John Steinbeck",   year:1952, genre:"Epic Literature", rating:4.4, match:91, tags:["Family","Good vs Evil","America"], synopsis:"Two families across generations are drawn into a timeless struggle between good and evil in California's Salinas Valley.", pages:601 },
    ],
  },
  Cozy: {
    movies: [
      { id:"m19", title:"Julie & Julia", year:2009, genre:"Comedy/Drama",   rating:7.0, match:97, tags:["Food","Warm","Inspiring"],     synopsis:"A blogger decides to cook all 524 recipes from Julia Child's cookbook in 365 days, chronicling her culinary transformation.", streaming:"Netflix", duration:"123 min", director:"Nora Ephron", cast:"Meryl Streep, Amy Adams" },
      { id:"m20", title:"Chef",          year:2014, genre:"Comedy/Drama",   rating:7.3, match:93, tags:["Food Truck","Freedom","Joyful"],synopsis:"After a falling-out with his boss, a renowned chef rediscovers his passion through a cross-country food truck adventure.", streaming:"Netflix", duration:"115 min", director:"Jon Favreau", cast:"Jon Favreau, Sofía Vergara" },
      { id:"m21", title:"Amélie",        year:2001, genre:"Romance/Comedy", rating:8.3, match:90, tags:["Whimsical","Paris","Quirky"],   synopsis:"A shy Parisian waitress with an overactive imagination secretly improves the lives of the people around her.", streaming:"Amazon Prime", duration:"122 min", director:"Jean-Pierre Jeunet", cast:"Audrey Tautou, Mathieu Kassovitz" },
      { id:"m43", title:"The Princess Bride", year:1987, genre:"Adventure/Comedy", rating:8.0, match:95, tags:["Fairy Tale","Romance","Funny"], synopsis:"A grandfather reads his grandson a bedtime story about a farmhand who rescues his true love from an evil prince.", streaming:"Disney+", duration:"98 min", director:"Rob Reiner", cast:"Cary Elwes, Robin Wright" },
      { id:"m44", title:"My Neighbor Totoro", year:1988, genre:"Animation/Family", rating:8.1, match:92, tags:["Ghibli","Wholesome","Magical"], synopsis:"Two sisters move to the countryside and befriend magical forest spirits, including the gentle giant Totoro.", streaming:"Max", duration:"86 min", director:"Hayao Miyazaki", cast:"Chika Sakamoto, Hitoshi Takagi" },
      { id:"m45", title:"The Secret Life of Walter Mitty", year:2013, genre:"Adventure/Comedy", rating:7.3, match:89, tags:["Adventure","Photography","Dreams"], synopsis:"A daydreamer embarks on a real-life adventure to track down a missing photograph, discovering his courage along the way.", streaming:"HBO Max", duration:"114 min", director:"Ben Stiller", cast:"Ben Stiller, Kristen Wiig" },
    ],
    books: [
      { id:"b19", title:"The House in the Cerulean Sea", author:"TJ Klune",       year:2020, genre:"Fantasy/Cozy",  rating:4.3, match:96, tags:["Magical","Found Family","Gentle"],   synopsis:"A caseworker for magical beings is sent to a mysterious orphanage, finding found family and unexpected romance.", pages:396 },
      { id:"b20", title:"Anxious People",               author:"Fredrik Backman", year:2020, genre:"Humour/Drama",  rating:4.1, match:93, tags:["Funny","Touching","Ensemble"],        synopsis:"A bank robbery gone wrong brings together a wildly mismatched group of strangers in an apartment showing.", pages:352 },
      { id:"b21", title:"A Man Called Ove",             author:"Fredrik Backman", year:2012, genre:"Humour/Drama",  rating:4.3, match:90, tags:["Grumpy","Heartwarming","Neighbours"],  synopsis:"A grumpy old man's meticulous plans to end his life keep being disrupted by his chaotic, caring new neighbours.", pages:337 },
    ],
  },
  Dark: {
    movies: [
      { id:"m22", title:"Se7en",               year:1995, genre:"Crime/Thriller", rating:8.6, match:99, tags:["Serial Killer","Sins","Gripping"],  synopsis:"Two detectives hunt a meticulous serial killer who uses the seven deadly sins as his motives in a perpetually rain-soaked city.", streaming:"Netflix", duration:"127 min", director:"David Fincher", cast:"Brad Pitt, Morgan Freeman" },
      { id:"m23", title:"Requiem for a Dream", year:2000, genre:"Drama",           rating:8.3, match:95, tags:["Addiction","Haunting","Visceral"], synopsis:"Four people's addictions spiral out of control in this devastating, visually arresting portrait of broken dreams.", streaming:"Amazon Prime", duration:"102 min", director:"Darren Aronofsky", cast:"Ellen Burstyn, Jared Leto" },
      { id:"m24", title:"No Country for Old Men",year:2007,genre:"Crime/Western",  rating:8.1, match:92, tags:["Fate","Violence","Masterpiece"],   synopsis:"A man stumbles upon a drug deal gone wrong in Texas, triggering pursuit by a relentless, philosophically-minded hitman.", streaming:"Paramount+", duration:"122 min", director:"Coen Brothers", cast:"Javier Bardem, Josh Brolin" },
      { id:"m46", title:"The Dark Knight",    year:2008, genre:"Action/Crime",    rating:9.0, match:98, tags:["Superhero","Psychological","Intense"], synopsis:"Batman faces his greatest challenge as the Joker plunges Gotham into chaos, testing the hero's moral code.", streaming:"HBO Max", duration:"152 min", director:"Christopher Nolan", cast:"Christian Bale, Heath Ledger" },
      { id:"m47", title:"Fight Club",         year:1999, genre:"Drama/Thriller",  rating:8.8, match:95, tags:["Identity","Subversive","Twist"],    synopsis:"An insomniac office worker and a soap salesman form an underground fight club that evolves into something much more dangerous.", streaming:"HBO Max", duration:"139 min", director:"David Fincher", cast:"Brad Pitt, Edward Norton" },
      { id:"m48", title:"There Will Be Blood", year:2007, genre:"Drama/Western",   rating:8.2, match:91, tags:["Greed","Oil","Masterpiece"],      synopsis:"A ruthless oil prospector's relentless pursuit of wealth leads to conflict with a charismatic preacher in early 20th century California.", streaming:"Paramount+", duration:"158 min", director:"Paul Thomas Anderson", cast:"Daniel Day-Lewis, Paul Dano" },
    ],
    books: [
      { id:"b22", title:"Blood Meridian",  author:"Cormac McCarthy",   year:1985, genre:"Western/Literary",  rating:4.0, match:97, tags:["Violent","Philosophical","Epic"],     synopsis:"A savage and poetic masterwork following mercenaries on a brutal killing spree across 1850s Texas and Mexico.", pages:351 },
      { id:"b23", title:"American Psycho", author:"Bret Easton Ellis",  year:1991, genre:"Dark Fiction",       rating:3.9, match:93, tags:["Satire","Disturbing","Wall Street"],  synopsis:"A Manhattan investment banker who may or may not be a serial killer navigates the vapid excess of 1980s New York.", pages:399 },
      { id:"b24", title:"The Road",        author:"Cormac McCarthy",   year:2006, genre:"Post-Apocalyptic",   rating:4.0, match:90, tags:["Survival","Father/Son","Bleak"],       synopsis:"A father and son journey through ash-covered America after an unnamed catastrophe destroyed all of civilisation.", pages:287 },
    ],
  },
};

const ALL_ITEMS = Object.values(DB).flatMap(d => [...d.movies, ...d.books]);

const useLS = (key, init) => {
  const [val, setVal] = useState(() => { try { const s=localStorage.getItem(key); return s?JSON.parse(s):init; } catch{return init;} });
  const set = useCallback(v => { setVal(v); try{localStorage.setItem(key,JSON.stringify(v));}catch{} }, [key]);
  return [val, set];
};

function Stars({ rating, max=5, size=12, color="#f5a623" }) {
  const n = max===10 ? rating/10*5 : rating;
  return (
    <span style={{display:"inline-flex",gap:1,alignItems:"center"}}>
      {[1,2,3,4,5].map(i=><span key={i} style={{fontSize:size,color:i<=Math.round(n)?color:"#252535"}}>★</span>)}
      <span style={{fontSize:size-2,color:"#555",marginLeft:3}}>{rating}{max===10?"/10":"/5"}</span>
    </span>
  );
}

function MatchRing({ pct, color, size=52 }) {
  const r=20, circ=2*Math.PI*r, dash=(pct/100)*circ;
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" style={{flexShrink:0}}>
      <circle cx="25" cy="25" r={r} fill="none" stroke="#1a1a2e" strokeWidth="4.5"/>
      <circle cx="25" cy="25" r={r} fill="none" stroke={color} strokeWidth="4.5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 25 25)" style={{transition:"stroke-dasharray .7s ease"}}/>
      <text x="25" y="30" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif">{pct}%</text>
    </svg>
  );
}

function Card({ item, type, accent, watchlist, watched, userRating, onToggleWatchlist, onToggleWatched, onRate, onSelect }) {
  const [hov, setHov] = useState(false);
  const [hovStar, setHovStar] = useState(0);
  const inList = watchlist.includes(item.id);
  const isDone = watched.includes(item.id);
  const myRate = userRating[item.id]||0;

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      background: hov?`linear-gradient(145deg,${accent}18,${accent}06)`:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))",
      border:`1px solid ${hov?accent+"55":"rgba(255,255,255,0.07)"}`,
      borderRadius:18, padding:18, cursor:"pointer", position:"relative",
      transition:"all .3s ease", transform:hov?"translateY(-5px)":"none",
      boxShadow:hov?`0 20px 50px ${accent}28`:"0 4px 20px rgba(0,0,0,0.4)",
      display:"flex", flexDirection:"column", gap:10, animation:"fadeUp .4s ease both",
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1,paddingRight:8}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.35,marginBottom:3}}>{item.title}</div>
          <div style={{fontSize:11,color:accent}}>{type==="movie"?`${item.year} · ${item.genre}`:item.author}</div>
        </div>
        <MatchRing pct={item.match} color={accent}/>
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {item.tags?.slice(0,3).map(t=>(
          <span key={t} style={{fontSize:10,background:`${accent}20`,color:accent,borderRadius:20,padding:"2px 8px",fontWeight:500}}>{t}</span>
        ))}
      </div>

      <div style={{fontSize:11,color:"#777",lineHeight:1.65}} onClick={()=>onSelect(item,type)}>{item.synopsis.slice(0,95)}…</div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Stars rating={item.rating} max={type==="movie"?10:5}/>
        <span style={{fontSize:10,color:"#444",background:"rgba(255,255,255,0.04)",borderRadius:20,padding:"2px 8px"}}>
          {type==="movie"?`📺 ${item.streaming}`:`📄 ${item.pages}p`}
        </span>
      </div>

      <div style={{display:"flex",gap:3,alignItems:"center"}}>
        <span style={{fontSize:10,color:"#444",marginRight:3}}>Rate:</span>
        {[1,2,3,4,5].map(i=>(
          <span key={i}
            onMouseEnter={()=>setHovStar(i)} onMouseLeave={()=>setHovStar(0)}
            onClick={e=>{e.stopPropagation();onRate(item.id,i);}}
            style={{fontSize:16,cursor:"pointer",color:i<=(hovStar||myRate)?"#f5a623":"#222",transition:"color .12s,transform .12s",transform:i<=(hovStar||myRate)?"scale(1.2)":"scale(1)",display:"inline-block"}}>★</span>
        ))}
        {myRate>0&&<span style={{fontSize:10,color:"#f5a623",marginLeft:3}}>({myRate}/5)</span>}
      </div>

      <div style={{display:"flex",gap:7,marginTop:2}}>
        <button onClick={e=>{e.stopPropagation();onToggleWatchlist(item.id);}} style={{
          flex:1,background:inList?`${accent}30`:"rgba(255,255,255,0.05)",
          border:`1px solid ${inList?accent+"55":"rgba(255,255,255,0.08)"}`,
          borderRadius:10,color:inList?accent:"#555",padding:"7px 4px",fontSize:11,cursor:"pointer",fontWeight:600,transition:"all .2s"
        }}>{inList?"♥ Saved":"♡ Save"}</button>
        <button onClick={e=>{e.stopPropagation();onToggleWatched(item.id);}} style={{
          flex:1,background:isDone?"#2ecc7128":"rgba(255,255,255,0.05)",
          border:`1px solid ${isDone?"#2ecc7155":"rgba(255,255,255,0.08)"}`,
          borderRadius:10,color:isDone?"#2ecc71":"#555",padding:"7px 4px",fontSize:11,cursor:"pointer",fontWeight:600,transition:"all .2s"
        }}>{isDone?(type==="movie"?"✓ Watched":"✓ Read"):(type==="movie"?"○ Watched":"○ Read")}</button>
        <button onClick={e=>{e.stopPropagation();onSelect(item,type);}} style={{
          background:`${accent}22`,border:`1px solid ${accent}44`,
          borderRadius:10,color:accent,padding:"7px 12px",fontSize:13,cursor:"pointer",fontWeight:700
        }}>→</button>
      </div>
    </div>
  );
}

function DetailModal({ item, type, accent, onClose, onToggleWatchlist, onToggleWatched, watchlist, watched }) {
  if(!item) return null;
  const inList = watchlist.includes(item.id);
  const isDone = watched.includes(item.id);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(16px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(145deg,#141824,#0c1018)",
        border:`1px solid ${accent}44`,borderRadius:24,padding:36,
        maxWidth:560,width:"100%",animation:"popIn .3s ease",
        boxShadow:`0 60px 120px ${accent}28,0 0 0 1px ${accent}11`,
        maxHeight:"90vh",overflowY:"auto"
      }}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:22,color:"#fff",marginBottom:6,fontWeight:700,lineHeight:1.3}}>{item.title}</div>
        <div style={{color:accent,fontSize:13,marginBottom:14}}>
          {type==="movie"?`${item.year} · ${item.genre} · ⏱ ${item.duration}`:`${item.author} · ${item.year} · ${item.genre} · ${item.pages} pages`}
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
          {item.tags?.map(t=><span key={t} style={{fontSize:11,background:`${accent}22`,color:accent,borderRadius:20,padding:"3px 10px"}}>{t}</span>)}
        </div>
        <div style={{background:`${accent}0e`,border:`1px solid ${accent}22`,borderRadius:14,padding:18,marginBottom:18}}>
          <div style={{fontSize:10,color:accent,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>🧠 LLM Analysis</div>
          <div style={{color:"#bbb",fontSize:13,lineHeight:1.85}}>{item.synopsis}</div>
        </div>
        {type==="movie"&&<div style={{color:"#444",fontSize:12,marginBottom:18,lineHeight:1.8}}>🎬 <span style={{color:"#777"}}>{item.director}</span> &nbsp;·&nbsp; 👥 <span style={{color:"#777"}}>{item.cast}</span></div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          {type==="movie"?(
            <>
              <button style={{background:accent,border:"none",borderRadius:12,color:"#fff",padding:13,fontSize:13,fontWeight:700,cursor:"pointer"}}>▶ Watch Trailer</button>
              <button style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,color:"#ccc",padding:13,fontSize:13,cursor:"pointer"}}>📺 {item.streaming}</button>
            </>
          ):(
            <>
              <button style={{background:accent,border:"none",borderRadius:12,color:"#fff",padding:13,fontSize:13,fontWeight:700,cursor:"pointer"}}>📖 Goodreads</button>
              <button style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,color:"#ccc",padding:13,fontSize:13,cursor:"pointer"}}>🛒 Find Online</button>
            </>
          )}
          <button onClick={()=>onToggleWatchlist(item.id)} style={{background:inList?`${accent}30`:"rgba(255,255,255,0.06)",border:`1px solid ${inList?accent+"55":"rgba(255,255,255,0.08)"}`,borderRadius:12,color:inList?accent:"#777",padding:13,fontSize:13,cursor:"pointer",fontWeight:600}}>{inList?"♥ Saved":"♡ Save to List"}</button>
          <button onClick={()=>onToggleWatched(item.id)} style={{background:isDone?"#2ecc7120":"rgba(255,255,255,0.06)",border:`1px solid ${isDone?"#2ecc7144":"rgba(255,255,255,0.08)"}`,borderRadius:12,color:isDone?"#2ecc71":"#777",padding:13,fontSize:13,cursor:"pointer",fontWeight:600}}>{isDone?(type==="movie"?"✓ Watched":"✓ Read"):(type==="movie"?"○ Mark Watched":"○ Mark Read")}</button>
        </div>
        <button onClick={onClose} style={{width:"100%",background:"transparent",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,color:"#444",padding:11,fontSize:13,cursor:"pointer"}}>✕ Close</button>
      </div>
    </div>
  );
}

function AIChatPanel({ accent, onClose, context }) {
  const [msgs, setMsgs] = useState([{ role:"assistant", text:`Hey ${context.user}! 🎬 I'm your AI guide. You're feeling **${context.mood}** — great taste! Ask me anything: why I picked something, what to watch after, hidden gems, or anything else.` }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = async () => {
    if(!input.trim()||thinking) return;
    const userMsg=input.trim(); setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]); setThinking(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:400,
          system:`You are MoodCurator's AI assistant — a world-class movie and book expert with warm, insightful taste. The user's current mood is: ${context.mood}. Their name is ${context.user}. They have ${context.savedCount} saved items. Keep replies to 2-4 sentences max, use occasional emojis, be enthusiastic and specific.`,
          messages:[...msgs.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text})),{role:"user",content:userMsg}]
        })
      });
      const data=await res.json();
      const text=data.content?.map(c=>c.text||"").join("")||"Something went wrong, sorry!";
      setMsgs(m=>[...m,{role:"assistant",text}]);
    } catch {
      setMsgs(m=>[...m,{role:"assistant",text:"Connection hiccup! But whatever you're in the mood for — there's a perfect story out there for you 📚✨"}]);
    }
    setThinking(false);
  };

  const suggestions = ["Why did you pick these?","What's similar to Dune?","Best hidden gems?","What should I watch tonight?"];

  return (
    <div style={{position:"fixed",right:24,bottom:100,width:360,zIndex:800,background:"linear-gradient(145deg,#141824,#0c1018)",border:`1px solid ${accent}44`,borderRadius:20,overflow:"hidden",boxShadow:`0 40px 100px rgba(0,0,0,0.8),0 0 0 1px ${accent}11`,animation:"slideIn .35s ease",display:"flex",flexDirection:"column",maxHeight:500}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${accent}22`,display:"flex",justifyContent:"space-between",alignItems:"center",background:`${accent}0d`}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>🤖 AI Assistant</div>
          <div style={{fontSize:10,color:accent}}>Powered by Claude · {context.mood} mode</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"88%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?accent:"rgba(255,255,255,0.07)",color:"#fff",fontSize:13,lineHeight:1.65}}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking&&<div style={{display:"flex",gap:4,padding:"10px 14px",background:"rgba(255,255,255,0.07)",borderRadius:"16px 16px 16px 4px",width:"fit-content"}}>
          {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:accent,animation:`pulse 1.2s ${i*.2}s infinite`}}/>)}
        </div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:"8px 12px",display:"flex",gap:6,flexWrap:"wrap",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        {suggestions.map(s=>(
          <button key={s} onClick={()=>{ setInput(s); }} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,color:"#888",padding:"4px 10px",fontSize:10,cursor:"pointer"}}>{s}</button>
        ))}
      </div>
      <div style={{padding:"10px 12px",display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Ask anything…"
          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#fff",padding:"9px 14px",fontSize:13,outline:"none",fontFamily:"Inter,sans-serif"}}/>
        <button onClick={send} disabled={thinking} style={{background:thinking?"#333":accent,border:"none",borderRadius:12,color:"#fff",padding:"9px 14px",cursor:"pointer",fontWeight:700,fontSize:13,transition:"background .2s"}}>→</button>
      </div>
    </div>
  );
}

function StatsScreen({ watchlist, watched, userRating, moodHistory, onBack, accent }) {
  const ratings=Object.values(userRating);
  const avgRating=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):"—";
  const moodCounts=moodHistory.reduce((a,m)=>{a[m]=(a[m]||0)+1;return a;},{});
  const topMood=Object.entries(moodCounts).sort((a,b)=>b[1]-a[1])[0];
  const maxCount=Math.max(...Object.values(moodCounts),1);

  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <button onClick={onBack} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#ccc",padding:"8px 18px",cursor:"pointer",fontSize:13,marginBottom:28}}>← Back</button>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:26,color:"#fff",marginBottom:4}}>Your Taste Profile</div>
      <div style={{color:"#555",fontSize:13,marginBottom:28}}>A snapshot of your MoodCurator journey</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
        {[{label:"Saved",value:watchlist.length,icon:"♥",c:"#e91e8c"},{label:"Completed",value:watched.length,icon:"✓",c:"#2ecc71"},{label:"Avg Rating",value:avgRating,icon:"★",c:"#f5a623"},{label:"Sessions",value:moodHistory.length,icon:"🧠",c:accent}].map(s=>(
          <div key={s.label} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"20px 16px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:28,color:s.c,fontWeight:700}}>{s.value}</div>
            <div style={{fontSize:11,color:"#555",marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      {moodHistory.length>0&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:20,marginBottom:14}}>
          <div style={{fontSize:11,color:"#444",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Mood History</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
            {[...moodHistory].reverse().slice(0,12).map((m,i)=>{const mood=MOODS.find(x=>x.label===m);return(
              <div key={i} style={{background:`${mood?.color||"#fff"}1a`,border:`1px solid ${mood?.color||"#fff"}33`,borderRadius:20,padding:"4px 12px",fontSize:12,color:mood?.color||"#fff"}}>{mood?.emoji} {m}</div>
            );})}
          </div>
          {topMood&&<div style={{fontSize:12,color:"#555"}}>Favourite mood: <span style={{color:MOODS.find(m=>m.label===topMood[0])?.color||"#fff",fontWeight:600}}>{topMood[0]} ({topMood[1]}×)</span></div>}
        </div>
      )}
      {Object.keys(moodCounts).length>1&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:20}}>
          <div style={{fontSize:11,color:"#444",letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Mood Frequency Chart</div>
          {Object.entries(moodCounts).sort((a,b)=>b[1]-a[1]).map(([m,c])=>{
            const mood=MOODS.find(x=>x.label===m);
            return(
              <div key={m} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:100,fontSize:12,color:"#999",flexShrink:0}}>{mood?.emoji} {m}</div>
                <div style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:4,height:10,overflow:"hidden"}}>
                  <div style={{width:`${(c/maxCount)*100}%`,height:"100%",background:`linear-gradient(90deg,${mood?.color||"#fff"},${mood?.color||"#fff"}88)`,borderRadius:4,transition:"width .7s ease"}}/>
                </div>
                <div style={{fontSize:12,color:"#555",width:16,textAlign:"right"}}>{c}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen,       setScreen]       = useState("login");
  const [user,         setUser]         = useState("");
  const [inputName,    setInputName]    = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTab,    setActiveTab]    = useState("movies");
  const [selItem,      setSelItem]      = useState(null);
  const [selType,      setSelType]      = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [moodInput,    setMoodInput]    = useState("");
  const [searchQ,      setSearchQ]      = useState("");
  const [filterGenre,  setFilterGenre]  = useState("All");
  const [filterStream, setFilterStream] = useState("All");
  const [showChat,     setShowChat]     = useState(false);
  const [viewMode,     setViewMode]     = useState("grid");
  const [subScreen,    setSubScreen]    = useState("recs");
  const [surpriseAnim, setSurpriseAnim] = useState(false);
  const [wlTab,        setWlTab]        = useState("saved");

  const [watchlist,   setWatchlist]   = useLS("mc3_watchlist", []);
  const [watched,     setWatched]     = useLS("mc3_watched", []);
  const [userRating,  setUserRating]  = useLS("mc3_ratings", {});
  const [moodHistory, setMoodHistory] = useLS("mc3_moodhistory", []);

  const accent  = MOODS.find(m=>m.label===selectedMood)?.color||"#4a90d9";
  const moodObj = MOODS.find(m=>m.label===selectedMood);
  const data    = selectedMood ? DB[selectedMood]||DB.Curious : null;

  const toggleWatchlist = id => setWatchlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const toggleWatched   = id => setWatched(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const rateItem        = (id,stars) => setUserRating(r=>({...r,[id]:r[id]===stars?0:stars}));

  const handleMoodSelect = mood => {
    setSelectedMood(mood.label);
    setMoodHistory(h=>[...h,mood.label]);
    setSearchQ(""); setFilterGenre("All"); setFilterStream("All"); setActiveTab("movies");
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setScreen("results"); setSubScreen("recs"); }, 1700);
  };

  const handleSurprise = () => { setSurpriseAnim(true); setTimeout(()=>{ setSurpriseAnim(false); handleMoodSelect(MOODS[Math.floor(Math.random()*MOODS.length)]); },700); };
  const handleMoodText = () => { if(!moodInput.trim()) return; const inp=moodInput.toLowerCase(); const match=MOODS.find(m=>inp.includes(m.label.toLowerCase())||inp.includes(m.desc.split(" ")[0].toLowerCase()))||MOODS[Math.floor(Math.random()*MOODS.length)]; handleMoodSelect(match); };

  const genres  = data ? [...new Set((activeTab==="movies"?data.movies:data.books).map(i=>i.genre))] : [];
  const streams = data ? [...new Set(data.movies.map(i=>i.streaming))] : [];
  const items   = data ? (activeTab==="movies"?data.movies:data.books).filter(item=>{
    const q=searchQ.toLowerCase();
    return (!q||item.title.toLowerCase().includes(q)||item.synopsis.toLowerCase().includes(q)||(item.author||"").toLowerCase().includes(q)||item.tags?.some(t=>t.toLowerCase().includes(q)))
      && (filterGenre==="All"||item.genre===filterGenre)
      && (filterStream==="All"||activeTab!=="movies"||item.streaming===filterStream);
  }) : [];

  const savedItems   = ALL_ITEMS.filter(i=>watchlist.includes(i.id));
  const watchedItems = ALL_ITEMS.filter(i=>watched.includes(i.id));

  const BG = (
    <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 20% 40%, ${accent}14 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, ${accent}0a 0%, transparent 50%), linear-gradient(160deg,#06080f,#03040a)`,transition:"background .9s ease"}}/>
      {[...Array(18)].map((_,i)=>(
        <div key={i} style={{position:"absolute",borderRadius:"50%",background:accent,opacity:.12,
          width:2+Math.random()*4,height:2+Math.random()*4,
          left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
          animation:`float ${10+Math.random()*14}s ${Math.random()*8}s ease-in-out infinite alternate`}}/>
      ))}
    </div>
  );

  const wrap = {position:"relative",minHeight:"100vh",background:"#060810",fontFamily:"Inter,sans-serif",color:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"};

  // ── LOGIN ──────────────────────────────────────────────
  if(screen==="login") return (
    <div style={wrap}>
      <style>{GLOBAL_CSS}</style>
      {BG}
      <div style={{position:"relative",zIndex:1,textAlign:"center",background:"linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))",border:"1px solid rgba(255,255,255,0.09)",borderRadius:28,padding:"52px 44px",maxWidth:420,width:"90%",backdropFilter:"blur(28px)",boxShadow:"0 50px 120px rgba(0,0,0,0.65)",animation:"popIn .6s ease"}}>
        <div style={{width:74,height:74,borderRadius:"50%",background:"linear-gradient(135deg,#4a90d9,#9b59b6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 20px",boxShadow:"0 14px 40px #4a90d944",animation:"float 4s ease-in-out infinite"}}>🧠</div>
        <div style={{fontSize:10,letterSpacing:4,color:"#4a90d9",fontWeight:600,textTransform:"uppercase",marginBottom:10}}>LLM Curation Engine</div>
        <h1 style={{fontFamily:"'Cinzel',serif",fontSize:30,fontWeight:900,margin:"0 0 6px",background:"linear-gradient(135deg,#fff,#777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>MoodCurator</h1>
        <p style={{color:"#555",fontSize:14,marginBottom:36,lineHeight:1.75}}>AI-powered movies & books<br/>matched to how you feel right now</p>
        <input value={inputName} onChange={e=>setInputName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&inputName.trim()&&(setUser(inputName.trim()),setScreen("mood"))} placeholder="What's your name?" autoFocus
          style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,color:"#fff",padding:"14px 18px",fontSize:15,outline:"none",marginBottom:14,fontFamily:"Inter,sans-serif",textAlign:"center"}}/>
        <button onClick={()=>inputName.trim()&&(setUser(inputName.trim()),setScreen("mood"))} style={{width:"100%",background:"linear-gradient(135deg,#4a90d9,#357abd)",border:"none",borderRadius:14,color:"#fff",padding:14,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 32px #4a90d948",transition:"transform .15s"}}
          onMouseDown={e=>e.currentTarget.style.transform="scale(.97)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}>
          Start Exploring →
        </button>
        <div style={{marginTop:22,display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          {["🎬 Movies","📚 Books","🤖 AI Chat","♥ Watchlist","📊 Stats"].map(f=><span key={f} style={{fontSize:11,color:"#2a2a3a"}}>{f}</span>)}
        </div>
      </div>
    </div>
  );

  // ── LOADING ────────────────────────────────────────────
  if(loading) return (
    <div style={wrap}>
      <style>{GLOBAL_CSS}</style>
      {BG}
      <div style={{zIndex:1,textAlign:"center",animation:"fadeUp .4s ease"}}>
        <div style={{fontSize:64,animation:"float 1.4s ease-in-out infinite",marginBottom:24}}>{moodObj?.emoji||"🧠"}</div>
        <div style={{width:54,height:54,borderRadius:"50%",border:`3px solid ${accent}22`,borderTop:`3px solid ${accent}`,animation:"spin 1s linear infinite",margin:"0 auto 22px"}}/>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:"#fff",marginBottom:8}}>Curating your experience…</div>
        <div style={{color:"#444",fontSize:13}}>Analysing {selectedMood} mood · Ranking 48 titles · Finding perfect matches</div>
      </div>
    </div>
  );

  // ── MOOD SELECT ────────────────────────────────────────
  if(screen==="mood") return (
    <div style={{...wrap,justifyContent:"flex-start",padding:"36px 24px 64px"}}>
      <style>{GLOBAL_CSS}</style>
      {BG}
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:740,animation:"fadeUp .5s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:40}}>
          <div>
            <div style={{fontSize:10,color:"#4a90d9",letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Welcome back</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:24,fontWeight:700}}>Hello, {user} 👋</div>
          </div>
          {selectedMood&&<button onClick={()=>setScreen("results")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,color:"#aaa",padding:"8px 16px",cursor:"pointer",fontSize:13}}>← Back to {selectedMood}</button>}
        </div>

        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,marginBottom:5}}>How are you feeling right now?</div>
        <div style={{color:"#555",fontSize:13,marginBottom:26}}>Pick a mood or describe it — the AI engine does the rest</div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:22}}>
          {MOODS.map(mood=>(
            <div key={mood.label} onClick={()=>handleMoodSelect(mood)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"20px 10px",textAlign:"center",cursor:"pointer",transition:"all .25s",position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${mood.color}77`;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 14px 36px ${mood.color}33`;}}
              onMouseLeave={e=>{e.currentTarget.style.border="1px solid rgba(255,255,255,0.07)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              {selectedMood===mood.label&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:mood.color}}/>}
              <div style={{fontSize:32,marginBottom:8}}>{mood.emoji}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:2}}>{mood.label}</div>
              <div style={{fontSize:10,color:"#555"}}>{mood.desc}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,padding:"4px 4px 4px 16px",display:"flex",alignItems:"center",gap:10}}>
            <input value={moodInput} onChange={e=>setMoodInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleMoodText()}
              placeholder="Describe your mood… e.g. 'I want something hopeful but bittersweet'"
              style={{flex:1,background:"transparent",border:"none",color:"#fff",fontSize:13,outline:"none",fontFamily:"Inter,sans-serif",padding:"10px 0"}}/>
            <button onClick={handleMoodText} style={{background:"#4a90d9",border:"none",borderRadius:12,color:"#fff",padding:"10px 18px",cursor:"pointer",fontWeight:700,fontSize:13}}>→</button>
          </div>
          <button onClick={handleSurprise} title="Surprise me!" style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,color:"#fff",padding:"0 20px",cursor:"pointer",fontSize:20,transition:"transform .4s ease",transform:surpriseAnim?"rotate(360deg) scale(1.3)":"none"}}>🎲</button>
        </div>

        {moodHistory.length>0&&(
          <div>
            <div style={{fontSize:11,color:"#333",marginBottom:8}}>Recent moods:</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[...new Set([...moodHistory].reverse())].slice(0,6).map(m=>{const mood=MOODS.find(x=>x.label===m);return(
                <button key={m} onClick={()=>handleMoodSelect(mood)} style={{background:`${mood.color}18`,border:`1px solid ${mood.color}44`,borderRadius:20,padding:"4px 12px",color:mood.color,fontSize:12,cursor:"pointer"}}>{mood.emoji} {m}</button>
              );})}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULTS ────────────────────────────────────────────
  return (
    <div style={{...wrap,justifyContent:"flex-start",padding:"26px 20px 80px",alignItems:"stretch"}}>
      <style>{GLOBAL_CSS}</style>
      {BG}

      {selItem&&<DetailModal item={selItem} type={selType} accent={accent} onClose={()=>{setSelItem(null);setSelType(null);}} onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} watchlist={watchlist} watched={watched}/>}
      {showChat&&<AIChatPanel accent={accent} onClose={()=>setShowChat(false)} context={{mood:selectedMood,user,savedCount:watchlist.length}}/>}

      {/* Floating AI chat button */}
      <button onClick={()=>setShowChat(c=>!c)} style={{position:"fixed",right:24,bottom:28,zIndex:700,background:showChat?"#444":accent,border:"none",borderRadius:"50%",width:56,height:56,fontSize:22,cursor:"pointer",boxShadow:`0 8px 30px ${accent}66`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
        {showChat?"✕":"🤖"}
      </button>

      <div style={{position:"relative",zIndex:1,maxWidth:980,width:"100%",margin:"0 auto"}}>
        {/* Top nav */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:10,color:accent,letterSpacing:3,textTransform:"uppercase"}}>🧠 MoodCurator</div>
            <div style={{width:1,height:14,background:"rgba(255,255,255,0.1)"}}/>
            <div style={{fontSize:13,color:"#444"}}>{user}</div>
            {moodObj&&<div style={{background:`${accent}22`,border:`1px solid ${accent}33`,borderRadius:20,padding:"3px 10px",fontSize:12,color:accent}}>{moodObj.emoji} {selectedMood}</div>}
          </div>
          <div style={{display:"flex",gap:7}}>
            <button onClick={()=>setSubScreen("recs")}    style={{background:subScreen==="recs"?`${accent}22`:"rgba(255,255,255,0.05)",border:`1px solid ${subScreen==="recs"?accent+"44":"rgba(255,255,255,0.08)"}`,borderRadius:10,color:subScreen==="recs"?accent:"#666",padding:"7px 14px",cursor:"pointer",fontSize:12}}>🎬 Picks</button>
            <button onClick={()=>setSubScreen("watchlist")} style={{background:subScreen==="watchlist"?`${accent}22`:"rgba(255,255,255,0.05)",border:`1px solid ${subScreen==="watchlist"?accent+"44":"rgba(255,255,255,0.08)"}`,borderRadius:10,color:subScreen==="watchlist"?accent:"#666",padding:"7px 14px",cursor:"pointer",fontSize:12}}>♥ {watchlist.length}</button>
            <button onClick={()=>setSubScreen("stats")}   style={{background:subScreen==="stats"?`${accent}22`:"rgba(255,255,255,0.05)",border:`1px solid ${subScreen==="stats"?accent+"44":"rgba(255,255,255,0.08)"}`,borderRadius:10,color:subScreen==="stats"?accent:"#666",padding:"7px 14px",cursor:"pointer",fontSize:12}}>📊</button>
            <button onClick={()=>setScreen("mood")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#888",padding:"7px 14px",cursor:"pointer",fontSize:12}}>🎭 Mood</button>
          </div>
        </div>

        {/* STATS */}
        {subScreen==="stats"&&<StatsScreen watchlist={watchlist} watched={watched} userRating={userRating} moodHistory={moodHistory} onBack={()=>setSubScreen("recs")} accent={accent}/>}

        {/* WATCHLIST */}
        {subScreen==="watchlist"&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:22,marginBottom:4}}>♥ Your Lists</div>
            <div style={{color:"#555",fontSize:13,marginBottom:22}}>{savedItems.length} saved · {watchedItems.length} completed</div>
            <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:3,width:"fit-content"}}>
              {[["saved","♥ Saved"],["done","✓ Completed"]].map(([k,l])=>(
                <button key={k} onClick={()=>setWlTab(k)} style={{background:wlTab===k?accent:"transparent",border:"none",borderRadius:10,color:wlTab===k?"#fff":"#555",padding:"7px 20px",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s",boxShadow:wlTab===k?`0 4px 16px ${accent}55`:"none"}}>{l}</button>
              ))}
            </div>
            {(wlTab==="done"?watchedItems:savedItems).length===0?(
              <div style={{textAlign:"center",padding:60,color:"#2a2a3a"}}>
                <div style={{fontSize:48,marginBottom:12}}>{wlTab==="done"?"✓":"♥"}</div>
                <div style={{color:"#333",fontSize:14}}>Nothing here yet. Start exploring and save your favourites!</div>
                <button onClick={()=>setSubScreen("recs")} style={{marginTop:20,background:`${accent}22`,border:`1px solid ${accent}44`,borderRadius:20,color:accent,padding:"10px 24px",cursor:"pointer",fontSize:13}}>Browse Picks →</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
                {(wlTab==="done"?watchedItems:savedItems).map((item,i)=>{
                  const isMov=Object.values(DB).some(d=>d.movies.some(m=>m.id===item.id));
                  const moodKey=Object.keys(DB).find(k=>[...DB[k].movies,...DB[k].books].some(x=>x.id===item.id));
                  const iAccent=MOODS.find(m=>m.label===moodKey)?.color||accent;
                  return(
                    <div key={item.id} style={{animationDelay:`${i*.05}s`}}>
                      <Card item={item} type={isMov?"movie":"book"} accent={iAccent} watchlist={watchlist} watched={watched} userRating={userRating}
                        onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} onRate={rateItem}
                        onSelect={(it,tp)=>{setSelItem(it);setSelType(tp);}}/>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {subScreen==="recs"&&data&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            {/* Mood banner */}
            <div style={{background:`linear-gradient(135deg,${accent}18,${accent}07)`,border:`1px solid ${accent}33`,borderRadius:20,padding:"22px 26px",marginBottom:22,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
              <div style={{fontSize:48}}>{moodObj?.emoji}</div>
              <div style={{flex:1,minWidth:180}}>
                <div style={{fontSize:10,color:accent,letterSpacing:2,textTransform:"uppercase",marginBottom:3}}>Curated for {user}</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:900,marginBottom:3}}>{selectedMood} Picks</div>
                <div style={{color:"#666",fontSize:12}}>{moodObj?.desc} · 6 AI-ranked picks · Switch tabs to see more</div>
              </div>
              <div style={{display:"flex",gap:16,flexShrink:0}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:26,color:accent,fontWeight:900}}>
                    {items.length>0?Math.round(items.reduce((a,i)=>a+i.match,0)/items.length):"-"}%
                  </div>
                  <div style={{fontSize:10,color:"#555"}}>Avg Match</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:26,color:"#2ecc71",fontWeight:900}}>{watched.length}</div>
                  <div style={{fontSize:10,color:"#555"}}>Completed</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{display:"flex",gap:9,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
              <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:3,flexShrink:0}}>
                {["movies","books"].map(t=>(
                  <button key={t} onClick={()=>{setActiveTab(t);setFilterGenre("All");setFilterStream("All");}} style={{background:activeTab===t?accent:"transparent",border:"none",borderRadius:10,color:activeTab===t?"#fff":"#555",padding:"7px 18px",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .25s",boxShadow:activeTab===t?`0 4px 16px ${accent}55`:"none"}}>
                    {t==="movies"?"🎬 Movies":"📚 Books"}
                  </button>
                ))}
              </div>
              <div style={{flex:1,minWidth:160,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,display:"flex",alignItems:"center",padding:"0 14px",gap:8}}>
                <span style={{color:"#333",fontSize:13}}>🔍</span>
                <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search…"
                  style={{flex:1,background:"transparent",border:"none",color:"#fff",fontSize:13,outline:"none",fontFamily:"Inter,sans-serif",padding:"9px 0"}}/>
                {searchQ&&<button onClick={()=>setSearchQ("")} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:14}}>✕</button>}
              </div>
              <select value={filterGenre} onChange={e=>setFilterGenre(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#bbb",padding:"9px 12px",fontSize:12,cursor:"pointer",outline:"none"}}>
                <option>All</option>{genres.map(g=><option key={g}>{g}</option>)}
              </select>
              {activeTab==="movies"&&<select value={filterStream} onChange={e=>setFilterStream(e.target.value)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#bbb",padding:"9px 12px",fontSize:12,cursor:"pointer",outline:"none"}}>
                <option>All</option>{streams.map(s=><option key={s}>{s}</option>)}
              </select>}
              <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:3,flexShrink:0}}>
                {[["grid","⊞"],["list","☰"]].map(([m,ic])=>(
                  <button key={m} onClick={()=>setViewMode(m)} style={{background:viewMode===m?"rgba(255,255,255,0.12)":"transparent",border:"none",borderRadius:8,color:viewMode===m?"#fff":"#444",padding:"6px 10px",cursor:"pointer",fontSize:14}}>{ic}</button>
                ))}
              </div>
            </div>

            <div style={{fontSize:11,color:"#333",marginBottom:14}}>{items.length} result{items.length!==1?"s":""}{searchQ?` for "${searchQ}"`:""}</div>

            {items.length===0?(
              <div style={{textAlign:"center",padding:60}}>
                <div style={{fontSize:40,marginBottom:12}}>🔍</div>
                <div style={{color:"#333",fontSize:14}}>No results. Try clearing your filters.</div>
              </div>
            ) : viewMode==="grid" ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
                {items.map((item,i)=>(
                  <div key={item.id} style={{animationDelay:`${i*.07}s`}}>
                    <Card item={item} type={activeTab==="movies"?"movie":"book"} accent={accent}
                      watchlist={watchlist} watched={watched} userRating={userRating}
                      onToggleWatchlist={toggleWatchlist} onToggleWatched={toggleWatched} onRate={rateItem}
                      onSelect={(it,tp)=>{setSelItem(it);setSelType(tp);}}/>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {items.map((item,i)=>(
                  <div key={item.id} onClick={()=>{setSelItem(item);setSelType(activeTab==="movies"?"movie":"book");}} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:16,cursor:"pointer",transition:"all .2s",animationDelay:`${i*.04}s`}}
                    onMouseEnter={e=>e.currentTarget.style.border=`1px solid ${accent}44`}
                    onMouseLeave={e=>e.currentTarget.style.border="1px solid rgba(255,255,255,0.07)"}>
                    <MatchRing pct={item.match} color={accent} size={44}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#fff",marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.title}</div>
                      <div style={{fontSize:11,color:accent}}>{activeTab==="movies"?`${item.year} · ${item.genre}`:item.author}</div>
                    </div>
                    <Stars rating={item.rating} max={activeTab==="movies"?10:5}/>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button onClick={e=>{e.stopPropagation();toggleWatchlist(item.id);}} style={{background:watchlist.includes(item.id)?`${accent}33`:"rgba(255,255,255,0.05)",border:`1px solid ${watchlist.includes(item.id)?accent+"55":"rgba(255,255,255,0.08)"}`,borderRadius:8,color:watchlist.includes(item.id)?accent:"#555",padding:"5px 10px",cursor:"pointer",fontSize:12}}>{watchlist.includes(item.id)?"♥":"♡"}</button>
                      <button onClick={e=>{e.stopPropagation();toggleWatched(item.id);}} style={{background:watched.includes(item.id)?"#2ecc7122":"rgba(255,255,255,0.05)",border:`1px solid ${watched.includes(item.id)?"#2ecc7155":"rgba(255,255,255,0.08)"}`,borderRadius:8,color:watched.includes(item.id)?"#2ecc71":"#555",padding:"5px 10px",cursor:"pointer",fontSize:12}}>{watched.includes(item.id)?"✓":"○"}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{textAlign:"center",marginTop:44}}>
              <button onClick={()=>setScreen("mood")} style={{background:`${accent}18`,border:`1px solid ${accent}33`,borderRadius:20,color:accent,padding:"12px 30px",cursor:"pointer",fontSize:14,fontWeight:600}}>🎭 Try a Different Mood</button>
            </div>
          </div>
        )}

        <div style={{textAlign:"center",marginTop:30,color:"#1a1a2a",fontSize:11}}>MoodCurator · Powered by Claude · {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}
