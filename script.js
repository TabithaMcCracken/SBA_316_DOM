const bookSelect = document.getElementById("book-select");
const chapterInput = document.getElementById("chapter-input");
const verseInput = document.getElementById("verse-input");
const showVerseBtn = document.getElementById("show-verse-btn");
const practiceVerseBtn = document.getElementById("practice-verse-btn");
const checkVerseBtn = document.getElementById("check-verse-btn");
let originalVerseText = "";
// Add a flag to prevent multiple event listeners on the "Check Verse" button
// I'm sure there is a better way to do this, but I can't figure it out without refactoring everything :-)
let checkVerseBtnListenerAdded = false;

const booksOfBible = [
  {
    name: "Psalms",
    chapters: [
      {
        number: 1,
        verses: [
          "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers;",
          "but his delight is in the law of the LORD, and on his law he meditates day and night.",
          "He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers.",
          "The wicked are not so, but are like chaff that the wind drives away.",
          "Therefore the wicked will not stand in the judgment, nor sinners in the congregation of the righteous;",
          "for the LORD knows the way of the righteous, but the way of the wicked will perish ",
        ],
      },
      {
        number: 2,
        verses: [
          "Why do the nations rage and the peoples plot in vain?",
          "The kings of the earth set themselves, and the rulers take counsel together, against the LORD and against his Anointed, saying,",
          '"Let us burst their bonds apart and cast away their cords from us."',
          "He who sits in the heavens laughs; the Lord holds them in derision.",
          "Then he will speak to them in his wrath, and terrify them in his fury, saying,",
          '"As for me, I have set my King on Zion, my holy hill."',
          'I will tell of the decree: The LORD said to me, "You are my Son; today I have begotten you.',
          "Ask of me, and I will make the nations your heritage, and the ends of the earth your possession.",
          "You shall break them with a rod of iron and dash them in pieces like a potter's vessel.\"",
          "Now therefore, O kings, be wise; be warned, O rulers of the earth.",
          "Serve the LORD with fear, and rejoice with trembling.",
          "Kiss the Son, lest he be angry, and you perish in the way, for his wrath is quickly kindled. Blessed are all who take refuge in him.",
        ],
      },
      {
        number: 3,
        verses: [
          "O LORD, how many are my foes! Many are rising against me;",
          "many are saying of my soul, there is no salvation for him in God. Selah",
          "But you, O LORD, are a shield about me, my glory, and the lifter of my head.",
          "I cried aloud to the LORD, and he answered me from his holy hill. Selah",
          "I lay down and slept; I woke again, for the LORD sustained me.",
          "I will not be afraid of many thousands of people who have set themselves against me all around.",
          "Arise, O LORD! Save me, O my God! For you strike all my enemies on the cheek; you break the teeth of the wicked.",
          "Salvation belongs to the LORD; your blessing be on your people! Selah",
        ],
      },
      // Add more chapters
    ],
  },
  {
    name: "Proverbs",
    chapters: [
      {
        number: 1,
        verses: [
          "The proverbs of Solomon, son of David, king of Israel:",
          "To know wisdom and instruction, to understand words of insight,",
          "to receive instruction in wise dealing, in righteousness, justice, and equity;",
          "to give prudence to the simple, knowledge and discretion to the youth--",
          "Let the wise hear and increase in learning, and the one who understands obtain guidance,",
          "to understand a proverb and a saying, the words of the wise and their riddles.",
          "The fear of the LORD is the beginning of knowledge; fools despise wisdom and instruction.",
        ],
      },
      {
        number: 2,
        verses: [
          "My son, if you receive my words and treasure up my commandments with you,",
          "making your ear attentive to wisdom and inclining your heart to understanding;",
          "yes, if you call out for insight and raise your voice for understanding,",
          "if you seek it like silver and search for it as for hidden treasures,",
          "then you will understand the fear of the LORD and find the knowledge of God.",
          "For the LORD gives wisdom; from his mouth come knowledge and understanding;",
          "he stores up sound wisdom for the upright; he is a shield to those who walk in integrity,",
          "guarding the paths of justice and watching over the way of his saints.",
        ],
      },
    ],
  },
];
document.addEventListener("DOMContentLoaded", function () {
  //Creates the drop down for each book
  booksOfBible.forEach(function (book) {
    const option = document.createElement("option");
    option.textContent = book.name;
    option.value = book.name;
    bookSelect.appendChild(option);
  });

  // Add event listener to the "Show Verse" button
  showVerseBtn.addEventListener("click", function () {
    event.preventDefault();
    const bookName = bookSelect.value;
    const chapter = chapterInput.value.trim();
    const verse = verseInput.value.trim();

    // Call the isValidChapterVerse function to validate chapter and verse
    const isValid = isValidChapterVerse(bookName, chapter, verse); //??
    const selectedBook = booksOfBible.find((book) => book.name === bookName);
    const isValidChapter =
      selectedBook &&
      selectedBook.chapters.some((chap) => chap.number === parseInt(chapter));

    // If the selected book is found
    if (selectedBook) {
      //Check if the selected chapter exists in the book
      if (!isValidChapter) {
        console.log("Invalid Chapter.");
        const numChapters = selectedBook.chapters.length;
        alert(
          `Please enter a valid chapter number. \n\n${selectedBook.name} has ${numChapters} chapters.`
        );
        return; // Exit the function early
      }

      // Find the selected chapter in the chapters array of the selected book
      const selectedChapter = selectedBook.chapters.find(
        (chap) => chap.number === parseInt(chapter)
      );
      const numVersesInChapter = selectedChapter.verses.length;

      // If the selected verse is valid, proceed to show the verse
      if (parseInt(verse) >= 1 && parseInt(verse) <= numVersesInChapter) {
        console.log("Chapter and verse are valid.");
        showVerse(bookName, chapter, verse);

        //Enable practice verse button
        practiceVerseBtn.disabled = false;
      } else {
        console.log("Invalid verse.");
        alert(
          `Please enter a valid verse number.\n\nVerse: ${verse} does not exist in ${selectedBook.name} ${chapter}.\n\n${selectedBook.name} ${chapter} has ${numVersesInChapter} verses.`
        );
      }
    } else {
      console.log("Selected book not found.");
      alert("Please select a valid book from the dropdown.");
    }
    this.style.backgroundColor = "green";
  });

  //Add event listenter to the practice button
  practiceVerseBtn.addEventListener("click", function () {
    event.preventDefault();
    console.log("The practice verse button was clicked.");

    const orderedWordsSection = document.getElementById(
      "ordered-words-section"
    );
    orderedWordsSection.textContent = "";

    // Reset button background colors
    this.style.backgroundColor = "";
    checkVerseBtn.style.backgroundColor = "";

    // Get the verse content from the selected chapter's verses array
    const bookName = bookSelect.value;
    const chapter = chapterInput.value.trim();
    const verse = verseInput.value.trim();

    // Find the selected book from the booksOfBible array
    const selectedBook = booksOfBible.find((book) => book.name === bookName);

    // Find the selected chapter in the chapters array of the selected book
    const selectedChapter = selectedBook.chapters.find(
      (chap) => chap.number === parseInt(chapter)
    );

    // Fetch the verse content directly from the selected chapter's verses array
    const verseContent = selectedChapter.verses[parseInt(verse) - 1];

    // Check if verse is selected
    if (!verseContent.trim()) {
      alert("Please select a verse first.");
      return;
    }
    this.style.backgroundColor = "green";
    scrambleAndDisplayVerse(verseContent);
  });
  // Function to check if the chapter and verse exist and are valid
  function isValidChapterVerse(bookName, chapter, verse) {
    // Find the selected book from the booksOfBible array
    const selectedBook = booksOfBible.find((book) => book.name === bookName);

    // Regular expression pattern for positive integers greater than zero
    const pattern = /^[1-9][0-9]*$/;

    if (selectedBook && pattern.test(chapter) && pattern.test(verse)) {
      // Find the selected chapter in the chapters array of the selected book
      const selectedChapter = selectedBook.chapters.find(
        (chap) => chap.number === parseInt(chapter)
      );

      // If the selected chapter is found
      if (selectedChapter) {
        // Check if the selected verse exists in the selected chapter
        if (
          parseInt(verse) >= 1 &&
          parseInt(verse) <= selectedChapter.verses.length
        ) {
          return true; // Chapter and verse exist
        }
      }
    }
    return false; // Chapter or verse does not exist or inputs are not valid numbers
  }

  // Function to show the selected verse
  function showVerse(bookName, chapter, verse) {
    // Implement logic to display the selected verse based on chapter and verse numbers
    // You can fetch the verse from your data structure (e.g., array of Psalms)
    // and display it in the "verse-display" section
    const verseDisplay = document.getElementById("verse-display");

    // Find the selected book from the booksOfBible array
    const selectedBook = booksOfBible.find((book) => book.name === bookName);
    console.log(selectedBook);
    // Find the selected chapter in the chapters array of the selected book
    const selectedChapter = selectedBook.chapters.find(
      (chap) => chap.number === parseInt(chapter)
    );
    console.log(selectedChapter);
    // Get the verse text
    const verseText = selectedChapter.verses[parseInt(verse) - 1];
    console.log(verseText);
    // Display the verse in the verse-display section
    verseDisplay.textContent = `${selectedBook.name} ${chapter}:${verse} ${verseText}`;
  
  }

  // Function to scrambles the words of the verse and display them in boxes.
  function scrambleAndDisplayVerse(verseText) {
    if (typeof verseText !== "string") {
      console.error("Verse text is not a string.");
      console.error("Actual type:", typeof verseText);
      return; // Exit the function
    }
    originalVerseText = verseText;
    const verseWords = verseText.split(" "); // Split verse into words
    verseWords.sort(() => Math.random() - 0.5); // Shuffle words

    const verseDisplayTable = document.getElementById("verse-display-table");
    verseDisplayTable.innerHTML = ""; // Clear existing content

    const header = document.createElement("h3");
    header.textContent = "Click on the words to put them back in order.";
    verseDisplayTable.appendChild(header); // Append the header to the container

    const table = document.createElement("table");
    table.classList.add("verse-table");

    verseWords.forEach(function (word) {
      const cell = document.createElement("td");
      cell.textContent = word;
      cell.classList.add("word-cell");

      cell.addEventListener("click", function () {
        // Remove the clicked word from the table
        cell.parentNode.removeChild(cell);

        // Add the clicked word to the ordered words section
        const orderedWordsSection = document.getElementById(
          "ordered-words-section"
        );
        orderedWordsSection.textContent += word + " ";

        // Check if there are no more cells left
        if (table.querySelectorAll("td").length === 0) {
          // Add event listener to the "Check Verse" button
          if (!checkVerseBtnListenerAdded) {
            checkVerseBtn.addEventListener("click", function () {
              this.style.backgroundColor = "green";
              checkVerse();
            });
            checkVerseBtnListenerAdded = true;
          }
        }
      });

      const row = document.createElement("tr");
      row.appendChild(cell);
      table.appendChild(row);
    });

    verseDisplayTable.appendChild(table);
  }

  // Function to check if the verse order is correct
  function checkVerse() {
    const orderedWordsSection = document.getElementById(
      "ordered-words-section"
    );
    const orderedWords = orderedWordsSection.textContent.trim().split(" ");
    const originalWords = originalVerseText.trim().split(" ");

    if (arraysEqual(orderedWords, originalWords)) {
      alert("Congratulations! You got the verse right!");
    } else {
      alert("Sorry, the ordered words don't match the verse. Try again.");

      orderedWordsSection.textContent = "";
      practiceVerseBtn.style.backgroundColor = "";
      checkVerseBtn.style.backgroundColor = "";
      // Restart the process by calling scrambleAndDisplayVerse again
      scrambleAndDisplayVerse(orderedWords);
    }
  }

  // Function to check if two arrays are equal
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  //Close out the script
});
