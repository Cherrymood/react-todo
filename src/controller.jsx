async function fetchDataPost(data) {
  try {
    const airtableData = {
      fields: {
        Title: data.title,
        created: Date.now().toString(),
      },
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
        import.meta.env.VITE_TABLE_NAME
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      }
    );

    if (!response.ok) {
      const message = `Error has ocurred:
                               ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    console.log("result", result);

    return { id: result.id, title: result.fields.Title };
  } catch (error) {
    console.error("Error posting data:", error);
    return { error: error.message };
  }
}

async function fetchDataDelete(recordId) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
        import.meta.env.VITE_TABLE_NAME
      }/${recordId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const message = `Error has occurred: ${response.status}`;
      throw new Error(message);
    }

    // const dataResponse = await response.json();

    return { success: true, deletedId: recordId };
  } catch (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
}
