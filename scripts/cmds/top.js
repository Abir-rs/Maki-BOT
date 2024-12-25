module.exports = {
	config: {
		name: "top",
		aliases: ["toprich"],  // Alias without space for regular command
		version: "1.1",
		author: "Loufi",
		role: 0,
		shortDescription: {
			en: "Top 15 Richest Users"
		},
		longDescription: {
			en: ""
		},
		category: "group",
		guide: {
			en: "{pn}"  // Usage guide for the command
		}
	},

	// Helper function to format numbers into short form
	formatMoney: function (amount) {
		if (amount === undefined || amount === null) return "0"; // Handle cases where money is undefined or null
		if (amount >= 1e12) return (amount / 1e12).toFixed(1) + 't'; // Trillion
		if (amount >= 1e9) return (amount / 1e9).toFixed(1) + 'b'; // Billion
		if (amount >= 1e6) return (amount / 1e6).toFixed(1) + 'm'; // Million
		if (amount >= 1e3) return (amount / 1e3).toFixed(1) + 'k'; // Thousand
		return amount.toString();
	},

	onStart: async function ({ api, args, message, event, usersData }) {
		// Ensure we check the command input properly (e.g., top rich)
		const inputCommand = args.join(' ').toLowerCase();

		// If the command is "top rich" (with a space), handle it separately
		if (inputCommand === "top rich") {
			const allUsers = await usersData.getAll();

			// Sort users by money in descending order and take top 15
			const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 15);

			// Format the list of top users with short form money
			const topUsersList = topUsers.map((user, index) => {
				const formattedMoney = this.formatMoney(user.money);
				return `${index + 1}. ${user.name}: ${formattedMoney}`;
			});

			// Create the message content
			const messageText = `Top 15 Richest Users:\n${topUsersList.join('\n')}`;

			// Send the reply
			return message.reply(messageText);
		}

		// If not "top rich", proceed with the regular "toprich" or "toprichest" logic
		const allUsers = await usersData.getAll();

		// Sort users by money in descending order and take top 15
		const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 15);

		// Format the list of top users with short form money
		const topUsersList = topUsers.map((user, index) => {
			const formattedMoney = this.formatMoney(user.money);
			return `${index + 1}. ${user.name}: ${formattedMoney}`;
		});

		// Create the message content
		const messageText = `Top 15 Richest Users:\n${topUsersList.join('\n')}`;

		// Send the reply
		message.reply(messageText);
	}
};
