const axios = require("axios");

exports.triggerAutomationWorkflow = async (nutritionalData) => {
  try {
    // Prepare webhook payload
    const webhookUrl =
      "http://127.0.0.1:7860/api/v1/webhook/773aff9e-1942-4b40-adf4-12d9c2296fcf";
    const payload = {
      aiResult: nutritionalData,
      timestamp: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
    };
    console.log("Payload: ", payload);
    // Trigger webhook
    const response = await axios.post(webhookUrl, payload);
    console.log("Webhook triggered successfully:", response.data);
    content = response.data;

    return content;
  } catch (error) {
    console.error("Error triggering automation workflow:", error);
    throw error;
  }
};
