import {
    CommandInteraction,
    MessageActionRow,
    SelectMenuInteraction,
    MessageSelectMenu,
    Role,
    MessageSelectOptionData,
} from "discord.js";
import {Discord, Slash, SelectMenuComponent} from "discordx";


// dynamically search for roles with the following names
// #TODO: use API to pull by GUILD_ID
const colour_roles = [
    { label: "Red", value: "986323586191081513" },
    { label: "Orange", value: "986323703115694140" },
    { label: "Yellow", value: "986323750620381194" },
    { label: "Green", value: "894643243990519878" },
    { label: "Blue", value: "894643459732955207" },
    { label: "Cyan", value: "986323834493866015" },
    { label: "Pink", value: "986323890009690203" },
    { label: "Purple", value: "894643504062529587" }
]

@Discord()
export abstract class buttons {
    @SelectMenuComponent("colour-menu")
    async handle(interaction: SelectMenuInteraction): Promise<unknown> {

        await interaction.deferReply({ephemeral: true});

        const roleValue = interaction.values?.[0];
        if (!roleValue) {
            return await interaction.followUp("A selection error has occurred. Please try again.");
        }

        // On selection remove any other role within the list then add the selected one
        // #TODO: Add better error checking/handling
        interaction.guild?.members.fetch(interaction.user).then(member => {
            interaction.guild?.members.fetch();
            interaction.values.forEach(role => {
                if (role != "null")
                    colour_roles.forEach(colour_role => {
                        if (role != colour_role.value && member.roles.cache.some(guild_role => guild_role.id == colour_role.value)) {
                            console.log('Removing: ' + role);
                            member.roles.remove(colour_role.value);
                        }
                    })
            })
            if (roleValue != "null") {
                member.roles.add(roleValue);
            }
        })

        await interaction.followUp(
            `you have selected the colour: ${
                colour_roles.find(item => item.value == roleValue)?.label ?? "Unknown"
            }`
        );
        return;
    }

    @Slash("setcolour", {description: "Change your display name colour."})
    async setColour(interaction: CommandInteraction): Promise<unknown> {
        await interaction.deferReply({ephemeral: true});

        const dynamic_roles: Role[] = [];

        interaction.guild?.roles.cache.forEach(role => {
            if (colour_roles.some(item => item.value == role.id)) {
                dynamic_roles.push(role)
            }
        })

        const roles_menu: MessageSelectOptionData | { label: string; value: string; }[] = [{label: "None", value: "null"}];
        dynamic_roles.forEach(role => {
            roles_menu.push({label : role.name, value : role.id })
        })

        // create menu for roles
        const menu = new MessageSelectMenu()
            .addOptions(roles_menu)
            .setCustomId("colour-menu");

        // create a row for message actions
        const buttonRow = new MessageActionRow().addComponents(menu);

        // send it
        await interaction.editReply({
            content: "Select your display name colour!",
            components: [buttonRow],
        });
        return;
    }
}
