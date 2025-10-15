const { logCommand, logError } = require('../utils/logger');
const { errorEmbed } = require('../utils/embeds');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return await interaction.reply({ 
          embeds: [errorEmbed('Error', 'Command not found!')], 
          ephemeral: true 
        });
      }

      try {
        await logCommand(client, interaction);
        await command.execute(interaction, client);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        await logError(client, error, `Command: ${interaction.commandName}`);
        
        const errorResponse = { 
          embeds: [errorEmbed('Error', 'There was an error executing this command!')], 
          ephemeral: true 
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorResponse);
        } else {
          await interaction.reply(errorResponse);
        }
      }
    } else if (interaction.isAutocomplete()) {
      const command = client.commands.get(interaction.commandName);
      
      if (!command || !command.autocomplete) return;

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(`Error in autocomplete for ${interaction.commandName}:`, error);
      }
    } else if (interaction.isButton()) {
      try {
        const { customId } = interaction;

        if (customId.startsWith('campaign_join_')) {
          const { handleCampaignJoin } = require('../handlers/campaigns');
          await handleCampaignJoin(interaction, client);
        } else if (customId.startsWith('open_ticket_')) {
          const { handleTicketOpen } = require('../handlers/ticket');
          await handleTicketOpen(interaction, client);
        } else if (customId.startsWith('close_ticket_')) {
          const closeTicketCommand = client.commands.get('closeticket');
          if (closeTicketCommand) {
            await closeTicketCommand.execute(interaction, client);
          }
        }
      } catch (error) {
        console.error('Button interaction error:', error);
        await logError(client, error, 'Button Interaction');
        await interaction.reply({ 
          embeds: [errorEmbed('Error', 'Failed to process button interaction.')], 
          ephemeral: true 
        });
      }
    }
  }
};
