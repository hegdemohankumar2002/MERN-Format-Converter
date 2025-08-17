const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testRoutes() {
  console.log('Testing API routes...\n');

  try {
    // Test the main convert route
    console.log('1. Testing /api/convert/ (main convert route)...');
    const response1 = await axios.post(`${BASE_URL}/api/convert/`, {}, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ Main convert route working');
  } catch (error) {
    console.log('❌ Main convert route error:', error.response?.status || error.message);
  }

  try {
    // Test the PDF to Word route
    console.log('\n2. Testing /api/convert/pdf2word...');
    const response2 = await axios.post(`${BASE_URL}/api/convert/pdf2word`, {}, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ PDF to Word route working');
  } catch (error) {
    console.log('❌ PDF to Word route error:', error.response?.status || error.message);
  }

  try {
    // Test the Word to PDF route
    console.log('\n3. Testing /api/convert/word2pdf...');
    const response3 = await axios.post(`${BASE_URL}/api/convert/word2pdf`, {}, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ Word to PDF route working');
  } catch (error) {
    console.log('❌ Word to PDF route error:', error.response?.status || error.message);
  }

  try {
    // Test the YouTube route
    console.log('\n4. Testing /api/convert/youtube...');
    const response4 = await axios.post(`${BASE_URL}/api/convert/youtube`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('✅ YouTube route working');
  } catch (error) {
    console.log('❌ YouTube route error:', error.response?.status || error.message);
  }

  console.log('\nRoute testing complete!');
}

testRoutes().catch(console.error); 