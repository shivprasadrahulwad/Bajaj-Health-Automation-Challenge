const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const API_URL = 'https://bfhldevapigw.healthrx.co.in/automation-campus/create/user';

// Helper function to make API calls
async function testCreateUser(rollNumber, firstName, lastName, phoneNumber, emailId) {
    try {
        const response = await axios.post(API_URL, {
            firstName,
            lastName,
            phoneNumber,
            emailId
        }, {
            headers: {
                'roll-number': rollNumber,
                'Content-Type': 'application/json'
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        return { 
            status: error.response ? error.response.status : 500, 
            data: error.response ? error.response.data : 'Error occurred' 
        };
    }
}

// Test cases
const testCases = [
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Kartik', lastName: 'Sharma', phoneNumber: 9999999999, emailId: 'kartik.sharma@example.com' }
    },
    {
        name: 'Duplicate phone number',
        params: { rollNumber: '1', firstName: 'Kunal', lastName: 'Patil', phoneNumber: 9999999999, emailId: 'kunal.patil@example.com' }
    },
    {
        name: 'Missing roll number',
        params: { rollNumber: '', firstName: 'Arnav', lastName: 'Joshi', phoneNumber: 8888888888, emailId: 'arnav.joshi@example.com' }
    },
    {
        name: 'Invalid email format',
        params: { rollNumber: '1', firstName: 'Ashutosh', lastName: 'Kulkarni', phoneNumber: 7777777777, emailId: 'invalid-email' }
    },
    {
        name: 'Missing required field (firstName)',
        params: { rollNumber: '1', firstName: '', lastName: 'Nikhil', phoneNumber: 6666666666, emailId: 'nikhil.kumar@example.com' }
    },
    {
        name: 'Duplicate email address',
        params: { rollNumber: '1', firstName: 'Sahil', lastName: 'Desai', phoneNumber: 5555555555, emailId: 'kartik.sharma@example.com' }
    },
    {
        name: 'Very long input strings',
        params: { rollNumber: '1', firstName: 'Shiv'.repeat(50), lastName: 'Verma'.repeat(50), phoneNumber: 4444444444, emailId: 'long@example.com' }
    },
    {
        name: 'Non-numeric phone number',
        params: { rollNumber: '1', firstName: 'Shrutika', lastName: 'Singh', phoneNumber: 'not-a-number', emailId: 'shrutika.singh@example.com' }
    },
    {
        name: 'Missing last name',
        params: { rollNumber: '1', firstName: 'Sakshi', lastName: '', phoneNumber: 3333333333, emailId: 'sakshi@example.com' }
    },
    {
        name: 'Special characters in name',
        params: { rollNumber: '1', firstName: 'Pranali', lastName: 'Yadav!#', phoneNumber: 2222222222, emailId: 'pranali.yadav@example.com' }
    },
    {
        name: 'Empty request body',
        params: { rollNumber: '1', firstName: '', lastName: '', phoneNumber: '', emailId: '' }
    },
    {
        name: 'Valid user creation with different names',
        params: { rollNumber: '1', firstName: 'Yashwant', lastName: 'Pandey', phoneNumber: 9998887776, emailId: 'yashwant.pandey@example.com' }
    },
    {
        name: 'Another valid user creation',
        params: { rollNumber: '1', firstName: 'Vedant', lastName: 'Bansal', phoneNumber: 9112223333, emailId: 'vedant.bansal@example.com' }
    },
    {
        name: 'Duplicate email address check',
        params: { rollNumber: '1', firstName: 'Vikash', lastName: 'Kapoor', phoneNumber: 9223334444, emailId: 'vedant.bansal@example.com' }
    },
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Yash', lastName: 'Mishra', phoneNumber: 9334445555, emailId: 'yash.mishra@example.com' }
    },
    {
        name: 'Another valid user creation',
        params: { rollNumber: '1', firstName: 'Aditya', lastName: 'Mehta', phoneNumber: 9445556666, emailId: 'aditya.mehta@example.com' }
    },
    {
        name: 'Valid user creation with different names',
        params: { rollNumber: '1', firstName: 'Anagha', lastName: 'Kulkarni', phoneNumber: 9556667777, emailId: 'anagha.kulkarni@example.com' }
    },
    {
        name: 'SQL Injection-like input',
        params: { rollNumber: '1', firstName: 'Shyam', lastName: 'Singh; DROP TABLE users;', phoneNumber: 9667778888, emailId: 'shyam.singh@example.com' }
    },
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Ram', lastName: 'Narayan', phoneNumber: 9778889999, emailId: 'ram.narayan@example.com' }
    },

    {
        name: 'Special characters in email',
        params: { rollNumber: '1', firstName: 'Sahil', lastName: 'Yadav', phoneNumber: 7777777777, emailId: 'sahil!yadav@example.com' }
    },
];


// Route to run all tests
app.get('/run-tests', async (req, res) => {
    const results = [];

    for (const testCase of testCases) {
        console.log(`Running test: ${testCase.name}`);
        const result = await testCreateUser(
            testCase.params.rollNumber,
            testCase.params.firstName,
            testCase.params.lastName,
            testCase.params.phoneNumber,
            testCase.params.emailId
        );
        results.push({
            testName: testCase.name,
            status: result.status,
            response: result.data
        });
    }

    res.json(results);
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        return;
    }
    console.log(`Test server running at http://localhost:${port}`);
    console.log(`Run tests by visiting http://localhost:${port}/run-tests`);
});

// Add this line at the very end of the file
console.log('Script executed. If you don\'t see the server running message, there might be an error.');