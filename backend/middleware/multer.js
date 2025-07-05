import multer from "multer";

const storage = multer.memoryStorage(); // Correct spelling and parentheses
const uploadFile = multer({ storage }).single("file"); 

export default uploadFile;
