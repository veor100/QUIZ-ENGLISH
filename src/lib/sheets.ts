export const appendRowToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: any[]
) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [values],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to append to Google Sheet', errorData);
    throw new Error('Failed to save data to Google Sheets.');
  }

  return await response.json();
};
