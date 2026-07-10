import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || '';

// Comprehensive fallback educational content database with trailers and platforms
const EDUCATIONAL_MOVIE_DATABASE = {
  science: [
    { id: 1001, title: 'Cosmos: A Spacetime Odyssey', overview: 'A journey through the universe exploring the nature of space, time, and life.', poster_path: '/placeholder.jpg', vote_average: 9.0, release_date: '2014-03-09', trailer: 'https://www.youtube.com/watch?v=CbIZUc3oKxM', platforms: ['Netflix', 'Hulu', 'Amazon Prime'] },
    { id: 1002, title: 'The Theory of Everything', overview: 'The story of Stephen Hawking and his groundbreaking work in physics.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2014-11-07', trailer: 'https://www.youtube.com/watch?v=Salz7u0pGno', platforms: ['Netflix', 'Amazon Prime', 'Apple TV'] },
    { id: 1003, title: 'Interstellar', overview: 'A team of explorers travel through a wormhole in search of a new habitable planet.', poster_path: '/placeholder.jpg', vote_average: 8.6, release_date: '2014-11-07', trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E', platforms: ['Netflix', 'Paramount+', 'Amazon Prime'] },
    { id: 1004, title: 'A Beautiful Mind', overview: 'The story of John Nash, a brilliant mathematician who struggled with schizophrenia.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2001-12-13', trailer: 'https://www.youtube.com/watch?v=J4KpSbY6w7k', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 1005, title: 'The Imitation Game', overview: 'Alan Turing helps crack the Enigma code during World War II.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2014-11-14', trailer: 'https://www.youtube.com/watch?v=S5CjM9Ll5nE', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1006, title: 'Hidden Figures', overview: 'The untold story of the black female mathematicians at NASA.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-12-25', trailer: 'https://www.youtube.com/watch?v=RK8xHqSAVuM', platforms: ['Disney+', 'Netflix', 'Amazon Prime'] },
    { id: 1007, title: 'The Martian', overview: 'An astronaut must survive on Mars after being left behind.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2015-10-02', trailer: 'https://www.youtube.com/watch?v=ej3ioOneTy8', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 1008, title: 'Gravity', overview: 'Two astronauts work together to survive after an accident leaves them stranded.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2013-10-04', trailer: 'https://www.youtube.com/watch?v=OiTiKOy59o4', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 1009, title: 'Apollo 13', overview: 'NASA works to bring astronauts home after a space mission failure.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '1995-06-30', trailer: 'https://www.youtube.com/watch?v=KtEIMgSxOcQ', platforms: ['Netflix', 'Amazon Prime', 'Disney+'] },
    { id: 1010, title: 'October Sky', overview: 'A coal miner\'s son is inspired by Sputnik to pursue rocketry.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '1999-02-19', trailer: 'https://www.youtube.com/watch?v=pmQqXk3X8bI', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 1011, title: 'Gattaca', overview: 'In a future where genetics determine destiny, one man defies his DNA.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '1997-10-24', trailer: 'https://www.youtube.com/watch?v=eX7iL8pT0lU', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 1012, title: 'First Man', overview: 'The story of Neil Armstrong and the Apollo 11 moon landing.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2018-10-12', trailer: 'https://www.youtube.com/watch?v=viM9rQZ1dl0', platforms: ['Amazon Prime', 'Apple TV', 'Paramount+'] },
    { id: 1013, title: 'Apollo 11', overview: 'Documentary about the Apollo 11 mission using restored footage.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2019-03-01', trailer: 'https://www.youtube.com/watch?v=8CtJOe_8X3g', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 1014, title: 'The Right Stuff', overview: 'The story of the first astronauts in the Mercury program.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '1983-10-21', trailer: 'https://www.youtube.com/watch?v=8CtJOe_8X3g', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 1015, title: 'NOVA', overview: 'PBS documentary series exploring scientific discoveries and innovations.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '1974-03-03', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 1016, title: 'Cosmos: Possible Worlds', overview: 'Neil deGrasse Tyson explores the future of space exploration.', poster_path: '/placeholder.jpg', vote_average: 8.8, release_date: '2020-03-09', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['National Geographic', 'Hulu', 'Amazon Prime'] },
    { id: 1017, title: 'Origins', overview: 'Neil deGrasse Tyson explores the origins of the universe and life.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2004-09-28', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 1018, title: 'The Farthest', overview: 'The story of Voyager spacecraft and their journey to the edge of the solar system.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2017-08-02', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1019, title: 'Journey to the Edge of the Universe', overview: 'A visual journey through the cosmos from Earth to the edge of the universe.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2008-11-24', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'National Geographic'] },
    { id: 1020, title: 'My Octopus Teacher', overview: 'A filmmaker forms an unusual friendship with an octopus.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2020-09-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 1021, title: 'Virunga', overview: 'Documentary about the struggle to protect Virunga National Park in Congo.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2014-11-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1022, title: 'The Cove', overview: 'An investigation into dolphin hunting in Japan.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2009-08-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1023, title: 'Blackfish', overview: 'Documentary about captive killer whales and the marine park industry.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2013-07-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1024, title: 'Planet Earth', overview: 'BBC documentary series showcasing Earth\'s natural habitats.', poster_path: '/placeholder.jpg', vote_average: 9.4, release_date: '2006-03-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1025, title: 'Blue Planet', overview: 'BBC documentary series exploring the world\'s oceans.', poster_path: '/placeholder.jpg', vote_average: 9.3, release_date: '2001-09-12', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1026, title: 'Life', overview: 'BBC documentary series about the variety of life on Earth.', poster_path: '/placeholder.jpg', vote_average: 9.0, release_date: '2009-10-12', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1027, title: 'Human Planet', overview: 'BBC documentary about how humans adapt to different environments.', poster_path: '/placeholder.jpg', vote_average: 8.8, release_date: '2011-01-13', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1028, title: 'Frozen Planet', overview: 'BBC documentary about life in the Arctic and Antarctic.', poster_path: '/placeholder.jpg', vote_average: 9.1, release_date: '2011-10-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1029, title: 'Africa', overview: 'BBC documentary series exploring the African continent.', poster_path: '/placeholder.jpg', vote_average: 8.9, release_date: '2013-01-02', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1030, title: 'Seven Worlds, One Planet', overview: 'BBC documentary showcasing wildlife on each continent.', poster_path: '/placeholder.jpg', vote_average: 9.2, release_date: '2019-10-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Netflix', 'Amazon Prime'] },
    { id: 1031, title: 'Our Planet', overview: 'Netflix documentary series showcasing Earth\'s natural habitats.', poster_path: '/placeholder.jpg', vote_average: 9.2, release_date: '2019-04-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix'] },
    { id: 1032, title: 'Chasing Coral', overview: 'Documentary about coral reef bleaching and ocean conservation.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2017-04-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1033, title: 'A Plastic Ocean', overview: 'Documentary about plastic pollution in the oceans.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2016-04-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1034, title: 'Racing Extinction', overview: 'Documentary about endangered species and mass extinction.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2015-09-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 1035, title: 'The Ivory Game', overview: 'Documentary about ivory poaching and elephant conservation.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2016-11-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] }
  ],
  mathematics: [
    { id: 2001, title: 'The Man Who Knew Infinity', overview: 'The story of Srinivasa Ramanujan, a brilliant mathematician from India.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2015-04-16', trailer: 'https://www.youtube.com/watch?v=oXGm9Vlfx4w', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 2002, title: 'A Beautiful Mind', overview: 'The story of John Nash, a brilliant mathematician who struggled with schizophrenia.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2001-12-13', trailer: 'https://www.youtube.com/watch?v=J4KpSbY6w7k', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 2003, title: 'Proof', overview: 'A brilliant mathematician struggles with mental illness while her daughter cares for her.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '2005-09-16', trailer: 'https://www.youtube.com/watch?v=0y0Mq0CtGQ0', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 2004, title: '21', overview: 'MIT students use math to count cards in Las Vegas casinos.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '2008-03-28', trailer: 'https://www.youtube.com/watch?v=Zr6k8D5L0HY', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 2005, title: 'Moneyball', overview: 'Using statistics to build a winning baseball team on a budget.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2011-09-23', trailer: 'https://www.youtube.com/watch?v=-iQPzrK0y-g', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 2006, title: 'A Trip to Infinity', overview: 'Mathematicians and physicists explore the concept of infinity.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2022-09-26', trailer: 'https://www.youtube.com/watch?v=QHJ-Tn7m1lo', platforms: ['Netflix', 'YouTube'] },
    { id: 2007, title: 'The Great Math Mystery', overview: 'Is mathematics a human invention or the language of the universe?', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-04-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'PBS'] },
    { id: 2008, title: 'The Code', overview: 'Marcus du Sautoy explores the hidden mathematical patterns in nature.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2011-07-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'PBS'] },
    { id: 2009, title: 'N Is a Number', overview: 'A portrait of mathematician Paul Erdős and his obsessive work.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '1993-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2010, title: 'The Proof', overview: 'Andrew Wiles\' quest to prove Fermat\'s Last Theorem.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '1997-01-28', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'PBS', 'Amazon Prime'] },
    { id: 2011, title: 'Hunting the Hidden Dimension', overview: 'Exploring fractal geometry and its applications in nature.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2008-10-28', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'PBS', 'Amazon Prime'] },
    { id: 2012, title: 'Between the Folds', overview: 'The mathematics and art of origami paper folding.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime', 'PBS'] },
    { id: 2013, title: 'The Story of Maths', overview: 'Marcus du Sautoy explores the history of mathematics.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2008-10-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Amazon Prime', 'YouTube'] },
    { id: 2014, title: 'Dangerous Knowledge', overview: 'BBC documentary about mathematicians who pushed the boundaries of knowledge.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2007-06-11', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'YouTube', 'Amazon Prime'] },
    { id: 2015, title: 'Hard Problems', overview: 'The road to the International Mathematical Olympiad.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2016, title: 'Julia Robinson and Hilbert\'s Tenth Problem', overview: 'The story of mathematician Julia Robinson and her work.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime', 'PBS'] },
    { id: 2017, title: 'The Colors of Infinity', overview: 'Exploring the Mandelbrot set and fractal geometry.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '1995-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2018, title: 'The Secret Rules of Modern Living: Algorithms', overview: 'How algorithms shape our daily lives.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime', 'BBC'] },
    { id: 2019, title: 'Chaos: A Mathematical Adventure', overview: 'Exploring chaos theory and its applications.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2020, title: 'The Story of 1', overview: 'BBC documentary about the history of the number one.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2005-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'YouTube', 'Amazon Prime'] },
    { id: 2021, title: 'Dimensions', overview: 'A mathematical journey through the fourth dimension.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2022, title: 'Donald in Mathmagic Land', overview: 'Disney educational film about mathematics in nature and art.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '1959-06-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Disney+', 'YouTube', 'Amazon Prime'] },
    { id: 2023, title: 'Flatland', overview: 'A journey through dimensions in a two-dimensional world.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2007-11-11', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2024, title: 'Pi', overview: 'A mathematician becomes obsessed with finding patterns in pi.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '1998-07-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 2025, title: 'Fermat\'s Room', overview: 'Mathematicians solve puzzles to survive in a shrinking room.', poster_path: '/placeholder.jpg', vote_average: 7.1, release_date: '2007-11-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 2026, title: 'The Calculus of Love', overview: 'A mathematician uses calculus to find love.', poster_path: '/placeholder.jpg', vote_average: 6.9, release_date: '2019-02-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 2027, title: 'The Man Who Knew Infinity', overview: 'The story of Srinivasa Ramanujan and his mathematical genius.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2015-04-16', trailer: 'https://www.youtube.com/watch?v=oXGm9Vlfx4w', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 2028, title: 'Good Will Hunting', overview: 'A janitor at MIT has a gift for mathematics.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '1997-12-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 2029, title: 'Stand and Deliver', overview: 'A math teacher inspires students in East Los Angeles.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '1988-03-11', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 2030, title: 'The Calculus of Friendship', overview: 'A story about the relationship between a teacher and student.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2011-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 2031, title: 'How I Learned to Stop Worrying and Love the Math', overview: 'Documentary about overcoming math anxiety.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2032, title: 'Mathematics and the Imagination', overview: 'Exploring the creative side of mathematics.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2033, title: 'The Mathematical Mystery Tour', overview: 'NOVA documentary about mathematical mysteries.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '1985-03-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'YouTube', 'Amazon Prime'] },
    { id: 2034, title: 'Euler\'s Number', overview: 'Documentary about the mathematical constant e.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2017-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 2035, title: 'The Golden Ratio', overview: 'Exploring the golden ratio in nature and art.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] }
  ],
  technology: [
    { id: 3001, title: 'The Social Network', overview: 'The story of Facebook and its founder Mark Zuckerberg.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2010-10-01', trailer: 'https://www.youtube.com/watch?v=lB95KLmpLN4', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 3002, title: 'Steve Jobs', overview: 'The story of Apple co-founder Steve Jobs.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2015-10-09', trailer: 'https://www.youtube.com/watch?v=fN9q2m7nOxw', platforms: ['Amazon Prime', 'Apple TV', 'YouTube'] },
    { id: 3003, title: 'The Imitation Game', overview: 'Alan Turing helps crack the Enigma code during World War II.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2014-11-14', trailer: 'https://www.youtube.com/watch?v=S5CjM9Ll5nE', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 3004, title: 'Ex Machina', overview: 'A programmer is invited by his CEO to test an AI humanoid robot.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2015-04-24', trailer: 'https://www.youtube.com/watch?v=gyGoqD5BkIY', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 3005, title: 'Her', overview: 'A man develops a relationship with an AI operating system.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2013-12-18', trailer: 'https://www.youtube.com/watch?v=z3WWB_dAtWE', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 3006, title: 'The Matrix', overview: 'A computer hacker learns about the true nature of reality.', poster_path: '/placeholder.jpg', vote_average: 8.7, release_date: '1999-03-31', trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 3007, title: 'Blade Runner 2049', overview: 'A young blade runner uncovers a long-buried secret.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2017-10-06', trailer: 'https://www.youtube.com/watch?v=gCcx85zbxz4', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 3008, title: 'AlphaGo', overview: 'Documentary about AI defeating the world champion at Go.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2017-09-29', trailer: 'https://www.youtube.com/watch?v=WXuK6gekU1Y', platforms: ['YouTube', 'Netflix', 'Amazon Prime'] },
    { id: 3009, title: 'The Thinking Game', overview: 'Inside story of DeepMind and the race to solve AI.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2023-09-01', trailer: 'https://www.youtube.com/watch?v=d95J8yzvjbQ', platforms: ['YouTube', 'Netflix'] },
    { id: 3010, title: 'Python: The Documentary', overview: 'The story of Python programming language and its rise to dominance.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=GfH4QL4VqJ0', platforms: ['YouTube'] },
    { id: 3011, title: 'The Story of C++', overview: 'The world\'s most consequential programming language.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2026-06-04', trailer: 'https://www.youtube.com/watch?v=lI7tMxzSJ7w', platforms: ['YouTube'] },
    { id: 3012, title: 'Artificial Gamer', overview: 'OpenAI\'s quest to build an AI that can defeat DOTA 2 champions.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 3013, title: 'Coded Bias', overview: 'Exploring bias in facial recognition technology.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2020-04-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 3014, title: 'The Great Hack', overview: 'Documentary about data privacy and Cambridge Analytica scandal.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2019-07-24', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] },
    { id: 3015, title: 'Lo and Behold', overview: 'Werner Herzog explores the internet and technology.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2016-08-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 3016, title: 'Do You Trust This Computer?', overview: 'Documentary about AI and its impact on humanity.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2018-04-06', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 3017, title: 'The AI Doc', overview: 'Comprehensive documentary about artificial intelligence.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2022-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 3018, title: 'More Human Than Human', overview: 'Exploring the relationship between humans and AI.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 3019, title: 'Transcendent Man', overview: 'Documentary about futurist Ray Kurzweil and transhumanism.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2009-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 3020, title: 'General Magic', overview: 'The story of the startup that created the smartphone.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2018-09-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 3021, title: 'Silicon Valley', overview: 'TV series about tech startup culture.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '2014-04-06', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'Amazon Prime', 'YouTube'] },
    { id: 3022, title: 'Halt and Catch Fire', overview: 'TV series about the PC revolution of the 80s.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2014-06-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 3023, title: 'Mr. Robot', overview: 'A cybersecurity engineer becomes involved in hacktivism.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '2015-06-24', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'Hulu', 'YouTube'] },
    { id: 3024, title: 'The Social Dilemma', overview: 'Documentary about social media and its impact on society.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2020-09-28', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 3025, title: 'Inside Bill\'s Brain', overview: 'Documentary about Bill Gates and his work.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2019-09-20', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 3026, title: 'The Inventor', overview: 'The story of Elizabeth Holmes and Theranos.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2019-03-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'Amazon Prime', 'YouTube'] },
    { id: 3027, title: 'WeWork: Or the Making and Breaking of a $47 Billion Unicorn', overview: 'The rise and fall of WeWork.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2021-04-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 3028, title: 'Fyre Fraud', overview: 'Documentary about the Fyre Festival disaster.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2019-01-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Hulu', 'Amazon Prime', 'YouTube'] },
    { id: 3029, title: 'The Startup Kids', overview: 'Documentary about young entrepreneurs.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2012-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 3030, title: 'Something Ventured', overview: 'The story of venture capital and Silicon Valley.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2011-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Netflix'] },
    { id: 3031, title: 'Print the Legend', overview: 'Documentary about 3D printing revolution.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2014-09-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 3032, title: 'The Internet\'s Own Boy', overview: 'The story of Aaron Swartz and internet freedom.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2014-06-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 3033, title: 'Terms and Conditions May Apply', overview: 'Documentary about online privacy.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2013-07-12', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Netflix'] },
    { id: 3034, title: 'Citizenfour', overview: 'Documentary about Edward Snowden and NSA surveillance.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2014-10-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 3035, title: 'Zero Days', overview: 'Documentary about cyber warfare and Stuxnet.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-07-08', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] }
  ],
  engineering: [
    { id: 4001, title: 'Apollo 13', overview: 'NASA works to bring astronauts home after a space mission failure.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '1995-06-30', trailer: 'https://www.youtube.com/watch?v=KtEIMgSxOcQ', platforms: ['Netflix', 'Amazon Prime', 'Disney+'] },
    { id: 4002, title: 'The Martian', overview: 'An astronaut must survive on Mars after being left behind.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2015-10-02', trailer: 'https://www.youtube.com/watch?v=ej3ioOneTy8', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 4003, title: 'Iron Man', overview: 'A billionaire engineer creates a powered suit of armor.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2008-05-02', trailer: 'https://www.youtube.com/watch?v=8hY9BzIqfN8', platforms: ['Disney+', 'Netflix', 'Amazon Prime'] },
    { id: 4004, title: 'The Bridge on the River Kwai', overview: 'British prisoners build a bridge for their Japanese captors.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '1957-12-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 4005, title: 'Sully', overview: 'The story of Captain Sully Sullenberger and the Miracle on the Hudson.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2016-09-09', trailer: 'https://www.youtube.com/watch?v=K4QZD2eG-1c', platforms: ['Netflix', 'Amazon Prime', 'Apple TV'] },
    { id: 4006, title: 'Dream Big: Engineering Our World', overview: 'Narrated by Jeff Bridges, this IMAX documentary celebrates engineering marvels.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2017-02-17', trailer: 'https://www.youtube.com/watch?v=YVm5OW6q18Y', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 4007, title: 'Extreme Engineering', overview: 'TV series exploring the most spectacular feats of engineering.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2003-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4008, title: 'The Great Wall', overview: 'The engineering feat of the Great Wall of China.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2016-12-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 4009, title: 'Underwater Dreams', overview: 'High school students build an underwater robot.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2014-11-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 4010, title: 'Engineering an Empire', overview: 'History Channel series about engineering feats of ancient civilizations.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2005-09-12', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['History Channel', 'Amazon Prime', 'YouTube'] },
    { id: 4011, title: 'Impossible Engineering', overview: 'TV series about extraordinary feats of modern engineering.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Science Channel', 'Amazon Prime', 'YouTube'] },
    { id: 4012, title: 'Megafactories', overview: 'Documentary series about the world\'s largest manufacturing facilities.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2006-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['National Geographic', 'Amazon Prime', 'YouTube'] },
    { id: 4013, title: 'Mega Engineering', overview: 'Exploring futuristic mega-structures and extreme engineering.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2009-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4014, title: 'Modern Marvels', overview: 'History Channel series about technological innovations.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '1995-01-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['History Channel', 'Amazon Prime', 'YouTube'] },
    { id: 4015, title: 'How It\'s Made', overview: 'Documentary series showing how everyday objects are manufactured.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2001-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4016, title: 'How Do They Do It', overview: 'Series explaining the engineering behind everyday items.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2006-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4017, title: 'MythBusters', overview: 'Testing the validity of various myths and legends with science.', poster_path: '/placeholder.jpg', vote_average: 8.6, release_date: '2003-01-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'Hulu'] },
    { id: 4018, title: 'Megastructures', overview: 'Documentary series about the world\'s largest construction projects.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2004-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['National Geographic', 'Amazon Prime', 'YouTube'] },
    { id: 4019, title: 'Building Giants', overview: 'Series following the construction of massive structures.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['National Geographic', 'Amazon Prime', 'YouTube'] },
    { id: 4020, title: 'Skyscrapers: Engineering the Future', overview: 'Documentary about the engineering behind tall buildings.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['National Geographic', 'Amazon Prime', 'YouTube'] },
    { id: 4021, title: 'The Vertical City', overview: 'Exploring vertical urban living and high-rise construction.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2017-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 4022, title: 'Building the Future', overview: 'Documentary about futuristic construction methods.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 4023, title: 'The Green Building Revolution', overview: 'Documentary about sustainable construction practices.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 4024, title: 'Mega Builders', overview: 'Series about massive construction projects worldwide.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2010-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4025, title: 'Engineering the Impossible', overview: 'Exploring historical and modern engineering feats.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2006-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Discovery+', 'Amazon Prime', 'YouTube'] },
    { id: 4026, title: 'The Engineering That Built the World', overview: 'Stories behind iconic structures and engineering feats.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['History Channel', 'Amazon Prime', 'YouTube'] },
    { id: 4027, title: 'The Future of Construction', overview: 'Documentary about next-generation construction technology.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 4028, title: 'Industrial Revelations', overview: 'Series about industrial engineering and manufacturing.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2002-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 4029, title: 'Mechanical Marvels: Clockwork Dreams', overview: 'BBC documentary about the history of clockwork engineering.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2013-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Amazon Prime', 'YouTube'] },
    { id: 4030, title: 'To Engineer is Human', overview: 'Horizon series about civil engineering failures.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '1985-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Amazon Prime', 'YouTube'] },
    { id: 4031, title: 'Why Bridges Collapse', overview: 'NOVA documentary investigating bridge failures.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 4032, title: 'Building the Eiffel Tower', overview: 'NOVA documentary about the construction of the Eiffel Tower.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2024-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 4033, title: 'London Super Tunnel', overview: 'NOVA documentary about building London\'s Elizabeth Line.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2023-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 4034, title: 'Rebuilding Notre Dame', overview: 'NOVA documentary about restoring Notre Dame Cathedral.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2022-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 4035, title: 'High-Risk High-Rise', overview: 'NOVA documentary about building skyscrapers in earthquake zones.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2022-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] }
  ],
  'social-sciences': [
    { id: 5001, title: 'Schindler\'s List', overview: 'A German businessman saves the lives of more than a thousand Jews during the Holocaust.', poster_path: '/placeholder.jpg', vote_average: 9.0, release_date: '1993-12-15', trailer: 'https://www.youtube.com/watch?v=gCcx85zbxz4', platforms: ['Netflix', 'Amazon Prime', 'Paramount+'] },
    { id: 5002, title: '12 Years a Slave', overview: 'The story of Solomon Northup, a free Black man kidnapped into slavery.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2013-11-08', trailer: 'https://www.youtube.com/watch?v=z02Ie8kRRto', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 5003, title: 'The King\'s Speech', overview: 'King George VI works to overcome his stutter with the help of a speech therapist.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2010-12-25', trailer: 'https://www.youtube.com/watch?v=KpDqZQJ4pZ0', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 5004, title: 'Lincoln', overview: 'President Lincoln works to pass the 13th Amendment to abolish slavery.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2012-11-09', trailer: 'https://www.youtube.com/watch?v=FJfCz-5-gkU', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 5005, title: 'Gandhi', overview: 'The life of Mahatma Gandhi and his struggle for Indian independence.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '1982-12-08', trailer: 'https://www.youtube.com/watch?v=OFx6j6X8y9I', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 5006, title: 'The Crown', overview: 'The reign of Queen Elizabeth II from the 1940s to modern times.', poster_path: '/placeholder.jpg', vote_average: 8.6, release_date: '2016-11-04', trailer: 'https://www.youtube.com/watch?v=JWtnJjn6ng0', platforms: ['Netflix'] },
    { id: 5007, title: 'The Social Network', overview: 'The story of Facebook and its founder Mark Zuckerberg.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2010-10-01', trailer: 'https://www.youtube.com/watch?v=lB95KLmpLN4', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 5008, title: 'The War', overview: 'Ken Burns\' documentary about World War II told through personal accounts.', poster_path: '/placeholder.jpg', vote_average: 9.1, release_date: '2007-09-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'PBS'] },
    { id: 5009, title: 'A Class Divided', overview: 'Jane Elliott\'s famous lesson on discrimination with her third-grade class.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '1985-03-26', trailer: 'https://www.youtube.com/watch?v=1mcCLm_LwpE', platforms: ['YouTube', 'PBS'] },
    { id: 5010, title: 'The Century of the Self', overview: 'Adam Curtis documentary on how Freud\'s ideas influenced consumer culture.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2002-05-11', trailer: 'https://www.youtube.com/watch?v=eJ3RzGoQC4s', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 5011, title: 'College Behind Bars', overview: 'Incarcerated men and women earn college degrees through Bard Prison Initiative.', poster_path: '/placeholder.jpg', vote_average: 8.7, release_date: '2019-11-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'PBS', 'Amazon Prime'] },
    { id: 5012, title: 'The People Speak', overview: 'Dramatic performances of letters and speeches from American history.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2009-12-13', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime', 'PBS'] },
    { id: 5013, title: 'The Civil War', overview: 'Ken Burns\' documentary series about the American Civil War.', poster_path: '/placeholder.jpg', vote_average: 9.3, release_date: '1990-09-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5014, title: 'Vietnam War', overview: 'Ken Burns\' documentary series about the Vietnam War.', poster_path: '/placeholder.jpg', vote_average: 9.0, release_date: '2017-09-17', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Netflix', 'Amazon Prime'] },
    { id: 5015, title: 'The West', overview: 'Ken Burns\' documentary about the American West.', poster_path: '/placeholder.jpg', vote_average: 8.8, release_date: '1996-09-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5016, title: 'Baseball', overview: 'Ken Burns\' documentary about the history of baseball.', poster_path: '/placeholder.jpg', vote_average: 8.7, release_date: '1994-09-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5017, title: 'Jazz', overview: 'Ken Burns\' documentary about the history of jazz music.', poster_path: '/placeholder.jpg', vote_average: 8.6, release_date: '2001-01-08', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5018, title: 'The Roosevelts', overview: 'Ken Burns\' documentary about Theodore, Franklin, and Eleanor Roosevelt.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '2014-09-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5019, title: 'Prohibition', overview: 'Ken Burns\' documentary about the Prohibition era.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2011-10-03', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5020, title: 'The National Parks', overview: 'Ken Burns\' documentary about America\'s national parks.', poster_path: '/placeholder.jpg', vote_average: 8.9, release_date: '2009-09-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'Netflix'] },
    { id: 5021, title: 'The Vietnam War', overview: 'Ken Burns\' comprehensive documentary about the Vietnam War.', poster_path: '/placeholder.jpg', vote_average: 9.0, release_date: '2017-09-17', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Netflix', 'Amazon Prime'] },
    { id: 5022, title: 'Eyes on the Prize', overview: 'Documentary series about the American Civil Rights Movement.', poster_path: '/placeholder.jpg', vote_average: 9.1, release_date: '1987-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 5023, title: 'The Great Depression', overview: 'Documentary about the economic crisis of the 1930s.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '1993-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['PBS', 'Amazon Prime', 'YouTube'] },
    { id: 5024, title: 'The Cold War', overview: 'CNN documentary series about the Cold War era.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '1998-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['CNN', 'Amazon Prime', 'YouTube'] },
    { id: 5025, title: 'The World at War', overview: 'Comprehensive documentary about World War II.', poster_path: '/placeholder.jpg', vote_average: 9.2, release_date: '1973-10-31', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['BBC', 'Amazon Prime', 'YouTube'] },
    { id: 5026, title: 'Cosmopolis', overview: 'Documentary about globalization and its effects.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2003-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 5027, title: 'Inside Job', overview: 'Documentary about the 2008 financial crisis.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2010-10-08', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 5028, title: 'The Corporation', overview: 'Documentary about the modern corporation and its impact.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2003-03-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Netflix'] },
    { id: 5029, title: 'Food, Inc.', overview: 'Documentary about the food industry and corporate agriculture.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2008-09-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 5030, title: 'The True Cost', overview: 'Documentary about fast fashion and its impact.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-05-29', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 5031, title: '13th', overview: 'Documentary about racial inequality and the prison system.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2016-10-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] },
    { id: 5032, title: 'I Am Not Your Negro', overview: 'Documentary about James Baldwin and race in America.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2016-12-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 5033, title: 'Blackfish', overview: 'Documentary about captive killer whales.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2013-07-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 5034, title: 'The Hunting Ground', overview: 'Documentary about sexual assault on college campuses.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2015-02-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 5035, title: 'Miss Representation', overview: 'Documentary about women in media and politics.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2011-10-20', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Netflix'] }
  ],
  health: [
    { id: 6001, title: 'The Doctor', overview: 'A doctor becomes a patient and learns about the healthcare system.', poster_path: '/placeholder.jpg', vote_average: 6.9, release_date: '1991-04-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 6002, title: 'Patch Adams', overview: 'A doctor uses humor and compassion to treat patients.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '1998-12-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 6003, title: 'Awakenings', overview: 'A doctor discovers a drug that awakens catatonic patients.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '1990-12-20', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 6004, title: 'Still Alice', overview: 'A linguistics professor struggles with early-onset Alzheimer\'s.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2014-12-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 6005, title: 'A Beautiful Mind', overview: 'The story of John Nash, a brilliant mathematician who struggled with schizophrenia.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2001-12-13', trailer: 'https://www.youtube.com/watch?v=J4KpSbY6w7k', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 6006, title: 'Temple Grandin', overview: 'The story of an autistic professor who revolutionized animal behavior science.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2010-02-06', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'HBO Max'] },
    { id: 6007, title: 'The Game Changers', overview: 'Documentary about plant-based diets and athletic performance.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2018-09-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] },
    { id: 6008, title: 'Food, Inc.', overview: 'Exposes the negative impact of factory farming on health and environment.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2008-09-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 6009, title: 'Super Size Me', overview: 'Documentary about the effects of fast food on health.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2004-05-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 6010, title: 'Osmosis Jones', overview: 'Animated/live-action film about the human immune system.', poster_path: '/placeholder.jpg', vote_average: 6.5, release_date: '2001-08-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 6011, title: 'The Mind, Explained', overview: 'Vox documentary series exploring how the human mind works.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2019-05-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6012, title: 'Headspace Guide to Meditation', overview: 'Documentary series about meditation and mindfulness.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6013, title: 'Live to 100: Secrets of the Blue Zones', overview: 'Documentary about the world\'s healthiest and longest-lived people.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6014, title: 'Hack Your Health', overview: 'Documentary about the gut microbiome and health.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2024-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6015, title: 'You Are What You Eat', overview: 'Twin experiment documentary about diet and health.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2024-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6016, title: 'The Surgeon\'s Cut', overview: 'Documentary series following innovative surgeons.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6017, title: 'Lenox Hill', overview: 'Documentary series about doctors at Lenox Hill Hospital.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2020-06-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6018, title: 'Human: The World Within', overview: 'Documentary series about the human body.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6019, title: 'Unnatural Selection', overview: 'Documentary about gene editing and CRISPR.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2019-10-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6020, title: 'The Bleeding Edge', overview: 'Documentary about medical devices and patient safety.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2018-05-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6021, title: 'Take Your Pills', overview: 'Documentary about ADHD medication and stimulants.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2018-03-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6022, title: 'Stutz', overview: 'Documentary about psychiatrist Phil Stutz and his therapy methods.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2022-11-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6023, title: 'The Minimalists', overview: 'Documentary about minimalism and mental health.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6024, title: 'The Playbook', overview: 'Documentary about sports coaches and life lessons.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2022-03-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6025, title: 'The Principles of Pleasure', overview: 'Documentary about female pleasure and sexuality.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2022-03-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6026, title: 'My Beautiful Broken Brain', overview: 'Documentary about stroke recovery and brain plasticity.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2014-12-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6027, title: 'Unrest', overview: 'Documentary about chronic fatigue syndrome.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2017-09-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6028, title: 'That Sugar Film', overview: 'Documentary about sugar consumption and health.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6029, title: 'Born Strong', overview: 'Documentary about strongman competition and strength.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2016-07-29', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6030, title: 'Icarus', overview: 'Documentary about doping in sports.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2017-08-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6031, title: 'Ask the Doctor', overview: 'Documentary series with medical advice and health information.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6032, title: 'Pandemic', overview: 'Documentary about pandemic preparedness.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6033, title: 'Coronavirus, Explained', overview: 'Documentary about COVID-19.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6034, title: 'Inside the Children\'s ICU', overview: 'Documentary about pediatric intensive care.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 6035, title: 'Fantastic Fungi', overview: 'Documentary about the magical world of fungi.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] }
  ],
  business: [
    { id: 7001, title: 'The Wolf of Wall Street', overview: 'The rise and fall of stockbroker Jordan Belfort.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2013-12-25', trailer: 'https://www.youtube.com/watch?v=iszwuX1JP6E', platforms: ['Netflix', 'Amazon Prime', 'Paramount+'] },
    { id: 7002, title: 'The Social Network', overview: 'The story of Facebook and its founder Mark Zuckerberg.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2010-10-01', trailer: 'https://www.youtube.com/watch?v=lB95KLmpLN4', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 7003, title: 'Moneyball', overview: 'Using statistics to build a winning baseball team on a budget.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2011-09-23', trailer: 'https://www.youtube.com/watch?v=-iQPzrK0y-g', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 7004, title: 'The Big Short', overview: 'A group of investors bet against the US mortgage market.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-12-11', trailer: 'https://www.youtube.com/watch?v=vgqG3kM6pDM', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 7005, title: 'Steve Jobs', overview: 'The story of Apple co-founder Steve Jobs.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2015-10-09', trailer: 'https://www.youtube.com/watch?v=fN9q2m7nOxw', platforms: ['Amazon Prime', 'Apple TV', 'YouTube'] },
    { id: 7006, title: 'The Founder', overview: 'The story of McDonald\'s founder Ray Kroc.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2016-12-16', trailer: 'https://www.youtube.com/watch?v=KxZp316OJ0k', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 7007, title: 'Enron: The Smartest Guys in the Room', overview: 'Documentary about the Enron scandal and corporate corruption.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2005-04-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 7008, title: 'Inside Job', overview: 'Documentary about the 2008 financial crisis.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2010-10-08', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 7009, title: 'Freakonomics', overview: 'Documentary based on the book about hidden economic incentives.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2010-10-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 7010, title: 'The Startup Kids', overview: 'Documentary about young entrepreneurs and their startups.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2012-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] },
    { id: 7011, title: 'Startup.com', overview: 'Documentary about the rise and fall of an internet startup.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2001-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7012, title: 'Fyre', overview: 'Documentary about the Fyre Festival disaster.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2019-01-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7013, title: 'The Inventor', overview: 'The story of Elizabeth Holmes and Theranos.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2019-03-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'Amazon Prime', 'YouTube'] },
    { id: 7014, title: 'WeWork', overview: 'The rise and fall of WeWork.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2021-04-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7015, title: 'Dirty Money', overview: 'Netflix documentary series about corporate fraud and corruption.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2018-01-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7016, title: 'Downfall: The Case Against Boeing', overview: 'Documentary about Boeing\'s 737 MAX crisis.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2022-02-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7017, title: 'Becoming Warren Buffett', overview: 'Documentary about the legendary investor.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2017-01-30', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'Amazon Prime', 'YouTube'] },
    { id: 7018, title: 'Inside Bill\'s Brain', overview: 'Documentary about Bill Gates and his work.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2019-09-20', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7019, title: 'The Pixar Story', overview: 'Documentary about the history of Pixar Animation Studios.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2007-08-03', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Disney+', 'Amazon Prime', 'YouTube'] },
    { id: 7020, title: 'Betting on Zero', overview: 'Documentary about the battle against Herbalife.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7021, title: 'Steve Jobs: One Last Thing', overview: 'Documentary about Steve Jobs\' life and legacy.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2011-11-02', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7022, title: 'The Last Dance', overview: 'Documentary series about Michael Jordan and the Chicago Bulls.', poster_path: '/placeholder.jpg', vote_average: 9.1, release_date: '2020-04-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7023, title: 'Capital C', overview: 'Documentary about crowdfunding and entrepreneurship.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2015-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7024, title: 'Silicon Cowboys', overview: 'Documentary about Compaq Computer and the PC revolution.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7025, title: 'The Triumph of the Nerds', overview: 'Documentary about the rise of the personal computer.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '1996-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7026, title: 'Banking on Bitcoin', overview: 'Documentary about the rise of Bitcoin and cryptocurrency.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7027, title: 'LulaRich', overview: 'Documentary about the LulaRoe clothing empire.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2021-09-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7028, title: 'Money, Explained', overview: 'Vox documentary series about money and economics.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2021-05-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7029, title: 'Steve Jobs: The Man in the Machine', overview: 'Documentary about Steve Jobs\' complex personality.', poster_path: '/placeholder.jpg', vote_average: 6.9, release_date: '2015-09-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 7030, title: 'Generation Hustle', overview: 'Documentary series about young entrepreneurs.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2021-04-20', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'YouTube'] },
    { id: 7031, title: 'White Hot: The Rise & Fall of Abercrombie & Fitch', overview: 'Documentary about the fashion brand.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2022-04-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7032, title: 'The Crime of the Century', overview: 'Documentary about the opioid crisis.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2021-05-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['HBO Max', 'YouTube'] },
    { id: 7033, title: 'Nobody Speak: Trials of the Free Press', overview: 'Documentary about Hulk Hogan\'s lawsuit against Gawker.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2017-06-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 7034, title: 'The Great Hack', overview: 'Documentary about Cambridge Analytica and data privacy.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2019-07-24', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] },
    { id: 7035, title: 'Print the Legend', overview: 'Documentary about the 3D printing revolution.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2014-09-26', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] }
  ],
  arts: [
    { id: 8001, title: 'Amadeus', overview: 'The story of Mozart and his rival Salieri.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '1984-09-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'Paramount+'] },
    { id: 8002, title: 'La La Land', overview: 'A jazz pianist and aspiring actress fall in love in Los Angeles.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2016-12-09', trailer: 'https://www.youtube.com/watch?v=0pdqf4LHCT0', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 8003, title: 'The Pianist', overview: 'A Polish Jewish musician struggles to survive during WWII.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '2002-09-25', trailer: 'https://www.youtube.com/watch?v=uBF8wLSiZZo', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 8004, title: 'Frida', overview: 'The life of Mexican artist Frida Kahlo.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2002-10-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 8005, title: 'Pollock', overview: 'The life of abstract expressionist painter Jackson Pollock.', poster_path: '/placeholder.jpg', vote_average: 7.1, release_date: '2000-09-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 8006, title: 'The Last Emperor', overview: 'The life of Pu Yi, the last Emperor of China.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '1987-10-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 8007, title: 'Exit Through the Gift Shop', overview: 'Documentary about street artist Banksy.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2010-03-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8008, title: 'Tim\'s Vermeer', overview: 'A man tries to recreate a Vermeer painting using optical techniques.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2013-01-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8009, title: 'Waste Land', overview: 'Artist Vik Muniz creates portraits from garbage at a landfill.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2010-10-13', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8010, title: 'Mr. Turner', overview: 'The last years of painter J.M.W. Turner.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2014-10-31', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 8011, title: 'Abstract: The Art of Design', overview: 'Netflix series profiling innovative designers.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2017-02-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8012, title: 'Made You Look', overview: 'Documentary about the largest art fraud in US history.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8013, title: 'The Creative Brain', overview: 'Documentary exploring the neuroscience of creativity.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8014, title: 'Struggle: The Life and Lost Art of Szukalski', overview: 'Documentary about Polish artist Stanisław Szukalski.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2018-11-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8015, title: 'Sky Ladder: The Art of Cai Guo-Qiang', overview: 'Documentary about Chinese artist Cai Guo-Qiang.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2016-10-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8016, title: 'Ai Weiwei: Never Sorry', overview: 'Documentary about Chinese artist and activist Ai Weiwei.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2012-04-27', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Hulu'] },
    { id: 8017, title: 'The B-Side: Elsa Dorfman\'s Portrait Photography', overview: 'Documentary about portrait photographer Elsa Dorfman.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2017-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8018, title: 'The Gospel According to André', overview: 'Documentary about fashion icon André Leon Talley.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2017-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8019, title: 'Faces Places', overview: 'Agnès Varda and JR create large-scale portraits.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2017-06-28', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8020, title: 'Finding Vivian Maier', overview: 'Documentary about mysterious street photographer Vivian Maier.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2013-11-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8021, title: 'Marina Abramović: The Artist Is Present', overview: 'Documentary about performance artist Marina Abramović.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2012-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8022, title: 'Cutie and the Boxer', overview: 'Documentary about artists Ushio and Noriko Shinohara.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2013-08-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 8023, title: 'Beltracchi: The Art of Forgery', overview: 'Documentary about art forger Wolfgang Beltracchi.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2014-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8024, title: 'The 100 Years Show', overview: 'Documentary about centenarian artist Carmen Herrera.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8025, title: 'Floyd Norman: An Animated Life', overview: 'Documentary about Disney animator Floyd Norman.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8026, title: 'Saving Banksy', overview: 'Documentary about the preservation of street art.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8027, title: 'My Rembrandt', overview: 'Documentary about art collectors and Rembrandt paintings.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2019-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8028, title: 'This Is a Robbery', overview: 'Documentary about the Isabella Stewart Gardner Museum heist.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2021-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8029, title: 'Bob Ross: Happy Accidents', overview: 'Documentary about painter Bob Ross.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2021-08-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 8030, title: 'The Price of Everything', overview: 'Documentary about the contemporary art market.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2018-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8031, title: 'Herb & Dorothy', overview: 'Documentary about postal workers who became art collectors.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8032, title: 'The Art of the Steal', overview: 'Documentary about the Barnes Foundation art collection.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2009-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8033, title: 'The Cool School', overview: 'Documentary about the Los Angeles art scene.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8034, title: 'Jean-Michel Basquiat: The Radiant Child', overview: 'Documentary about artist Jean-Michel Basquiat.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2010-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 8035, title: 'Beautiful Losers', overview: 'Documentary about underground art and street culture.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2008-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] }
  ],
  environment: [
    { id: 9001, title: 'An Inconvenient Truth', overview: 'Al Gore presents the case for global warming.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2006-05-24', trailer: 'https://www.youtube.com/watch?v=Bu6SE5TYrCM', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9002, title: 'Before the Flood', overview: 'Leonardo DiCaprio explores the impact of climate change.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-10-21', trailer: 'https://www.youtube.com/watch?v=610y6t8h4GQ', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9003, title: 'Chasing Ice', overview: 'Photographers document the melting of glaciers.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2012-11-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9004, title: 'The Cove', overview: 'An investigation into dolphin hunting in Japan.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2009-08-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9005, title: 'Wall-E', overview: 'A robot left on Earth discovers it can support life again.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2008-06-27', trailer: 'https://www.youtube.com/watch?v=3C24Fx5vQ1Y', platforms: ['Disney+', 'Netflix', 'Amazon Prime'] },
    { id: 9006, title: 'Avatar', overview: 'A marine on an alien moon becomes torn between following orders and protecting the world.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2009-12-18', trailer: 'https://www.youtube.com/watch?v=5PSNL1qE6VY', platforms: ['Disney+', 'Netflix', 'Amazon Prime'] },
    { id: 9007, title: 'Our Planet', overview: 'Netflix documentary series showcasing Earth\'s natural habitats.', poster_path: '/placeholder.jpg', vote_average: 9.2, release_date: '2019-04-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix'] },
    { id: 9008, title: 'The Human Element', overview: 'Environmental photographer James Balog documents climate change impacts.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2018-04-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9009, title: 'Kiss the Ground', overview: 'Documentary about regenerative agriculture and climate change.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2020-09-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube', 'Amazon Prime'] },
    { id: 9010, title: 'Great Bear Rainforest', overview: 'IMAX documentary about Canada\'s pristine temperate rainforest.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2019-02-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9011, title: 'Our Living World', overview: 'Documentary series about the interconnectedness of life on Earth.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '2024-04-18', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9012, title: 'Life on Our Planet', overview: 'Documentary about the evolution of life on Earth.', poster_path: '/placeholder.jpg', vote_average: 8.6, release_date: '2023-10-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9013, title: 'Breaking Boundaries', overview: 'David Attenborough explores Earth\'s biodiversity collapse.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2021-06-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9014, title: 'Our Oceans', overview: 'Documentary series exploring Earth\'s five oceans.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2024-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9015, title: 'A Life on Our Planet', overview: 'David Attenborough reflects on his life and the changing planet.', poster_path: '/placeholder.jpg', vote_average: 8.8, release_date: '2020-10-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9016, title: 'Paradise: A Family Tale', overview: 'Documentary about a cheetah family in the African savanna.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2022-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9017, title: 'Wild Babies', overview: 'Documentary about baby animals in the wild.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2022-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9018, title: 'Night on Earth', overview: 'Documentary about nocturnal wildlife.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2020-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9019, title: 'My Octopus Teacher', overview: 'A filmmaker forms an unusual friendship with an octopus.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2020-09-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9020, title: 'Virunga', overview: 'Documentary about protecting Virunga National Park.', poster_path: '/placeholder.jpg', vote_average: 8.4, release_date: '2014-11-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9021, title: 'Chasing Coral', overview: 'Documentary about coral reef bleaching.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2017-04-14', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9022, title: 'A Plastic Ocean', overview: 'Documentary about plastic pollution in oceans.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2016-04-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9023, title: 'Racing Extinction', overview: 'Documentary about endangered species.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '2015-09-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9024, title: 'The Ivory Game', overview: 'Documentary about ivory poaching.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2016-11-04', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9025, title: 'Mission Blue', overview: 'Documentary about ocean conservation.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2014-08-15', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9026, title: 'Seaspiracy', overview: 'Documentary about the fishing industry.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2021-03-30', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'YouTube'] },
    { id: 9027, title: 'The True Cost', overview: 'Documentary about fast fashion and environment.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-05-29', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9028, title: 'Cowspiracy', overview: 'Documentary about animal agriculture and environment.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2014-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9029, title: '2040', overview: 'Documentary about solutions to climate change.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2019-04-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9030, title: 'Tomorrow', overview: 'Documentary about sustainable solutions.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-12-02', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9031, title: 'The Age of Consequences', overview: 'Documentary about climate change and security.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2016-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 9032, title: 'Merchants of Doubt', overview: 'Documentary about climate change denial.', poster_path: '/placeholder.jpg', vote_average: 7.9, release_date: '2014-03-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'YouTube'] },
    { id: 9033, title: 'Climate Refugees', overview: 'Documentary about climate migration.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2010-01-01', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 9034, title: 'The 11th Hour', overview: 'Documentary about environmental crisis.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2007-08-17', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube'] },
    { id: 9035, title: 'Home', overview: 'Documentary about Earth and human impact.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2009-06-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['YouTube', 'Amazon Prime'] }
  ],
  'life-skills': [
    { id: 10001, title: 'The Pursuit of Happyness', overview: 'A struggling salesman takes custody of his son as he pursues a better life.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2006-12-15', trailer: 'https://www.youtube.com/watch?v=39JdIjYrLdE', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 10002, title: 'The King\'s Speech', overview: 'King George VI works to overcome his stutter with the help of a speech therapist.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2010-12-25', trailer: 'https://www.youtube.com/watch?v=KpDqZQJ4pZ0', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10003, title: 'Dead Poets Society', overview: 'An English teacher inspires his students through poetry.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '1989-06-09', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10004, title: 'Good Will Hunting', overview: 'A janitor at MIT has a gift for mathematics.', poster_path: '/placeholder.jpg', vote_average: 8.3, release_date: '1997-12-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10005, title: 'The Intern', overview: 'A 70-year-old widower becomes a senior intern at an online fashion site.', poster_path: '/placeholder.jpg', vote_average: 7.1, release_date: '2015-09-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10006, title: 'Forrest Gump', overview: 'A man with low IQ witnesses and influences key historical events.', poster_path: '/placeholder.jpg', vote_average: 8.5, release_date: '1994-07-06', trailer: 'https://www.youtube.com/watch?v=bPVvIkT4cxU', platforms: ['Netflix', 'Amazon Prime', 'Paramount+'] },
    { id: 10007, title: 'The Shawshank Redemption', overview: 'Two imprisoned men bond over years, finding redemption through acts of decency.', poster_path: '/placeholder.jpg', vote_average: 9.3, release_date: '1994-09-23', trailer: 'https://www.youtube.com/watch?v=6hB3S9bIaco', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10008, title: 'The Secret Life of Walter Mitty', overview: 'A daydreamer embarks on a real-life adventure.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2013-12-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10009, title: 'Julie & Julia', overview: 'A woman finds inspiration in Julia Child\'s cooking.', poster_path: '/placeholder.jpg', vote_average: 7.0, release_date: '2009-08-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10010, title: 'Eat Pray Love', overview: 'A woman travels the world to find herself after divorce.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '2010-08-13', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10011, title: 'The Bucket List', overview: 'Two terminally ill men create a list of things to do before they die.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2007-12-16', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10012, title: 'Wild', overview: 'A woman hikes the Pacific Crest Trail to heal from personal loss.', poster_path: '/placeholder.jpg', vote_average: 7.1, release_date: '2014-12-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10013, title: 'Into the Wild', overview: 'A young man abandons possessions for a journey into the Alaskan wilderness.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2007-09-21', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10014, title: 'The Social Network', overview: 'The story of Facebook and its founder Mark Zuckerberg.', poster_path: '/placeholder.jpg', vote_average: 7.7, release_date: '2010-10-01', trailer: 'https://www.youtube.com/watch?v=lB95KLmpLN4', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 10015, title: 'The Wolf of Wall Street', overview: 'The rise and fall of stockbroker Jordan Belfort.', poster_path: '/placeholder.jpg', vote_average: 8.2, release_date: '2013-12-25', trailer: 'https://www.youtube.com/watch?v=iszwuX1JP6E', platforms: ['Netflix', 'Amazon Prime', 'Paramount+'] },
    { id: 10016, title: 'Moneyball', overview: 'Using statistics to build a winning baseball team on a budget.', poster_path: '/placeholder.jpg', vote_average: 7.6, release_date: '2011-09-23', trailer: 'https://www.youtube.com/watch?v=-iQPzrK0y-g', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 10017, title: 'The Big Short', overview: 'A group of investors bet against the US mortgage market.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2015-12-11', trailer: 'https://www.youtube.com/watch?v=vgqG3kM6pDM', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10018, title: 'Steve Jobs', overview: 'The story of Apple co-founder Steve Jobs.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2015-10-09', trailer: 'https://www.youtube.com/watch?v=fN9q2m7nOxw', platforms: ['Amazon Prime', 'Apple TV', 'YouTube'] },
    { id: 10019, title: 'The Founder', overview: 'The story of McDonald\'s founder Ray Kroc.', poster_path: '/placeholder.jpg', vote_average: 7.2, release_date: '2016-12-16', trailer: 'https://www.youtube.com/watch?v=KxZp316OJ0k', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 10020, title: 'Chef', overview: 'A chef starts a food truck after losing his restaurant job.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2014-05-09', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10021, title: 'The Hundred-Foot Journey', overview: 'An Indian family opens a restaurant in France.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2014-08-08', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10022, title: 'Burnt', overview: 'A chef tries to rebuild his career after hitting rock bottom.', poster_path: '/placeholder.jpg', vote_average: 6.6, release_date: '2015-10-30', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10023, title: 'The Internship', overview: 'Two older men intern at Google.', poster_path: '/placeholder.jpg', vote_average: 6.3, release_date: '2013-06-07', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10024, title: 'The Devil Wears Prada', overview: 'A young woman works for a demanding fashion magazine editor.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2006-06-30', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10025, title: 'Working Girl', overview: 'A secretary uses her boss\'s absence to advance her career.', poster_path: '/placeholder.jpg', vote_average: 6.7, release_date: '1988-12-21', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Amazon Prime', 'YouTube', 'Apple TV'] },
    { id: 10026, title: 'The Proposal', overview: 'A Canadian executive must marry to avoid deportation.', poster_path: '/placeholder.jpg', vote_average: 6.7, release_date: '2009-06-19', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10027, title: 'Up in the Air', overview: 'A corporate downsizer reevaluates his life.', poster_path: '/placeholder.jpg', vote_average: 7.4, release_date: '2009-12-23', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10028, title: 'The Company Men', overview: 'Corporate downsizing affects three men at different stages of life.', poster_path: '/placeholder.jpg', vote_average: 6.8, release_date: '2010-10-22', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10029, title: 'Jerry Maguire', overview: 'A sports agent redefines his values.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '1996-12-13', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10030, title: 'The Pursuit of Happyness', overview: 'A struggling salesman takes custody of his son as he pursues a better life.', poster_path: '/placeholder.jpg', vote_average: 8.0, release_date: '2006-12-15', trailer: 'https://www.youtube.com/watch?v=39JdIjYrLdE', platforms: ['Netflix', 'Amazon Prime', 'Hulu'] },
    { id: 10031, title: 'Joy', overview: 'A single mother builds a business empire.', poster_path: '/placeholder.jpg', vote_average: 6.6, release_date: '2015-12-25', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10032, title: 'Erin Brockovich', overview: 'A legal assistant helps win a major lawsuit.', poster_path: '/placeholder.jpg', vote_average: 7.3, release_date: '2000-03-17', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10033, title: 'Hidden Figures', overview: 'The untold story of black female mathematicians at NASA.', poster_path: '/placeholder.jpg', vote_average: 7.8, release_date: '2016-12-25', trailer: 'https://www.youtube.com/watch?v=RK8xHqSAVuM', platforms: ['Disney+', 'Netflix', 'Amazon Prime'] },
    { id: 10034, title: 'The Help', overview: 'A young writer exposes the lives of maids in 1960s Mississippi.', poster_path: '/placeholder.jpg', vote_average: 8.1, release_date: '2011-08-10', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] },
    { id: 10035, title: 'Freedom Writers', overview: 'A teacher inspires at-risk students through writing.', poster_path: '/placeholder.jpg', vote_average: 7.5, release_date: '2007-01-05', trailer: 'https://www.youtube.com/watch?v=8ZdA4cX4G0E', platforms: ['Netflix', 'Amazon Prime', 'HBO Max'] }
  ]
};

class EduFlixService {
  // Get movie details by ID from the fallback database
  async getMovieDetails(id) {
    console.log('Fetching movie details for ID:', id);
    
    // Search through all categories in the fallback database
    for (const category in EDUCATIONAL_MOVIE_DATABASE) {
      const movie = EDUCATIONAL_MOVIE_DATABASE[category].find(m => m.id === parseInt(id));
      if (movie) {
        console.log('Found movie in database:', movie.title, 'with ID:', movie.id);
        
        // Try to fetch poster from TMDB
        let posterPath = movie.poster_path;
        try {
          const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
              api_key: TMDB_API_KEY,
              query: movie.title,
              page: 1
            }
          });
          
          if (response.data.results && response.data.results.length > 0) {
            const tmdbMovie = response.data.results[0];
            if (tmdbMovie.poster_path) {
              posterPath = `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`;
              console.log('Fetched TMDB poster for:', movie.title);
            }
          }
        } catch (error) {
          console.error('Error fetching poster for', movie.title, error);
        }
        
        // Fallback to placeholder if no poster found
        if (!posterPath || posterPath === '/placeholder.jpg' || !posterPath.startsWith('http')) {
          posterPath = `https://placehold.co/300x450/667eea/ffffff?text=${encodeURIComponent(movie.title.substring(0, 20))}&font=roboto`;
          console.log('Using placeholder poster for:', movie.title);
        }
        
        const result = {
          ...movie,
          poster_path: posterPath,
          educationalMetadata: {
            subjects: [category],
            topics: [],
            difficultyLevel: 'intermediate',
            educationalValue: movie.vote_average,
            learningObjectives: this.generateLearningObjectives(category, null),
            keyConcepts: this.generateKeyConcepts(category, null),
            discussionQuestions: this.generateDiscussionQuestions(category, null),
            vocabulary: this.generateVocabulary(category, null)
          }
        };
        console.log('Returning movie details:', result.title, 'with poster:', result.poster_path);
        return result;
      }
    }
    
    // If movie not found in database, return a fallback movie object
    console.warn('Movie not found in database for ID:', id);
    return {
      id: parseInt(id),
      title: 'Movie Not Found',
      overview: 'This movie could not be found in our database.',
      poster_path: `https://placehold.co/300x450/ff0000/ffffff?text=Not+Found&font=roboto`,
      vote_average: 0,
      release_date: '2023-01-01',
      educationalMetadata: {
        subjects: [],
        topics: [],
        difficultyLevel: 'intermediate',
        educationalValue: 0,
        learningObjectives: [],
        keyConcepts: [],
        discussionQuestions: [],
        vocabulary: []
      }
    };
  }

  // Get educational movies by subject and topic
  async getEducationalMovies(subject, topic, level, format) {
    // Use the expanded fallback database directly with level and format filters
    return this.getFallbackEducationalMovies(subject, topic, level, format);
  }

  // Build search query based on educational parameters
  buildSearchQuery(subject, topic, format) {
    const keywords = [];
    if (topic) keywords.push(topic);
    if (subject) keywords.push(subject);
    if (format === 'documentary') keywords.push('documentary');
    return keywords.join(' ') || subject || 'educational';
  }

  // Enrich TMDB results with educational metadata
  enrichWithEducationalMetadata(movies, subject, topic, level) {
    return movies.map(movie => ({
      ...movie,
      educationalMetadata: {
        subjects: [subject],
        topics: [topic],
        difficultyLevel: level || 'intermediate',
        educationalValue: this.calculateEducationalValue(movie),
        learningObjectives: this.generateLearningObjectives(subject, topic),
        keyConcepts: this.generateKeyConcepts(subject, topic),
        discussionQuestions: this.generateDiscussionQuestions(subject, topic),
        vocabulary: this.generateVocabulary(subject, topic)
      }
    }));
  }

  // Calculate educational value score
  calculateEducationalValue(movie) {
    let score = 5;
    if (movie.vote_average > 7) score += 2;
    if (movie.genre_ids?.includes(99)) score += 2; // Documentary
    if (movie.overview?.length > 100) score += 1;
    return Math.min(score, 10);
  }

  // Generate learning objectives
  generateLearningObjectives(subject, topic) {
    const objectives = {
      science: ['Understand fundamental scientific concepts', 'Explore natural phenomena and processes'],
      mathematics: ['Develop problem-solving skills', 'Understand mathematical principles'],
      technology: ['Learn about technological advancements', 'Understand innovation and its applications'],
      engineering: ['Understand engineering principles', 'Explore design and construction processes'],
      'social-sciences': ['Analyze social structures and relationships', 'Understand historical and cultural contexts'],
      health: ['Understand human biology and health', 'Explore medical and wellness concepts'],
      business: ['Learn business principles and strategies', 'Understand economic and market dynamics'],
      arts: ['Appreciate artistic expression', 'Understand cultural and historical significance'],
      environment: ['Understand environmental systems', 'Explore sustainability and conservation'],
      'life-skills': ['Develop practical life skills', 'Enhance personal and professional growth'],
      default: ['Gain knowledge in the subject area', 'Develop critical thinking skills']
    };
    return objectives[subject] || objectives.default;
  }

  // Generate key concepts
  generateKeyConcepts(subject, topic) {
    const concepts = {
      science: ['Scientific method', 'Natural laws', 'Research methodology'],
      mathematics: ['Problem solving', 'Logical reasoning', 'Mathematical modeling'],
      technology: ['Innovation', 'Digital literacy', 'Technical principles'],
      engineering: ['Design process', 'Systems thinking', 'Problem analysis'],
      'social-sciences': ['Social structures', 'Cultural analysis', 'Historical context'],
      health: ['Human biology', 'Wellness principles', 'Medical knowledge'],
      business: ['Market dynamics', 'Strategic planning', 'Financial literacy'],
      arts: ['Artistic expression', 'Cultural significance', 'Creative process'],
      environment: ['Ecosystems', 'Sustainability', 'Conservation'],
      'life-skills': ['Personal development', 'Communication', 'Decision making'],
      default: ['Core principles', 'Practical applications', 'Theoretical foundations']
    };
    return concepts[subject] || concepts.default;
  }

  // Generate discussion questions
  generateDiscussionQuestions(subject, topic) {
    return [
      `What are the main ${subject} concepts presented?`,
      `How does this content relate to real-world applications?`,
      `What questions do you have about ${topic}?`,
      `How might this information change your perspective?`
    ];
  }

  // Generate vocabulary list
  generateVocabulary(subject, topic) {
    const vocab = {
      science: ['hypothesis', 'experiment', 'data', 'conclusion'],
      mathematics: ['equation', 'variable', 'function', 'theorem'],
      technology: ['innovation', 'algorithm', 'digital', 'automation'],
      engineering: ['design', 'prototype', 'system', 'optimization'],
      'social-sciences': ['society', 'culture', 'institution', 'dynamics'],
      health: ['wellness', 'biology', 'medicine', 'prevention'],
      business: ['market', 'strategy', 'investment', 'growth'],
      arts: ['expression', 'creativity', 'aesthetic', 'culture'],
      environment: ['ecosystem', 'sustainability', 'conservation', 'climate'],
      'life-skills': ['communication', 'leadership', 'productivity', 'growth'],
      default: ['concept', 'principle', 'application', 'theory']
    };
    return vocab[subject] || vocab.default;
  }

  // Fallback educational movies when API fails
  async getFallbackEducationalMovies(subject, topic, level, format) {
    const subjectMovies = EDUCATIONAL_MOVIE_DATABASE[subject] || [];
    
    // Add topic-specific movie if available
    let movies = [...subjectMovies];
    if (topic) {
      // Generate a consistent ID based on subject and topic
      const topicId = subject.charCodeAt(0) * 10000 + topic.length * 100 + 9999;
      const topicMovie = {
        id: topicId,
        title: `${topic}: A Comprehensive Guide`,
        overview: `An in-depth exploration of ${topic} within the field of ${subject}.`,
        poster_path: '/placeholder.jpg',
        vote_average: 8.5,
        release_date: '2023-01-01'
      };
      movies.unshift(topicMovie);
    }

    // Filter by learning level based on vote_average
    let filteredMovies = movies;
    if (level) {
      filteredMovies = movies.filter(movie => {
        const rating = movie.vote_average || 7;
        switch (level) {
          case 'beginner':
            return rating < 7;
          case 'intermediate':
            return rating >= 7 && rating < 8;
          case 'advanced':
            return rating >= 8 && rating < 8.5;
          case 'professional':
            return rating >= 8.5;
          default:
            return true;
        }
      });
    }

    // Filter by format based on title keywords
    if (format && format !== 'all') {
      filteredMovies = filteredMovies.filter(movie => {
        const title = movie.title.toLowerCase();
        const overview = (movie.overview || '').toLowerCase();
        
        switch (format) {
          case 'documentary':
            return title.includes('documentary') || overview.includes('documentary') || 
                   title.includes('series') || title.includes('story of') ||
                   title.includes('the story') || title.includes('exploring') ||
                   title.includes('nova') || title.includes('bbc') || title.includes('pbs');
          case 'tv-series':
            return title.includes('series') || title.includes('season') || 
                   overview.includes('series') || overview.includes('tv');
          case 'movie':
            return !title.includes('series') && !title.includes('documentary') &&
                   !overview.includes('documentary') && !title.includes('season');
          case 'biography':
            return title.includes('story of') || title.includes('the story') ||
                   overview.includes('story') || overview.includes('biography') ||
                   title.includes('portrait') || title.includes('life');
          case 'based-on-real-events':
            return overview.includes('true story') || overview.includes('based on') ||
                   overview.includes('real') || title.includes('real');
          case 'animated-film':
            return title.includes('animation') || overview.includes('animation') ||
                   title.includes('animated') || overview.includes('animated');
          case 'historical-drama':
            return title.includes('war') || title.includes('history') ||
                   overview.includes('historical') || overview.includes('war');
          case 'short-film':
            return title.includes('short') || overview.includes('short');
          case 'mini-series':
            return title.includes('mini') || overview.includes('mini');
          default:
            return true;
        }
      });
    }

    // If no movies match filters, return all movies
    if (filteredMovies.length === 0) {
      filteredMovies = movies;
    }

    // Fetch poster URLs from TMDB for each movie
    const moviesWithPosters = await Promise.all(filteredMovies.map(async (movie) => {
      let posterPath = movie.poster_path;
      
      // Try to fetch poster from TMDB
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query: movie.title,
            page: 1
          }
        });
        
        if (response.data.results && response.data.results.length > 0) {
          const tmdbMovie = response.data.results[0];
          if (tmdbMovie.poster_path) {
            posterPath = `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`;
          }
        }
      } catch (error) {
        console.error('Error fetching poster for', movie.title, error);
      }
      
      // Fallback to placeholder if no valid poster found
      if (!posterPath || posterPath === '/placeholder.jpg' || !posterPath.startsWith('http')) {
        posterPath = `https://placehold.co/300x450/667eea/ffffff?text=${encodeURIComponent(movie.title.substring(0, 20))}&font=roboto`;
      }
      
      return {
        ...movie,
        poster_path: posterPath
      };
    }));

    return moviesWithPosters.map(movie => ({
      ...movie,
      educationalMetadata: {
        subjects: [subject],
        topics: [topic],
        difficultyLevel: this.getDifficultyLevel(movie.vote_average),
        educationalValue: movie.vote_average,
        learningObjectives: this.generateLearningObjectives(subject, topic),
        keyConcepts: this.generateKeyConcepts(subject, topic),
        discussionQuestions: this.generateDiscussionQuestions(subject, topic),
        vocabulary: this.generateVocabulary(subject, topic)
      }
    }));
  }

  // Generate a color based on movie title
  generatePosterColor(title) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'];
    const index = title.length % colors.length;
    return colors[index];
  }

  // Get difficulty level based on rating
  getDifficultyLevel(rating) {
    if (!rating) return 'intermediate';
    if (rating < 7) return 'beginner';
    if (rating < 8) return 'intermediate';
    if (rating < 8.5) return 'advanced';
    return 'professional';
  }

  // Get movie details with educational info
  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
        params: { api_key: TMDB_API_KEY, append_to_response: 'credits,videos' }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }

  // Get trending educational content
  async getTrendingEducational() {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
        params: { api_key: TMDB_API_KEY }
      });
      return response.data.results.slice(0, 10);
    } catch (error) {
      console.error('Error fetching trending:', error);
      return [];
    }
  }

  // Search by multiple criteria
  async smartSearch(query, filters = {}) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
        params: {
          api_key: TMDB_API_KEY,
          query: query,
          page: 1
        }
      });
      return response.data.results.filter(item => 
        item.media_type === 'movie' || item.media_type === 'tv'
      );
    } catch (error) {
      console.error('Error in smart search:', error);
      return [];
    }
  }

  // Get recommendations based on user preferences
  async getPersonalizedRecommendations(userPreferences) {
    const { subjects, level, format, watchHistory } = userPreferences;
    const recommendations = [];

    for (const subject of subjects) {
      const movies = await this.getEducationalMovies(subject, null, level, format);
      recommendations.push(...movies);
    }

    // Remove duplicates and sort by educational value
    const unique = Array.from(new Map(recommendations.map(m => [m.id, m])).values());
    return unique.sort((a, b) => 
      (b.educationalMetadata?.educationalValue || 0) - (a.educationalMetadata?.educationalValue || 0)
    ).slice(0, 20);
  }
}

export default new EduFlixService();
