export const convertArrayToFileList = (fileArray: File[]): File[] => {
    const dataTransfer = new DataTransfer();
    fileArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
  
    return Array.from(dataTransfer.files); 
  };
  