export const generateDownload = (response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.TLL');
  document.body.appendChild(link);
  link.click();
};