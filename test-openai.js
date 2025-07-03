import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Hello, this is a test message."
                }
            ],
        });
        console.log("OpenAI API test successful!");
        console.log("Response:", response.choices[0].message.content);
    } catch (error) {
        console.error("Error testing OpenAI API:");
        console.error("Error message:", error.message);
        console.error("API Key present:", !!process.env.OPENAI_API_KEY);
    }
}

testOpenAI(); 