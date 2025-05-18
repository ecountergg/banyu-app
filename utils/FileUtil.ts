export const downloadFilePdf = async (file: File, fileName: string) => {
    const blob = new Blob([file], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
};
