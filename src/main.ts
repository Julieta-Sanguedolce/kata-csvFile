import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";

// Read the text file
fs.readFile("jokes_for_cohort.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Process the content (splitting lines and creating objects with an index)
    const lines = data.split("\n\n").map((line) => line.trim());

    const objects = lines.map((line, index) => ({
        index: index + 1, // Adding 1 to make the index start from 1
        content: line,
    }));

    const csvWriter = createObjectCsvWriter({
        path: "jokes.csv",
        header: [
            { id: "index", title: "Index" },
            { id: "content", title: "Content" },
        ],
    });

    csvWriter
        .writeRecords(objects)
        .then(() => {
            console.log("CSV file written successfully");
        })
        .catch((error) => {
            console.error("Error writing CSV file:", error);
        });
});
