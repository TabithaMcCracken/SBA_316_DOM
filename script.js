const bookSelect = document.getElementById("book-select");
const chapterInput = document.getElementById("chapter-input");
const verseInput = document.getElementById("verse-input");
const showVerseBtn = document.getElementById("show-verse-btn");
const form = document.getElementById("verse-form");

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
        verses: ["asdfasdf", "asdfasdf"],
      },
      {
        number: 2,
        verses: ["asdaf", "adfdsaf"],
      },
    ],
  },
];
document.addEventListener("DOMContentLoaded", function () {
    practiceVerseBtn = document.getElementById("practice-verse-btn");

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
    });

    //Add event listenter to the practice button
    practiceVerseBtn.addEventListener("click", function(){
        //check if verse is selected
        const verseText = document.getElementById("verse-display").textContent.trim();
        if (!verseText){
            alert ("Please select a verse first.");
            return;
        }

        //Implement practice verse functionality here
        console.log("Practice verse button clicked.");
        //     //practive verse functionality here
        //     console.log("Practice verse button clicked.");
        // });

      });

 

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
    verseDisplay.textContent = `${selectedBook.name} ${chapter}:${verse} - ${verseText}`;
    // For now, you can just log the chapter and verse numbers to the console
  }


// Function to scrambles the words of the verse and display them in boxes.
function scrambleAndDisplayVerse(verseText) {
    const verseWords = verseText.split(" "); // Split verse into words
    verseWords.sort(() => Math.random() - 0.5); // Shuffle words

    const verseDisplayTable = document.getElementById("verse-display-table");
    verseDisplayTable.innerHTML = ""; // Clear existing content

    const table = document.createElement("table");

    verseWords.forEach(function (word) {
      const cell = document.createElement("td");
      cell.textContent = word;
      cell.classList.add("word-box");
      const row = document.createElement("tr");
      row.appendChild(cell);
      table.appendChild(row);
    });
  }

});//Closes out the script