// ─── EPISODE 01: SWAMP MISTS ─────────────────────────────────────────────────
// Act I | ~2,500 words | 4 choices (2 flavor, 1 tactical, 1 moral) | 1 combat

export const ep01 = {
  id: 'ep01',
  title: 'Swamp Mists',
  actNumber: 1,
  actTitle: 'Act I — Contracts of the Misty Valley',
  readTime: '12 min',
  summary: 'Geralt of Rivia arrives at Yakshar village, where children have been vanishing into the swamp at night. He tracks the culprit to a limestone cave—and finds something far more complicated than a simple monster.',
  nodes: [

    // ══════════════════════════════════════════════════════
    // ARRIVAL AT YAKSHAR
    // ══════════════════════════════════════════════════════
    {
      id: 'n01', type: 'narration', bg: 'village',
      text: 'The narrow mud road winding from the vast, wind-swept eastern steppes finally ended here, dissolving into the wet, gnarled roots and grey fog of Yakshar. It was a bleak, forgotten settlement of low wooden huts, serving as the final vanguard of humanity before the endless, choking expanse of the Botqoqlik swamp swallowed the earth. The air here was heavy, thick with the stench of stagnant water, decaying peat, and a quiet, suffocating dread that hung over the peat-fired chimneys.',
    },
    {
      id: 'n02', type: 'narration', bg: 'village',
      text: 'Geralt rode in at dusk, the steady clop of his horse’s hooves muffled by the thick mud. The villagers, wrapped in heavy woolens against the damp chill, moved aside without a word, their eyes tracing the two swords crossed on his back—one steel for men, one silver for monsters. They knew what the twin blades meant, and why he had come. They had pooled their meager coins to hire a witcher, after all.',
    },
    {
      id: 'n03', type: 'narration', bg: 'village',
      text: 'Geralt counted faces through the creeping fog. Too few children played in the mud. Too many wooden shutters were heavily barred from the inside, locked against the dark. Near the center of the square, the village well had a thick, heavy rope knotted tightly across its wooden mouth—a crude attempt to seal off whatever might crawl up from the deep, damp dark below.',
    },
    {
      id: 'n04', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Witcher. Thank the old gods you came. I am Elder Tokhir. Please follow me quickly—there is much to tell, and very little time before dark. The mists are already rising, and when the mists come, we are no longer safe."',
    },
    {
      id: 'n05', type: 'narration', bg: 'village',
      text: "The elder's house smelled of dried lavender, mutton fat, and old, cold fear. Unrolled maps of the surrounding marshlands covered the creaking wooden table, weighted down by stones. Three crude red circles marked the last known disappearance sites—all clustered dangerously close to the northern reed beds where the water grew deep and dark.",
    },
    {
      id: 'n06', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Eleven days now. Four children taken—always in the dead of night, always from the very edge of the swamp. We hear the water move, a sickening splash, and then nothing. We see nothing else. They vanish like smoke in the wind."',
    },
    {
      id: 'n07', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'fearful',
      text: '"We hired two mercenary sellswords before you. One went into the swamp and did not return; we found his shield floating in the reeds three days later. The other came back—but he does not speak anymore. He sits by the hearth, shivering, staring blankly at the wall as if his soul was stripped away."',
    },
    {
      id: 'n08', type: 'narration', bg: 'village',
      text: 'Geralt studied the map, his golden, cat-like eyes scanning the red markings. The disappearances formed a distinct half-circle around a limestone shelf—an area local charts labeled only as "the cold shelf." He had seen patterns like this before. It wasn’t a random hunting ground; it was a territory being guarded.',
    },

    // ── FLAVOR CHOICE 1 ──────────────────────────────────
    {
      id: 'c1', type: 'choice', bg: 'village', choiceType: 'flavor',
      prompt: 'Tokhir watches you with desperate, bloodshot eyes, waiting. How do you respond?',
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
          label: '"Payment first, elder. Let’s discuss the gold—then I will decide if your problem is worth my time."',
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
      text: "Something in Geralt's measured, calm tone loosened Tokhir's shoulders. The elder poured two cups of hot, bitter black tea with trembling hands and began to talk—slowly at first, then all at once, spilling details of the cold wind that always preceded the attacks.",
    },
    {
      id: 'n09b', type: 'narration', bg: 'village',
      condition: { flag: 'c1_choice', value: 'b' },
      text: "Tokhir's jaw tightened in frustration, but he placed a heavy, dirty leather coin purse on the wooden table without argument. He knew he had no choice—one does not haggle with a witcher when the shadows are long.",
    },

    // ── TIMUR THE BOY ────────────────────────────────────
    {
      id: 'n10', type: 'narration', bg: 'village',
      text: 'A door creaked open at the far end of the dim room. A boy—perhaps nine years old, barefoot despite the cold floorboards—peered around the wooden frame, clutching a small wooden toy.',
    },
    {
      id: 'n11', type: 'dialogue', bg: 'village',
      speaker: 'Timur', portrait: 'timur', emotion: 'scared',
      text: '"I saw one of them. The things that took Aliya. I was hiding in the reeds near the well when they came. They rose out of the water like drowned dead men."',
    },
    {
      id: 'n12', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'worried',
      text: '"Timur, go back to your mother—the witcher is busy, and children should not speak of such horrors."',
    },
    {
      id: 'n13', type: 'dialogue', bg: 'village',
      speaker: 'Timur', portrait: 'timur', emotion: 'scared',
      text: '"No, ota, I must tell him! It had a woman\'s hair—long and black and dripping wet. But its hands..." He held up both palms, shivering. "They were wrong. Like fish bones wrapped in grey skin, with claws. It walked into the black water and the water just let it in."',
    },

    // ── FLAVOR CHOICE 2 ──────────────────────────────────
    {
      id: 'c2', type: 'choice', bg: 'village', choiceType: 'flavor',
      prompt: 'The boy trembles but holds your gaze steadily. What do you do?',
      options: [
        {
          id: 'c2_a',
          label: '"Come closer, boy. Tell me—what did the air smell like when it passed?"',
          tag: 'Thorough',
          tagColor: '#3498db',
          consequences: [
            { type: 'flag', key: 'c2_clue', value: true },
            { type: 'flag', key: 'c2_choice', value: 'a' },
          ],
        },
        {
          id: 'c2_b',
          label: '"Children see shapes in the dark. Elder—show me where the last tracks were found on the bank."',
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
      text: 'The boy screwed up his face in concentration. "Sour," he whispered finally. "Like curdled milk. And cold river clay—the deep, foul kind from the bottom. It felt like something that never gets warm, even in the middle of summer."',
    },
    {
      id: 'n14b', type: 'narration', bg: 'village',
      condition: { flag: 'c2_choice', value: 'b' },
      text: "Tokhir pointed to the map's northern edge where the marsh mud was softest. Behind the closed door, Geralt heard the boy's small feet pad away. The witcher filed the child's description away and prepared to hunt.",
    },

    // ══════════════════════════════════════════════════════
    // INVESTIGATION — THE SWAMP
    // ══════════════════════════════════════════════════════
    {
      id: 'n15', type: 'narration', bg: 'swamp',
      text: 'Geralt left the village at midnight. The swamp exhaled a cold, putrid breath the moment he crossed the thick reed line—a deep, unnatural chill that had nothing to do with the night air and everything to do with magic.',
    },
    {
      id: 'n16', type: 'narration', bg: 'swamp',
      text: 'He found the first trace thirty paces into the marsh. It wasn’t a footprint, but a wide drag mark in the mud. Something heavy had been pulled toward the black, stagnant water, flanked on both sides by deep, webbed claw marks.',
    },
    {
      id: 'n17', type: 'narration', bg: 'swamp',
      text: 'Drowners. He had suspected it from the mud near the village well. These foul creatures, born of the spirits of drowned men, were vicious pack hunters. But usually, they didn’t coordinate snatching children from houses.',
    },
    {
      id: 'n17a', type: 'narration', bg: 'swamp',
      condition: { flag: 'c2_clue', value: true },
      text: 'Suddenly, the scent reached his sensitive witcher nose—sour milk and cold river clay, exactly as Timur had described. It was fresh and strong. Geralt adjusted his grip on his steel sword and moved silently through the reeds.',
    },
    {
      id: 'n17b', type: 'narration', bg: 'swamp',
      condition: { flag: 'c2_clue', value: false },
      text: 'Without the boy’s clue, he almost missed the scent trail. It was faint—just a trace of rot beneath the heavy swamp gas. He crouched in the dark, parsing the cold air for a full minute before the direction became clear.',
    },
    {
      id: 'n18', type: 'narration', bg: 'swamp',
      text: 'He waded through knee-deep water, his steel sword drawn. The silver blade stayed sheathed on his back. Drowners were creatures of flesh and bone—silver would be wasted on their slimy skins; steel was what they feared.',
    },
    {
      id: 'n19', type: 'narration', bg: 'swamp',
      text: 'The black water around him was perfectly still. The frog-song suddenly died, replaced by a tense, heavy silence. Then, the surface broke.',
    },
    {
      id: 'n20', type: 'narration', bg: 'swamp',
      text: 'Three pale, hunched shapes rose from the black water—long-limbed, grey-skinned, with eyes like sickly green lanterns. Their mouths split open in a silent, needle-toothed shriek as they saw him.',
    },

    // ── TACTICAL CHOICE ──────────────────────────────────
    {
      id: 'c3', type: 'choice', bg: 'swamp', choiceType: 'tactical',
      prompt: 'Three Drowners. They are fast, closing the distance. You have one breath to decide.',
      options: [
        {
          id: 'c3_a',
          label: '⚡ Cast Aard — a blast of telekinetic force to knock them back and stagger them.',
          tag: 'Tactical',
          tagColor: '#8e44ad',
          consequences: [
            { type: 'flag', key: 'tactical_aard', value: true },
            { type: 'combat_modifier', key: 'enemy_hp_factor', value: 0.65 },
          ],
        },
        {
          id: 'c3_b',
          label: '⚔️ Draw steel and charge. Meet their aggression with a flurry of silver-hued steel.',
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
      text: 'Geralt thrust his left hand forward, fingers forming the sign of Aard. A blast of compressed air exploded outward. The lead Drowner crashed back into its pack. Seizing the three seconds of chaos, Geralt struck.',
    },
    {
      id: 'n21b', type: 'narration', bg: 'swamp',
      condition: { flag: 'tactical_aard', value: false },
      text: 'Geralt lunged forward through the splashing water, meeting them head-on. His steel blade cut a silver arc in the dark, slicing through the first creature before it could swing its webbed claws.',
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
      text: 'Geralt cleaned the dark blood from his blade on a tuft of dry reeds. His hands did not shake. They hadn’t shaken since the trials of his youth. He wondered, not for the first time, if that was a blessing or a curse.',
    },
    {
      id: 'n23', type: 'narration', bg: 'swamp',
      text: 'Beyond the tall reeds, embedded in the limestone shelf, a dark cave mouth gaped like a wound. It was old, and the mud at the entrance was trodden smooth. The air venting from within was ice-cold, smelling of wet earth and rot.',
    },
    {
      id: 'n24', type: 'narration', bg: 'swamp',
      text: 'Geralt sheathed his blade and stepped inside, lighting a small torch. The flame flickered, casting long, dancing shadows on the wet limestone walls.',
    },
    {
      id: 'n25', type: 'narration', bg: 'cave',
      text: "On a dry stone ledge, he found children's belongings: small leather shoes, a torn yellow scarf, and a carved wooden horse. They were arranged in a neat, careful row—not discarded, but kept like precious treasures.",
    },
    {
      id: 'n26', type: 'narration', bg: 'cave',
      text: 'Geralt heard low, raspy breathing from the back of the cavern. It was heavy, wet, and distinctly non-human. He drew his silver blade—a curse was close.',
    },
    {
      id: 'n27', type: 'narration', bg: 'cave',
      text: 'She was crouched in the shadows, wrapped in rotting reeds and mud. Her face was half-human, but her fingers ended in long, bone-like claws. Her eyes caught the torchlight, glowing with a faint, tragic green light.',
    },
    {
      id: 'n28', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'resigned',
      text: '"...I know what you are. I heard the water change when you cut down the drowners outside. You have come to end me, then. Go on, witcher. Do it quickly."',
    },
    {
      id: 'n29', type: 'narration', bg: 'swamp',
      text: 'Her voice was rough, scraping against the stone walls, but it was sane. There was a human soul trapped beneath the rotting skin and scales of the curse.',
    },
    {
      id: 'n30', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'desperate',
      text: '"I do not take the children to hurt them. I cannot control my hands when the sun sets—the river spirit claims my body. But I keep them safe here, in the back. I feed them. Please, look. Just look at them."',
    },
    {
      id: 'n31', type: 'narration', bg: 'swamp',
      text: 'Geralt stepped past her, silver sword ready. Behind a partition of rock, he found them—the four missing children. They were thin and scared, but unharmed, sleeping soundly on dry straw beside a tiny, smokeless campfire.',
    },
    {
      id: 'n32', type: 'dialogue', bg: 'cave',
      speaker: 'Cursed Woman', portrait: 'cursed_woman', emotion: 'sad',
      text: '"I was Tokhir\'s wife," she whispered, a tear cleaning a path through the mud on her cheek. "Before the river spirit took me twelve years ago. He thinks I drowned. He does not know I am still here—alive behind the beast."',
    },
    {
      id: 'n33', type: 'narration', bg: 'swamp',
      text: 'Geralt looked at the sleeping children. He looked at her clawed, wet hands. He looked at the silver sword in his hand, then sheathed it. The situation was far more complex than a simple beast hunt.',
    },

    // ── MAJOR MORAL CHOICE ───────────────────────────────
    {
      id: 'c4', type: 'choice', bg: 'swamp', choiceType: 'moral',
      prompt: 'The silver blade is at your side. The children must go home tonight. What is your choice?',
      options: [
        {
          id: 'c4_a',
          label: '⚔️ Draw silver and slay her. End the curse and the beast. It is the only mercy this cruel world allows.',
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
          label: '🛡️ Sheathe your sword. Every curse has a root—find it and lift it. She deserves a chance.',
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
      text: "The silver blade caught no light in the dark cavern. It was over in a single, clean strike—a witcher's mercy. What was done was done, and the beast would steal no more children.",
    },
    {
      id: 'n34b', type: 'narration', bg: 'swamp',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: 'Geralt sat down in the dirt across from her, sheathing his sword. "Tell me everything about the night you were taken," he said, his voice flat but calm. "Leave nothing out. We have until dawn before the children wake."',
    },
    {
      id: 'n34c', type: 'narration', bg: 'swamp',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: 'She spoke of a dark rite performed twelve years ago, and a strange rune carved into the stone beneath the village well—placed there by someone she trusted.',
    },
    {
      id: 'n35', type: 'narration', bg: 'village',
      text: 'Geralt carried the youngest child in his arms as they walked out of the swamp. Behind them, the pink light of dawn broke over the dark waters—a rare, silent beauty in a cursed land.',
    },
    {
      id: 'n36', type: 'narration', bg: 'village',
      text: 'The villagers were waiting at the marsh edge, holding flickering torches. They gasped as the figures emerged from the morning mist.',
    },
    {
      id: 'n37', type: 'dialogue', bg: 'village',
      speaker: 'Elder Tokhir', portrait: 'elder', emotion: 'relieved',
      text: '"They\'re alive. You... you actually brought them back." The old man fell to his knees in the wet mud, weeping. "Name your price, witcher. We will pay whatever you ask."',
    },
    {
      id: 'n37b', type: 'narration', bg: 'village',
      condition: { flag: 'ep1_killed_woman', value: true },
      text: "Geralt accepted the bag of coins, saying nothing of the beast's true identity. Some secrets were better left buried in the swamp's dark waters.",
    },
    {
      id: 'n37c', type: 'narration', bg: 'village',
      condition: { flag: 'ep1_spared_woman', value: true },
      text: '"There is a rune beneath your well," Geralt said, his voice cold. "Do not touch it, and do not let anyone near it until I return." Tokhir stared at him in confusion, but dared not ask questions.',
    },
    {
      id: 'n38', type: 'narration', bg: 'village',
      text: 'Geralt secured the purse to his saddle without counting the coins. He mounted his horse and turned back toward the main road, riding alone into the morning fog.',
    },
    {
      id: 'n39', type: 'narration', bg: 'village',
      text: 'Behind him, the mist was slowly burning off the marsh. A new day rose over the old, dark waters of Botqoqlik, but the witcher knew the danger was far from over.',
    },

    // ══════════════════════════════════════════════════════
    // CLIFFHANGER
    // ══════════════════════════════════════════════════════
    {
      id: 'n40', type: 'narration', bg: 'village',
      text: 'He was barely ten paces onto the eastern highway when a black-feathered arrow struck the dead tree beside his head. It wasn’t a wild shot—it was fired with terrifying precision, pinning a rolled parchment to the bark.',
    },
    {
      id: 'cliff1', type: 'cliffhanger', bg: 'village',
      text: 'Geralt pulled the arrow free. The parchment was sealed with dark, red wax bearing the royal crest of the Northern Kingdom—a crown above crossed swords. Inside, a single line was written in elegant, dark ink:\n\n"We need you, Geralt."',
      nextEpisode: 'ep02',
    },
  ],
};
