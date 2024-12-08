'use strict';


export const filterMoods = async (data, dateValue, nameValue) => {
  try {
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return [];
    }

    // If both inputs are cleared, return the full data array
    if (!dateValue && !nameValue) {
      return data;
    }

    return data.filter((mood) => {
      const moodName = typeof mood.mood === "string" ? mood.mood.toLowerCase() : "";
      const inputName = nameValue ? nameValue.trim().toLowerCase() : "";
      const matchesDate = dateValue ? mood.date === dateValue : true;
      const matchesName = inputName ? moodName.includes(inputName) : true;

      // Allow flexible filtering: Match either condition if both are provided
      return dateValue && nameValue ? matchesDate || matchesName : matchesDate && matchesName;
    });
  } catch (error) {
    console.error("Error in filterMoods:", error);
    return [];
  }
};
