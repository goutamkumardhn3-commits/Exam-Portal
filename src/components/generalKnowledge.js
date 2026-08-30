const baseQuestions = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 2,
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    answer: "New Delhi"
  },
  {
    id: 3,
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    id: 4,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare"
  },
  {
    id: 5,
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C"
  },
  {
    id: 6,
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    id: 8,
    question: "Who is known as the Father of Modern Physics?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"],
    answer: "Albert Einstein"
  },
  {
    id: 9,
    question: "Which country has the most population?",
    options: ["India", "USA", "China", "Indonesia"],
    answer: "India"
  },
  {
    id: 10,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au"
  },
  {
    id: 11,
    question: "Which mountain is the tallest in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest"
  },
  {
    id: 12,
    question: "In which year did the Titanic sink?",
    options: ["1912", "1915", "1920", "1905"],
    answer: "1912"
  },
  {
    id: 13,
    question: "What is the capital of France?",
    options: ["Lyon", "Marseille", "Paris", "Nice"],
    answer: "Paris"
  },
  {
    id: 14,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    id: 15,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury"
  },
  {
    id: 16,
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    answer: "George Washington"
  },
  {
    id: 17,
    question: "What is the speed of light?",
    options: ["3 × 10^8 m/s", "3 × 10^7 m/s", "3 × 10^9 m/s", "3 × 10^6 m/s"],
    answer: "3 × 10^8 m/s"
  },
  {
    id: 18,
    question: "Which is the largest continent by area?",
    options: ["Africa", "Asia", "Europe", "North America"],
    answer: "Asia"
  },
  {
    id: 19,
    question: "What is the capital of Japan?",
    options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"],
    answer: "Tokyo"
  },
  {
    id: 20,
    question: "How many bones are there in the human body?",
    options: ["186", "206", "226", "246"],
    answer: "206"
  },
  {
    id: 21,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
    answer: "Hydrogen"
  },
  {
    id: 22,
    question: "In which country is the Statue of Liberty located?",
    options: ["France", "Canada", "United States", "United Kingdom"],
    answer: "United States"
  },
  {
    id: 23,
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian", "Gobi", "Antarctica"],
    answer: "Antarctica"
  },
  {
    id: 24,
    question: "Which organ pumps blood in the human body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    answer: "Heart"
  },
  {
    id: 25,
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
    answer: "Pound Sterling"
  }
];

const additionalQuestions = [
  { id: 26, question: "Which planet is famous for its rings?", options: ["Mars", "Saturn", "Venus", "Mercury"], answer: "Saturn" },
  { id: 27, question: "Which is the largest mammal on Earth?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
  { id: 28, question: "What is the capital of Germany?", options: ["Munich", "Frankfurt", "Berlin", "Hamburg"], answer: "Berlin" },
  { id: 29, question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
  { id: 30, question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Iron", "Quartz"], answer: "Diamond" },
  { id: 31, question: "What is the largest bird in the world?", options: ["Eagle", "Ostrich", "Penguin", "Swan"], answer: "Ostrich" },
  { id: 32, question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Baht"], answer: "Yen" },
  { id: 33, question: "Which organ in the human body filters blood?", options: ["Lungs", "Kidneys", "Liver", "Pancreas"], answer: "Kidneys" },
  { id: 34, question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
  { id: 35, question: "Which is the hottest planet in the solar system?", options: ["Mercury", "Venus", "Mars", "Jupiter"], answer: "Venus" },
  { id: 36, question: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: "12" },
  { id: 37, question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
  { id: 38, question: "Which is the largest desert in the world?", options: ["Gobi", "Arabian", "Kalahari", "Antarctica"], answer: "Antarctica" },
  { id: 39, question: "What is the capital of Spain?", options: ["Seville", "Madrid", "Barcelona", "Valencia"], answer: "Madrid" },
  { id: 40, question: "Which country is called the Land of the Rising Sun?", options: ["China", "Japan", "Thailand", "South Korea"], answer: "Japan" },
  { id: 41, question: "Which metal is liquid at room temperature?", options: ["Lead", "Silver", "Mercury", "Copper"], answer: "Mercury" },
  { id: 42, question: "What is 2 + 2 × 2?", options: ["4", "6", "8", "10"], answer: "6" },
  { id: 43, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Amazon" },
  { id: 44, question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], answer: "Brasília" },
  { id: 45, question: "Which animal is known as the ship of the desert?", options: ["Horse", "Camel", "Donkey", "Zebra"], answer: "Camel" },
  { id: 46, question: "Which is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Gaur"], answer: "Tiger" },
  { id: 47, question: "Who discovered gravity?", options: ["Galileo", "Newton", "Einstein", "Kepler"], answer: "Newton" },
  { id: 48, question: "Which language has the most native speakers worldwide?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], answer: "Mandarin Chinese" },
  { id: 49, question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Mary Shelley"], answer: "Jane Austen" },
  { id: 50, question: "Which gas do humans inhale for respiration?", options: ["Carbon Dioxide", "Oxygen", "Helium", "Nitrous Oxide"], answer: "Oxygen" },
  { id: 51, question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Montreal", "Vancouver"], answer: "Ottawa" },
  { id: 52, question: "Which is the largest planet in the solar system?", options: ["Earth", "Jupiter", "Saturn", "Neptune"], answer: "Jupiter" },
  { id: 53, question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Australia", "Africa", "South America"], answer: "Africa" },
  { id: 54, question: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], answer: "366" },
  { id: 55, question: "Which planet is known as the Morning Star?", options: ["Mars", "Venus", "Mercury", "Jupiter"], answer: "Venus" },
  { id: 56, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
  { id: 57, question: "Which is the fastest land animal?", options: ["Horse", "Cheetah", "Lion", "Leopard"], answer: "Cheetah" },
  { id: 58, question: "Which is the largest country by area?", options: ["Canada", "Russia", "China", "United States"], answer: "Russia" },
  { id: 59, question: "Which color is produced by mixing blue and yellow?", options: ["Green", "Red", "Purple", "Orange"], answer: "Green" },
  { id: 60, question: "Which is the tallest waterfall in the world?", options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], answer: "Angel Falls" },
  { id: 61, question: "Who is the author of 'The Chronicles of Narnia'?", options: ["J.R.R. Tolkien", "C.S. Lewis", "George Orwell", "J.K. Rowling"], answer: "C.S. Lewis" },
  { id: 62, question: "What is the capital of Italy?", options: ["Milan", "Rome", "Naples", "Florence"], answer: "Rome" },
  { id: 63, question: "Which is the smallest continent?", options: ["Europe", "Australia", "Antarctica", "South America"], answer: "Australia" },
  { id: 64, question: "What is the freezing point of water in Celsius?", options: ["0°C", "32°C", "-10°C", "100°C"], answer: "0°C" },
  { id: 65, question: "Which organ is responsible for vision?", options: ["Ear", "Eye", "Nose", "Tongue"], answer: "Eye" },
  { id: 66, question: "Which scientist proposed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Feynman"], answer: "Einstein" },
  { id: 67, question: "What is the capital of South Korea?", options: ["Busan", "Seoul", "Incheon", "Daegu"], answer: "Seoul" },
  { id: 68, question: "Which metal is used in making coins and jewelry?", options: ["Copper", "Nickel", "Gold", "Iron"], answer: "Gold" },
  { id: 69, question: "How many zeros are there in one million?", options: ["5", "6", "7", "8"], answer: "6" },
  { id: 70, question: "What is the currency of Germany?", options: ["Euro", "Dollar", "Franc", "Pound"], answer: "Euro" },
  { id: 71, question: "Which is the longest bone in the human body?", options: ["Femur", "Humerus", "Tibia", "Radius"], answer: "Femur" },
  { id: 72, question: "What is the capital of Turkey?", options: ["Istanbul", "Ankara", "Izmir", "Antalya"], answer: "Ankara" },
  { id: 73, question: "Which planet has the Great Red Spot?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: "Jupiter" },
  { id: 74, question: "Who discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Edward Jenner", "Louis Pasteur"], answer: "Alexander Fleming" },
  { id: 75, question: "Which is the national flower of India?", options: ["Rose", "Lotus", "Sunflower", "Tulip"], answer: "Lotus" },
  { id: 76, question: "Which instrument has 88 keys?", options: ["Violin", "Piano", "Flute", "Guitar"], answer: "Piano" },
  { id: 77, question: "What is the capital of Egypt?", options: ["Cairo", "Alexandria", "Luxor", "Giza"], answer: "Cairo" },
  { id: 78, question: "Which is the largest island in the world?", options: ["Greenland", "Madagascar", "Borneo", "Sumatra"], answer: "Greenland" },
  { id: 79, question: "What is the value of pi approximately?", options: ["2.14", "3.14", "4.14", "5.14"], answer: "3.14" },
  { id: 80, question: "Who was the first person to step on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], answer: "Neil Armstrong" },
  { id: 81, question: "Which is the coldest planet?", options: ["Neptune", "Mars", "Uranus", "Mercury"], answer: "Neptune" },
  { id: 82, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: "3" },
  { id: 83, question: "Which is the capital of Argentina?", options: ["Buenos Aires", "Córdoba", "Rosario", "La Plata"], answer: "Buenos Aires" },
  { id: 84, question: "Which ocean is the smallest?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean"], answer: "Arctic Ocean" },
  { id: 85, question: "Who wrote 'Animal Farm'?", options: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "Ernest Hemingway"], answer: "George Orwell" },
  { id: 86, question: "What is the capital of Switzerland?", options: ["Zurich", "Geneva", "Bern", "Basel"], answer: "Bern" },
  { id: 87, question: "Which is the primary color among these?", options: ["Green", "Orange", "Blue", "Purple"], answer: "Blue" },
  { id: 88, question: "How many minutes are there in 3 hours?", options: ["120", "150", "180", "210"], answer: "180" },
  { id: 89, question: "Which is the largest lake in the world by surface area?", options: ["Lake Superior", "Lake Victoria", "Caspian Sea", "Lake Baikal"], answer: "Caspian Sea" },
  { id: 90, question: "Which metal is attracted to a magnet?", options: ["Gold", "Tin", "Iron", "Silver"], answer: "Iron" },
  { id: 91, question: "What is the capital of Mexico?", options: ["Guadalajara", "Mexico City", "Monterrey", "Cancún"], answer: "Mexico City" },
  { id: 92, question: "Which country has the city of Petra?", options: ["Jordan", "Egypt", "Syria", "Saudi Arabia"], answer: "Jordan" },
  { id: 93, question: "Who is known as the 'Father of the Nation' in India?", options: ["Subhash Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Bhagat Singh"], answer: "Mahatma Gandhi" },
  { id: 94, question: "What is the capital of Nepal?", options: ["Pokhara", "Kathmandu", "Lalitpur", "Biratnagar"], answer: "Kathmandu" },
  { id: 95, question: "Which planet is famous for its beautiful rings?", options: ["Mars", "Saturn", "Venus", "Earth"], answer: "Saturn" },
  { id: 96, question: "What is the capital of South Africa?", options: ["Cape Town", "Durban", "Pretoria", "Johannesburg"], answer: "Pretoria" },
  { id: 97, question: "Which is the largest moon of Saturn?", options: ["Europa", "Titan", "Ganymede", "Io"], answer: "Titan" },
  { id: 98, question: "Which language is mainly spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], answer: "Portuguese" },
  { id: 99, question: "What is the capital of Portugal?", options: ["Lisbon", "Porto", "Braga", "Coimbra"], answer: "Lisbon" },
  { id: 100, question: "Which bird can mimic human speech?", options: ["Crow", "Parrot", "Pigeon", "Eagle"], answer: "Parrot" }
];

export const questionsData = [...baseQuestions, ...additionalQuestions];