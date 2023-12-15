export const getUnsplashImage = async (query) => {
  try {
    const imageResponseRaw = await fetch(
      `https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
    );

    const imageResponse = await imageResponseRaw.json();

    // Check if results array exists and has at least one item
    if (imageResponse.results && imageResponse.results.length > 0) {
      return imageResponse.results[0].urls.small_s3;
    } else {
      console.error("No results found in the Unsplash API response.");
      return "";
    }
  } catch (error) {
    console.error("Error fetching or parsing Unsplash API response:", error);
    throw error;
  }
};
