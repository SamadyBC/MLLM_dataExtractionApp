const axios = require("axios");

exports.triggerAutomationWorkflow = async (nutritionData) => {
  try {
    // Prepare webhook payload
    const webhookUrl = "https://your-automation-platform.com/webhook-endpoint";
    const payload = {
      aiResult: nutritionData,
      timestamp: new Date().toISOString(),
    };

    // Trigger webhook
    const response = await axios.post(webhookUrl, payload);
    console.log("Webhook triggered successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error triggering automation workflow:", error);
    throw error;
  }
};
