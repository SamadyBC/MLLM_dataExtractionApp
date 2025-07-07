const { triggerAutomationWorkflow } = require("../services/flowService");

exports.triggerWorkflow = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const workflowData = req.body;

    const flowReached = await triggerAutomationWorkflow(workflowData);
    console.log("Flow reached:", flowReached);

    res.json({
      success: true,
      flowReached,
    });
  } catch (error) {
    console.error("Erro ao disparar o fluxo de trabalho:", error);
    res.status(500).json({
      message: "Erro ao disparar o fluxo de trabalho",
      error: error.message,
    });
  }
};
