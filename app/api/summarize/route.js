// app/api/summarize/route.js

import axios from 'axios';

export async function POST(req) {
  const { url } = await req.json();

  const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url,
      length: '3'  // You can adjust this based on how detailed you want the summary
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return Response.json(response.data);
  } catch (error) {
    console.error('RapidAPI Error:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch summary.' }), {
      status: 500,
    });
  }
}
