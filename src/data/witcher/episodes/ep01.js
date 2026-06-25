// ─── EPISODE 01: SWAMP MISTS ─────────────────────────────────────────────────
// Act I | ~1,450 words | 4 choices (2 flavor, 1 tactical, 1 moral) | 1 combat

export const ep01 = {
  id: 'ep01',
  title: 'Swamp Mists',
  actNumber: 1,
  actTitle: 'Act I — Contracts of the Misty Valley',
  readTime: '10 min',
  summary: 'Esh arrives at Yakshar village, where children have been vanishing into the swamp at night. He tracks the culprit to a limestone cave—and finds something far more complicated than a simple monster.',
  nodes: [

    // ══════════════════════════════════════════════════════
    // ARRIVAL AT YAKSHAR
    // ══════════════════════════════════════════════════════
    {
      id: 'n01', type: 'narration', bg: 'village',
      text: 'The mud road from the eastern steppes ended here—at the crooked gate of Yakshar, the last village before the Botqoqlik swamp swallowed the land.',
    },
    {
      id: 'n02', type: 'narration', bg: 'village',
      text: 'Esh rode in at dusk. The villagers moved aside without a word. They knew what the twin blades meant. They had sent for one, after all.',
    },
    {
      id: 'n03', type: 'narration', bg: 'village',
      text: 'He counted faces through the fog. Too few children. Too many locked shutters. The village well had a thick rope knotted across its mouth—something he had never seen before.',
    },
    {
      id: 'n04', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Witcher. Thank the old gods you came. I am Elder Tokhir. Please follow me quickly—there is much to tell, and very little time before dark."',
    },
    {
      id: 'n05', type: 'narration', bg: 'village',
      text: "The elder's house smelled of dried herbs and old fear. Unrolled maps of the swamp covered the table. Three red circles marked the last known disappearance sites—all clustered near the northern reed beds.",
    },
    {
      id: 'n06', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Eleven days. Four children taken—always at night, always from the swamp\'s edge. We hear the water move. We see nothing else."',
    },
    {
      id: 'n07', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'fearful',
      text: '"We hired two sellswords before you. One did not return. The other came back—but he does not speak anymore. He sits and stares at the wall."',
    },
    {
      id: 'n08', type: 'narration', bg: 'village',
      text: 'Esh studied the map. The disappearances formed a half-circle around a limestone shelf—an area local charts labeled only as "the cold shelf." He had seen patterns like this before.',
    },

    // ── FLAVOR CHOICE 1 ──────────────────────────────────
    {
      id: 'c1', type: 'choice', bg: 'village', choiceType: 'flavor',
      prompt: 'Tokhir watches you with desperate eyes, waiting. How do you respond?',
      options: [
        {
          id: 'c1_a',
          label: '"Tell me everything. The sounds, the nights, the tracks. Leave nothing out."',
          tag: 'Empathetic',
          tagColor: '#3498db',
          consequences: [
            { type: 'rep', faction: 'villageElders', delta: 5 },
            { type: 'flag', key: 'c1_choice', value: 'a' },
          ],
        },
        {
          id: 'c1_b',
          label: '"Payment first, elder. Discuss that—then I will decide if your problem is worth my time."',
          tag: 'Cold',
          tagColor: '#7f8c8d',
          consequences: [
            { type: 'rep', faction: 'villageElders', delta: -5 },
            { type: 'flag', key: 'c1_choice', value: 'b' },
          ],
        },
      ],
    },
    {
      id: 'n09a', type: 'narration', bg: 'village',
      condition: { flag: 'c1_choice', value: 'a' },
      text: "Something in Esh's measured tone loosened Tokhir's shoulders. The elder poured two cups of black tea and began to talk—slowly at first, then all at once.",
    },
    {
      id: 'n09b', type: 'narration', bg: 'village',
      condition: { flag: 'c1_choice', value: 'b' },
      text: "Tokhir's jaw tightened. But he placed a coin purse on the table without argument. He had learned not to argue with men who carried two swords.",
    },

    // ── TIMUR THE BOY ────────────────────────────────────
    {
      id: 'n10', type: 'narration', bg: 'village',
      text: 'A door cracked open at the far end of the room. A boy—perhaps nine, barefoot despite the cold floor—peered around the wooden frame.',
    },
    {
      id: 'n11', type: 'dialogue', bg: 'village',
      speaker: 'Timur', portrait: 'timur', emotion: 'scared',
      text: '"I saw one of them. The things that took Aliya. I was hiding in the reeds when they came."',
    },
    {
      id: 'n12', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Timur, go back to your mother—"',
    },
    {
      id: 'n13', type: 'dialogue', bg: 'village',
      speaker: 'Timur', portrait: 'timur', emotion: 'scared',
      text: '"It had a woman\'s hair. Long and black and wet. But its hands—" He held up both palms. "Wrong. Like fish bones wrapped in grey skin. It walked into the water and the water just let it in."',
    },

    // ── FLAVOR CHOICE 2 ──────────────────────────────────
    {
      id: 'c2', type: 'choice', bg: 'village', choiceType: 'flavor',
      prompt: 'The boy trembles but holds your gaze steadily. What do you do?',
      options: [
        {
          id: 'c2_a',
          label: '"Come closer. Tell me—what did it smell like?"',
          tag: 'Thorough',
          tagColor: '#3498db',
          consequences: [
            { type: 'flag', key: 'c2_clue', value: true },
            { type: 'flag', key: 'c2_choice', value: 'a' },
          ],
        },
        {
          id: 'c2_b',
          label: '"Children see shapes in the dark. Elder—show me where the last tracks were found."',
          tag: 'Dismissive',
          tagColor: '#7f8c8d',
          consequences: [
            { type: 'flag', key: 'c2_clue', value: false },
            { type: 'flag', key: 'c2_choice', value: 'b' },
          ],
        },
      ],
    },
    {
      id: 'n14a', type: 'narration', bg: 'village',
      condition: { flag: 'c2_choice', value: 'a' },
      text: 'The boy screwed up his face. "Sour," he said finally. "Like curdled milk. And river clay—the deep kind. Cold. Like something that never gets warm, even in summer."',
    },
    {
      id: 'n14b', type: 'narration', bg: 'village',
      condition: { flag: 'c2_choice', value: 'b' },
      text: "Tokhir pointed at the map's northern edge. Behind the closed door, Esh heard the boy's small feet pad away. The witcher filed the child's account somewhere behind his eyes and let it sit.",
    },

    // ══════════════════════════════════════════════════════
    // INVESTIGATION — THE SWAMP
    // ══════════════════════════════════════════════════════
    {
      id: 'n15', type: 'narration', bg: 'swamp',
      text: 'Esh left the village at midnight. The swamp exhaled cold air the moment he crossed the reed line—the kind of cold that had nothing to do with the season.',
    },
    {
      id: 'n16', type: 'narration', bg: 'swamp',
      text: 'He found the first trace thirty paces from the water\'s edge. Not footprints. Drag marks. Something heavy had been pulled toward the black water, flanked by two sets of webbed claw marks.',
    },
    {
      id: 'n17', type: 'narration', bg: 'swamp',
      text: 'Drowners. He had known from the standing water in the footprints near the well. What he hadn\'t known was how many.',
    },
    {
      id: 'n17a', type: 'narration', bg: 'swamp',
      condition: { flag: 'c2_clue', value: true },
      text: 'Then the scent reached him—sour milk and cold river clay, exactly as the boy described. Strong. Recent. He turned north-northeast and moved faster.',
    },
    {
      id: 'n17b', type: 'narration', bg: 'swamp',
      condition: { flag: 'c2_clue', value: false },
      text: 'He almost missed the scent trail. Faint—rot beneath the frog-song. He crouched and spent a full minute parsing the cold air before the direction became clear.',
    },
    {
      id: 'n18', type: 'narration', bg: 'swamp',
      text: 'He waded through knee-deep water, steel sword drawn. The silver blade stayed sheathed. Drowners were creatures of flesh—silver would be wasted on them.',
    },
    {
      id: 'n19', type: 'narration', bg: 'swamp',
      text: 'The water was perfectly still. Then it wasn\'t.',
    },
    {
      id: 'n20', type: 'narration', bg: 'swamp',
      text: 'Three shapes rose from the black surface—long-limbed, pale-skinned, eyes like green lanterns burning under six feet of dark water. Their mouths opened far too wide to be human.',
    },

    // ── TACTICAL CHOICE ──────────────────────────────────
    {
      id: 'c3', type: 'choice', bg: 'swamp', choiceType: 'tactical',
      prompt: 'Three Drowners. Twenty paces. One breath to decide.',
      options: [
        {
          id: 'c3_a',
          label: '⚡ Cast Aard — a concussive wave to stagger them before they close.',
          tag: 'Tactical',
          tagColor: '#8e44ad',
          consequences: [
            { type: 'flag', key: 'tactical_aard', value: true },
            { type: 'combat_modifier', key: 'enemy_hp_factor', value: 0.65 },
          ],
        },
        {
          id: 'c3_b',
          label: '⚔️ Draw both blades and charge. Steel meets flesh.',
          tag: 'Aggressive',
          tagColor: '#e67e22',
          consequences: [
            { type: 'flag', key: 'tactical_aard', value: false },
            { type: 'combat_modifier', key: 'enemy_hp_factor', value: 1.0 },
          ],
        },
      ],
    },
    {
      id: 'n21a', type: 'narration', bg: 'swamp',
      condition: { flag: 'tactical_aard', value: true },
      text: 'Esh thrust his palm forward. The Aard sign detonated as a burst of invisible force—the lead Drowner tumbled backward, crashing into the other two. Three seconds of advantage. He used all of them.',
    },
    {
      id: 'n21b', type: 'narration', bg: 'swamp',
      condition: { flag: 'tactical_aard', value: false },
      text: 'He burst forward through the knee-deep water, closing the gap before the creatures fully surfaced. First blade connected before they had their footing.',
    },

    // ── COMBAT ────────────────────────────────────────────
    {
      id: 'combat1', type: 'combat', bg: 'swamp',
      enemies: [
        { name: 'Drowner', icon: '🦎', description: 'A drowned creature reborn in dark water.', maxHp: 75, attack: 14, defense: 3, expValue: 40, lootGold: 10 },
        { name: 'Drowner', icon: '🦎', description: 'Moves with unnatural fluid grace.',        maxHp: 75, attack: 14, defense: 3, expValue: 40, lootGold: 10 },
        { name: 'Drowner Elder', icon: '🐊', description: 'Larger. Faster. Hungrier.',           maxHp: 90, attack: 18, defense: 5, expValue: 60, lootGold: 15 },
      ],
      hpFactorFlag: '__cm_enemy_hp_factor',
      onWin: 'n22',
      onLose: 'gameover',
    },

    // ══════════════════════════════════════════════════════
    // CAVE DISCOVERY
    // ══════════════════════════════════════════════════════
    {
      id: 'n22', type: 'narration', bg: 'swamp',
      text: 'Esh cleaned the blade on a tuft of dry reeds at the water\'s edge. His hands did not shake. They hadn\'t shaken since he was nineteen. He wasn\'t sure that was a good thing.',
    },
    {
      id: 'n23', type: 'narration', bg: 'swamp',
      text: 'Beyond the waterline, half-submerged in the limestone shelf, a cave entrance gaped in the rock face. Old. Used often. The smell from it was overwhelming—sour and cold and wrong.',
    },
    {
      id: 'n24', type: 'narration', bg: 'swamp',
      text: 'He went in.',
    },
    { id: 'n25', type: 'narration', bg: 'cave',
      text: "Children's shoes. A torn headscarf embroidered with yellow thread. A carved wooden horse, worn smooth by many small hands. Arranged in a careful row on a dry ledge. As if someone was keeping them safe.",
    },
    { id: 'n26', type: 'narration', bg: 'cave',
      text: 'He heard breathing. Deep in the cave. Not a child\'s.',
    },
    { id: 'n27', type: 'narration', bg: 'cave',
      text: 'She was crouched in the furthest corner—wrapped in river reeds and silt, barely human in outline. A woman. Perhaps forty. Her nails were too long. Her eyes caught his lamp light and did not reflect it the way eyes should.',
    },
    {
      id: 'n28', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'resigned',
      text: '"...I know what you are. I heard the water change when you fought them. You have come to kill me, then. Do it quickly."',
    },
    {
      id: 'n29', type: 'narration', bg: 'swamp',
      text: 'Her voice was almost normal. Almost.',
    },
    {
      id: 'n30', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'desperate',
      text: '"I do not take them to hurt them. I cannot stop my hands after dark—I feel them moving and I cannot stop it. But I keep the children safe. In the back. Just look. Please just look."',
    },
    {
      id: 'n31', type: 'narration', bg: 'swamp',
      text: 'Past her, behind a natural partition of rock, Esh found them. Four children. Frightened. Thin. Alive. Sleeping on dry straw beside a small, smokeless flame she had somehow kept burning for them.',
    },
    {
      id: 'n32', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'sad',
      text: '"I was Tokhir\'s wife," she whispered. "Before the river spirit took root in me. Twelve years ago. He thinks I drowned. He does not know I am still in here—behind it."',
    },
    {
      id: 'n33', type: 'narration', bg: 'swamp',
      text: 'Esh looked at the children. He looked at her ruined hands. He looked at the wooden horse in the dirt between them. He looked back at her.',
    },

    // ── MAJOR MORAL CHOICE ───────────────────────────────
    {
      id: 'c4', type: 'choice', bg: 'swamp', choiceType: 'moral',
      prompt: 'The silver blade is at your hip. The children need to leave tonight.',
      options: [
        {
          id: 'c4_a',
          label: '⚔️ Draw the silver sword. End the curse—and the cursed. It is the only mercy this world allows.',
          tag: 'Ruthless',
          tagColor: '#c0392b',
          consequences: [
            { type: 'flag', key: 'ep1_killed_woman', value: true },
            { type: 'flag', key: 'ep1_spared_woman', value: false },
            { type: 'rep', faction: 'villageElders', delta: 10 },
            { type: 'gold', delta: 30 },
          ],
        },
        {
          id: 'c4_b',
          label: '🛡️ Sheathe the blade. Every curse has a root—find it and cut it. She is still in there.',
          tag: 'Merciful',
          tagColor: '#27ae60',
          consequences: [
            { type: 'flag', key: 'ep1_spared_woman', value: true },
            { type: 'flag', key: 'ep1_killed_woman', value: false },
            { type: 'rep', faction: 'villageElders', delta: -15 },
            { type: 'item', key: 'curseIngredients', delta: 1 },
          ],
        },
      ],
    },

    // ── AFTERMATH (conditional) ───────────────────────────
    {
      id: 'n34a', type: 'narration', bg: 'swamp',
      condition: { flag: 'ep1_killed_woman', value: true },
      text: "The silver blade caught no moonlight in the cave's dark. It did not need to. What was done was done in a single breath—more mercy than the river spirit deserved.",
    },
    {
      id: 'n34b', type: 'narration', bg: 'swamp',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: 'Esh sat down in the dirt across from her. "Tell me everything about the night it began," he said. "Leave nothing out. We have until the children wake."',
    },
    {
      id: 'n34c', type: 'narration', bg: 'swamp',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: 'She told him about the rune carved into the limestone beneath the village well—and about the man who carved it.',
    },
    {
      id: 'n35', type: 'narration', bg: 'village',
      text: 'He carried the first child out of the cave as dawn broke over the swamp. Pink light on black water—the only beautiful thing in this place.',
    },
    {
      id: 'n36', type: 'narration', bg: 'village',
      text: 'The village was waiting at the tree line. Someone had lit every torch they owned.',
    },
    {
      id: 'n37', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'relieved',
      text: '"They\'re alive. You—you actually brought them back." He dropped to both knees in the mud. "Name your price. Anything you want."',
    },
    {
      id: 'n37b', type: 'narration', bg: 'village',
      condition: { flag: 'ep1_killed_woman', value: true },
      text: "Esh accepted the payment without a word about the cave's other occupant. Some things were better left in the dark.",
    },
    {
      id: 'n37c', type: 'narration', bg: 'village',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: '"There is something beneath your well," Esh said. "A rune in the limestone. Do not touch it until I return." Tokhir stared at him. He did not explain further.',
    },
    {
      id: 'n38', type: 'narration', bg: 'village',
      text: 'He accepted the payment without counting it and walked back to the road alone, as he always did.',
    },
    {
      id: 'n39', type: 'narration', bg: 'village',
      text: 'The mist was burning off the swamp behind him. A new day over old mud.',
    },

    // ══════════════════════════════════════════════════════
    // CLIFFHANGER
    // ══════════════════════════════════════════════════════
    {
      id: 'n40', type: 'narration', bg: 'village',
      text: 'He was ten paces onto the eastern road when the arrow struck the dead tree beside his head. Not a warning—too precise for that. Too calm.',
    },
    {
      id: 'cliff1', type: 'cliffhanger', bg: 'village',
      text: 'Pinned to the bark by a black-feathered shaft: a rolled piece of parchment, sealed in dark wax stamped with the royal crest of the Northern Kingdom—a crown above two crossed blades. Someone had watched the entire night. They had seen everything. And they had written only three words inside:\n\n"We need you."',
      nextEpisode: 'ep02',
    },
  ],
};
