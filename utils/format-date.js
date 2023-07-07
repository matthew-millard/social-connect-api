export default function formatDate(timestamp) {
  const year = timestamp.getFullYear();
  let month = timestamp.getMonth() + 1; // JS months are 0 - 11
  let day = timestamp.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return `${day}-${month}-${year}`;
}
