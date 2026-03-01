export const sendDiscordNotification = async (feedbackData) => {
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn("Discord Webhook URL is missing. Skipping notification.");
        return;
    }

    const payload = {
        content: "@everyone",
        embeds: [
            {
                title: "🌟 New Feedback Received!",
                color: 0x22C55E, // Green color
                fields: [
                    {
                        name: "👤 Name",
                        value: feedbackData.name,
                        inline: true
                    },
                    {
                        name: "📧 Email",
                        value: feedbackData.email,
                        inline: true
                    },
                    {
                        name: "📝 Type",
                        value: feedbackData.type,
                        inline: true
                    },
                    {
                        name: "💬 Feedback",
                        value: feedbackData.feedback
                    }
                ],
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("Discord Webhook Error:", await response.text());
        }
    } catch (error) {
        console.error("Failed to send Discord notification:", error);
    }
};
